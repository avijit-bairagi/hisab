package com.hisab.tax;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/tax")
@Tag(name = "Tax Calculator", description = "Bangladesh income tax calculation engine API")
public class TaxCalculatorController {

    private final TaxCalculationService taxCalculationService;

    public TaxCalculatorController(TaxCalculationService taxCalculationService) {
        this.taxCalculationService = taxCalculationService;
    }

    @PostMapping("/calculate")
    @Operation(summary = "Calculate Bangladesh income tax", description = "Calculates taxable income, slab breakdown, investment rebate, and net payable tax based on Income Tax Act 2023.")
    public ResponseEntity<TaxCalculationResponse> calculate(@Valid @RequestBody TaxCalculationRequest request) {
        TaxCalculationResponse response = taxCalculationService.calculate(request);
        return ResponseEntity.ok(response);
    }
}
