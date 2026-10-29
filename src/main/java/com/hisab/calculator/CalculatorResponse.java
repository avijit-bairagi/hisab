package com.hisab.calculator;

public record CalculatorResponse(
    String expression,
    String result,
    String formattedResult
) {}
