package com.hisab.tax;

import java.math.BigDecimal;

public record TaxSlabBreakdownDto(
    String slabDescription,
    BigDecimal ratePercent,
    BigDecimal taxableAmountInSlab,
    BigDecimal taxForSlab
) {}
