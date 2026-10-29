package com.hisab.tax;

import java.math.BigDecimal;
import java.util.List;

public interface TaxRuleProfile {

    boolean supportsYear(String year);

    String getAssessmentYear();

    BigDecimal getInitialThreshold(TaxpayerCategory category, int disabledDependentsCount);

    List<TaxSlab> getTaxSlabs(TaxpayerCategory category, int disabledDependentsCount);

    BigDecimal calculateSalaryExemption(BigDecimal annualSalary);

    BigDecimal calculateMinimumTax(TaxpayerLocation location);

    BigDecimal calculateInvestmentRebate(BigDecimal taxableIncome, BigDecimal actualInvestment);

    String getProfileSummary();

    List<String> getStatutoryNotes();
}
