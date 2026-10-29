package com.hisab.tax;

import java.math.BigDecimal;
import java.util.List;

public record TaxCalculationResponse(
    String taxYear,
    TaxpayerCategory category,
    TaxpayerLocation location,
    BigDecimal grossIncome,
    BigDecimal exemptSalaryIncome,
    BigDecimal taxableIncome,
    List<TaxSlabBreakdownDto> slabBreakdowns,
    BigDecimal taxBeforeRebate,
    BigDecimal eligibleRebate,
    BigDecimal taxAfterRebate,
    boolean minimumTaxApplied,
    BigDecimal finalTax,
    String profileSummary,
    List<String> notes
) {}
