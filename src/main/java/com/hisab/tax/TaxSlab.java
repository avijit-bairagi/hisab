package com.hisab.tax;

import java.math.BigDecimal;

public record TaxSlab(
    String description,
    BigDecimal ratePercent,
    BigDecimal span
) {
    public boolean isUnlimited() {
        return span == null || span.compareTo(BigDecimal.ZERO) <= 0;
    }
}
