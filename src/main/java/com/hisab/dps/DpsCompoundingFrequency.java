package com.hisab.dps;

public enum DpsCompoundingFrequency {
    MONTHLY(12, "Monthly"),
    QUARTERLY(4, "Quarterly"),
    SEMI_ANNUALLY(2, "Semi-Annually"),
    ANNUALLY(1, "Annually");

    private final int periodsPerYear;
    private final String displayName;

    DpsCompoundingFrequency(int periodsPerYear, String displayName) {
        this.periodsPerYear = periodsPerYear;
        this.displayName = displayName;
    }

    public int getPeriodsPerYear() {
        return periodsPerYear;
    }

    public String getDisplayName() {
        return displayName;
    }
}
