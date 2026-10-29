package com.hisab.tax;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
public class Ay2024To2025TaxRuleProfile implements TaxRuleProfile {

    private static final MathContext MC = MathContext.DECIMAL128;

    private static final Set<String> SUPPORTED_YEARS = Set.of("2024-2025", "2025-2026");

    private static final BigDecimal THRESHOLD_GENERAL = new BigDecimal("350000.00");
    private static final BigDecimal THRESHOLD_FEMALE_SENIOR = new BigDecimal("400000.00");
    private static final BigDecimal THRESHOLD_DISABLED = new BigDecimal("475000.00");
    private static final BigDecimal THRESHOLD_FREEDOM_FIGHTER = new BigDecimal("500000.00");
    private static final BigDecimal DEPENDENT_DISABLED_BONUS = new BigDecimal("50000.00");

    private static final BigDecimal SALARY_EXEMPTION_CAP = new BigDecimal("450000.00");
    private static final BigDecimal REBATE_MAX_CAP = new BigDecimal("1000000.00"); // 10 Lakh BDT

    @Override
    public boolean supportsYear(String year) {
        return year != null && SUPPORTED_YEARS.contains(year.trim());
    }

    @Override
    public String getAssessmentYear() {
        return "2024-2025";
    }

    @Override
    public BigDecimal getInitialThreshold(TaxpayerCategory category, int disabledDependentsCount) {
        BigDecimal base = switch (category) {
            case GENERAL -> THRESHOLD_GENERAL;
            case FEMALE_AND_SENIOR -> THRESHOLD_FEMALE_SENIOR;
            case DISABLED -> THRESHOLD_DISABLED;
            case FREEDOM_FIGHTER -> THRESHOLD_FREEDOM_FIGHTER;
        };

        if (disabledDependentsCount > 0) {
            BigDecimal bonus = DEPENDENT_DISABLED_BONUS.multiply(BigDecimal.valueOf(disabledDependentsCount), MC);
            base = base.add(bonus, MC);
        }

        return base.setScale(2, RoundingMode.HALF_UP);
    }

    @Override
    public List<TaxSlab> getTaxSlabs(TaxpayerCategory category, int disabledDependentsCount) {
        BigDecimal threshold = getInitialThreshold(category, disabledDependentsCount);
        List<TaxSlab> slabs = new ArrayList<>();

        slabs.add(new TaxSlab("First ৳ " + threshold.toPlainString(), BigDecimal.ZERO, threshold));
        slabs.add(new TaxSlab("Next ৳ 1,00,000", new BigDecimal("5.00"), new BigDecimal("100000.00")));
        slabs.add(new TaxSlab("Next ৳ 4,00,000", new BigDecimal("10.00"), new BigDecimal("400000.00")));
        slabs.add(new TaxSlab("Next ৳ 5,00,000", new BigDecimal("15.00"), new BigDecimal("500000.00")));
        slabs.add(new TaxSlab("Next ৳ 5,00,000", new BigDecimal("20.00"), new BigDecimal("500000.00")));
        slabs.add(new TaxSlab("Remaining Balance", new BigDecimal("25.00"), null));

        return slabs;
    }

    @Override
    public BigDecimal calculateSalaryExemption(BigDecimal annualSalary) {
        if (annualSalary == null || annualSalary.compareTo(BigDecimal.ZERO) <= 0) {
            return BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        }
        // Section 32 & Rule 19: one-third (1/3) of salary income or ৳4,50,000, whichever is lower
        BigDecimal oneThird = annualSalary.divide(BigDecimal.valueOf(3), 2, RoundingMode.HALF_UP);
        return oneThird.min(SALARY_EXEMPTION_CAP).setScale(2, RoundingMode.HALF_UP);
    }

    @Override
    public BigDecimal calculateMinimumTax(TaxpayerLocation location) {
        return location != null ? location.getMinimumTax() : TaxpayerLocation.DHAKA_CHATTOGRAM_CITY.getMinimumTax();
    }

    @Override
    public BigDecimal calculateInvestmentRebate(BigDecimal taxableIncome, BigDecimal actualInvestment) {
        if (taxableIncome == null || taxableIncome.compareTo(BigDecimal.ZERO) <= 0) {
            return BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        }
        if (actualInvestment == null || actualInvestment.compareTo(BigDecimal.ZERO) <= 0) {
            return BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        }

        // Section 78: Lower of (3% of taxable income, 15% of actual eligible investment, ৳10,00,000 cap)
        BigDecimal threePercentTaxable = taxableIncome.multiply(new BigDecimal("0.03"), MC);
        BigDecimal fifteenPercentInvestment = actualInvestment.multiply(new BigDecimal("0.15"), MC);

        BigDecimal rebate = threePercentTaxable.min(fifteenPercentInvestment).min(REBATE_MAX_CAP);
        return rebate.setScale(2, RoundingMode.HALF_UP);
    }

    @Override
    public String getProfileSummary() {
        return "Bangladesh Income Tax Act 2023 & Finance Act 2024 / 2025 Ruleset";
    }

    @Override
    public List<String> getStatutoryNotes() {
        return List.of(
                "Employment income exemption: Lower of 1/3 of annual gross salary or ৳ 4,50,000 (Section 32 / Rule 19).",
                "Allowable investment tax rebate: Lower of 3% of taxable income, 15% of allowable investment, or ৳ 10,00,000 (Section 78).",
                "Minimum tax applies when taxable income exceeds the tax-free limit: ৳ 5,000 (Dhaka & Chattogram City Corp), ৳ 4,000 (other City Corp), ৳ 3,000 (other areas).",
                "Surcharge on net wealth (if applicable) and advance tax deductions are not included in this estimation."
        );
    }
}
