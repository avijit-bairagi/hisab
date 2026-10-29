package com.hisab.tax;

import java.math.BigDecimal;

public enum TaxpayerLocation {
    DHAKA_CHATTOGRAM_CITY("Dhaka & Chattogram City Corporation", new BigDecimal("5000.00")),
    OTHER_CITY("Other City Corporations", new BigDecimal("4000.00")),
    NON_CITY("Non-City Corporation / Upazila / Rural Areas", new BigDecimal("3000.00"));

    private final String displayName;
    private final BigDecimal minimumTax;

    TaxpayerLocation(String displayName, BigDecimal minimumTax) {
        this.displayName = displayName;
        this.minimumTax = minimumTax;
    }

    public String getDisplayName() {
        return displayName;
    }

    public BigDecimal getMinimumTax() {
        return minimumTax;
    }
}
