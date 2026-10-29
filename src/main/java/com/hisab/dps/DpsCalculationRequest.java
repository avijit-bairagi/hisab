package com.hisab.dps;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record DpsCalculationRequest(
    @NotNull(message = "Monthly deposit is required")
    @DecimalMin(value = "1.00", message = "Monthly deposit must be at least 1.00")
    BigDecimal monthlyDeposit,

    @NotNull(message = "Duration in months is required")
    @Min(value = 1, message = "Duration must be at least 1 month")
    @Max(value = 360, message = "Duration cannot exceed 360 months (30 years)")
    Integer durationMonths,

    @NotNull(message = "Annual interest rate is required")
    @DecimalMin(value = "0.00", message = "Annual interest rate cannot be negative")
    @DecimalMax(value = "100.00", message = "Annual interest rate cannot exceed 100%")
    BigDecimal annualInterestRate,

    @NotNull(message = "Deposit timing convention is required")
    DpsDepositTiming depositTiming,

    @NotNull(message = "Compounding frequency is required")
    DpsCompoundingFrequency compoundingFrequency
) {}
