package com.hisab.dps;

import java.math.BigDecimal;
import java.util.List;

public record DpsCalculationResponse(
    BigDecimal monthlyDeposit,
    int durationMonths,
    BigDecimal annualInterestRate,
    DpsDepositTiming depositTiming,
    DpsCompoundingFrequency compoundingFrequency,
    BigDecimal totalPrincipal,
    BigDecimal estimatedProfit,
    BigDecimal maturityAmount,
    List<String> assumptions,
    List<DpsYearlyBreakdown> breakdown
) {}
