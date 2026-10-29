package com.hisab.tax;

import com.hisab.common.exception.UnsupportedTaxYearException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class TaxCalculationServiceTest {

    private TaxCalculationService service;

    @BeforeEach
    void setUp() {
        TaxRuleProfile profile = new Ay2024To2025TaxRuleProfile();
        TaxProfileRegistry registry = new TaxProfileRegistry(List.of(profile));
        service = new TaxCalculationService(registry);
    }

    @Test
    void testTaxCalculationForGeneralTaxpayer() {
        // Salary: 1,200,000 BDT
        // Exemption: 1/3 of 1,200,000 = 400,000 (< 450,000 cap)
        // Taxable income = 800,000 BDT
        // Slabs for General:
        // First 350,000 @ 0% = 0
        // Next 100,000 @ 5% = 5,000
        // Next 350,000 (of 400,000 slab) @ 10% = 35,000
        // Tax before rebate = 40,000 BDT
        // Investment: 100,000 BDT
        // Rebate: lower of (3% of 800,000 = 24,000, 15% of 100,000 = 15,000, 1,000,000 cap) = 15,000 BDT
        // Tax after rebate = 40,000 - 15,000 = 25,000 BDT
        // Minimum tax for Dhaka: 5,000 BDT. Final tax = 25,000 BDT.
        TaxCalculationRequest request = new TaxCalculationRequest(
                "2024-2025",
                TaxpayerCategory.GENERAL,
                TaxpayerLocation.DHAKA_CHATTOGRAM_CITY,
                new BigDecimal("1200000.00"),
                BigDecimal.ZERO,
                new BigDecimal("100000.00"),
                0
        );

        TaxCalculationResponse response = service.calculate(request);

        assertEquals(new BigDecimal("1200000.00"), response.grossIncome());
        assertEquals(new BigDecimal("400000.00"), response.exemptSalaryIncome());
        assertEquals(new BigDecimal("800000.00"), response.taxableIncome());
        assertEquals(new BigDecimal("40000.00"), response.taxBeforeRebate());
        assertEquals(new BigDecimal("15000.00"), response.eligibleRebate());
        assertEquals(new BigDecimal("25000.00"), response.taxAfterRebate());
        assertEquals(new BigDecimal("25000.00"), response.finalTax());
        assertFalse(response.minimumTaxApplied());
    }

    @Test
    void testIncomeBelowTaxFreeThreshold() {
        // Salary: 300,000 BDT (below 350,000 threshold)
        TaxCalculationRequest request = new TaxCalculationRequest(
                "2024-2025",
                TaxpayerCategory.GENERAL,
                TaxpayerLocation.DHAKA_CHATTOGRAM_CITY,
                new BigDecimal("300000.00"),
                BigDecimal.ZERO,
                BigDecimal.ZERO,
                0
        );

        TaxCalculationResponse response = service.calculate(request);

        assertEquals(new BigDecimal("0.00"), response.finalTax());
        assertFalse(response.minimumTaxApplied());
    }

    @Test
    void testMinimumTaxAppliedWhenTaxAfterRebateIsLow() {
        // Taxable income exceeds threshold, but rebate reduces tax below minimum tax (5,000 BDT)
        // Salary: 600,000 BDT -> exempt: 200,000 -> taxable: 400,000
        // Slabs: First 350k @ 0% = 0, Next 50k @ 5% = 2,500.
        // Tax before rebate = 2,500 BDT.
        // Tax after rebate is <= 2,500 BDT (< 5,000 minimum tax).
        // Since taxable income 400k > 350k threshold, minimum tax applies: 5,000 BDT!
        TaxCalculationRequest request = new TaxCalculationRequest(
                "2024-2025",
                TaxpayerCategory.GENERAL,
                TaxpayerLocation.DHAKA_CHATTOGRAM_CITY,
                new BigDecimal("600000.00"),
                BigDecimal.ZERO,
                BigDecimal.ZERO,
                0
        );

        TaxCalculationResponse response = service.calculate(request);

        assertEquals(new BigDecimal("400000.00"), response.taxableIncome());
        assertEquals(new BigDecimal("2500.00"), response.taxBeforeRebate());
        assertEquals(new BigDecimal("5000.00"), response.finalTax());
        assertTrue(response.minimumTaxApplied());
    }

    @Test
    void testUnsupportedTaxYearThrowsException() {
        TaxCalculationRequest request = new TaxCalculationRequest(
                "2018-2019",
                TaxpayerCategory.GENERAL,
                TaxpayerLocation.DHAKA_CHATTOGRAM_CITY,
                new BigDecimal("800000.00"),
                BigDecimal.ZERO,
                BigDecimal.ZERO,
                0
        );

        UnsupportedTaxYearException ex = assertThrows(UnsupportedTaxYearException.class, () -> service.calculate(request));
        assertTrue(ex.getMessage().contains("Unsupported tax assessment year: '2018-2019'"));
        assertTrue(ex.getMessage().contains("Supported assessment years: 2024-2025, 2025-2026"));
    }
}
