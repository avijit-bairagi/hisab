package com.hisab.dps;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dps")
@Tag(name = "DPS Calculator", description = "Deposit Pension Scheme (recurring savings) calculation API")
public class DpsCalculatorController {

    private final DpsCalculationService dpsCalculationService;

    public DpsCalculatorController(DpsCalculationService dpsCalculationService) {
        this.dpsCalculationService = dpsCalculationService;
    }

    @PostMapping("/calculate")
    @Operation(summary = "Calculate DPS maturity", description = "Calculates total principal, estimated interest/profit, maturity amount, and schedule breakdown.")
    public ResponseEntity<DpsCalculationResponse> calculate(@Valid @RequestBody DpsCalculationRequest request) {
        DpsCalculationResponse response = dpsCalculationService.calculate(request);
        return ResponseEntity.ok(response);
    }
}
