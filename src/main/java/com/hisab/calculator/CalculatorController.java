package com.hisab.calculator;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/calculator")
@Tag(name = "Calculator", description = "Mathematical expression evaluation API")
public class CalculatorController {

    private final CalculatorService calculatorService;

    public CalculatorController(CalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }

    @PostMapping("/evaluate")
    @Operation(summary = "Evaluate arithmetic expression", description = "Safely evaluates an arithmetic expression using BigDecimal precision.")
    public ResponseEntity<CalculatorResponse> evaluate(@Valid @RequestBody CalculatorRequest request) {
        CalculatorResponse response = calculatorService.evaluate(request);
        return ResponseEntity.ok(response);
    }
}
