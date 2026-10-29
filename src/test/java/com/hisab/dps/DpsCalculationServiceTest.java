package com.hisab.dps;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class DpsCalculationServiceTest {

    private DpsCalculationService service;

    @BeforeEach
    void setUp() {
        service = new DpsCalculationService();
    }

    @Test
    void testStandardDpsCalculation() {
        // 5000 BDT per month for 36 months at 8.5% annual rate
        DpsCalculationRequest request = new DpsCalculationRequest(
                new BigDecimal("5000.00"),
                36,
                new BigDecimal("8.50"),
                DpsDepositTiming.BEGINNING_OF_MONTH,
                DpsCompoundingFrequency.MONTHLY
        );

        DpsCalculationResponse response = service.calculate(request);

        assertEquals(new BigDecimal("180000.00"), response.totalPrincipal());
        assertTrue(response.maturityAmount().compareTo(response.totalPrincipal()) > 0);
        assertTrue(response.estimatedProfit().compareTo(BigDecimal.ZERO) > 0);
        assertEquals(3, response.breakdown().size());
        assertFalse(response.assumptions().isEmpty());
    }

    @Test
    void testZeroInterestDpsCalculation() {
        // Zero interest: maturity equals principal
        DpsCalculationRequest request = new DpsCalculationRequest(
                new BigDecimal("5000.00"),
                24,
                BigDecimal.ZERO,
                DpsDepositTiming.BEGINNING_OF_MONTH,
                DpsCompoundingFrequency.MONTHLY
        );

        DpsCalculationResponse response = service.calculate(request);

        assertEquals(new BigDecimal("120000.00"), response.totalPrincipal());
        assertEquals(new BigDecimal("120000.00"), response.maturityAmount());
        assertEquals(new BigDecimal("0.00"), response.estimatedProfit());
    }

    @Test
    void testDepositTimingDifference() {
        // Beginning of month should yield more interest than end of month
        DpsCalculationRequest reqAdvance = new DpsCalculationRequest(
                new BigDecimal("10000.00"),
                60,
                new BigDecimal("9.00"),
                DpsDepositTiming.BEGINNING_OF_MONTH,
                DpsCompoundingFrequency.MONTHLY
        );
        DpsCalculationRequest reqArrears = new DpsCalculationRequest(
                new BigDecimal("10000.00"),
                60,
                new BigDecimal("9.00"),
                DpsDepositTiming.END_OF_MONTH,
                DpsCompoundingFrequency.MONTHLY
        );

        DpsCalculationResponse resAdvance = service.calculate(reqAdvance);
        DpsCalculationResponse resArrears = service.calculate(reqArrears);

        assertTrue(resAdvance.maturityAmount().compareTo(resArrears.maturityAmount()) > 0);
    }
}
