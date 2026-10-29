package com.hisab.dps;

import java.math.BigDecimal;

public record DpsYearlyBreakdown(
    int year,
    BigDecimal depositedAmount,
    BigDecimal earnedProfit,
    BigDecimal balance
) {}
