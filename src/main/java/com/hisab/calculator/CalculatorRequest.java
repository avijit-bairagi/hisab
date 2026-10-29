package com.hisab.calculator;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CalculatorRequest(
    @NotBlank(message = "Expression must not be blank")
    @Size(max = 200, message = "Expression must not exceed 200 characters")
    String expression
) {}
