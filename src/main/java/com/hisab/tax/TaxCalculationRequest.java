package com.hisab.tax;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record TaxCalculationRequest(
    @NotBlank(message = "Tax assessment year is required")
    String taxYear,

    @NotNull(message = "Taxpayer category is required")
    TaxpayerCategory category,

    @NotNull(message = "Taxpayer location is required")
    TaxpayerLocation location,

    @NotNull(message = "Annual salary is required")
    @DecimalMin(value = "0.00", message = "Annual salary cannot be negative")
    BigDecimal annualSalary,

    BigDecimal otherIncome,

    BigDecimal eligibleInvestment,

    @Min(value = 0, message = "Disabled dependents count cannot be negative")
    Integer disabledDependentsCount
) {}
