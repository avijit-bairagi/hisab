package com.hisab.tax;

public enum TaxpayerCategory {
    GENERAL("General Individual (Male under 65)"),
    FEMALE_AND_SENIOR("Female & Senior Citizen (65 and above)"),
    DISABLED("Physically Challenged / Person with Disability"),
    FREEDOM_FIGHTER("Gazetted War-wounded Freedom Fighter");

    private final String displayName;

    TaxpayerCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
