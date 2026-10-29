package com.hisab.home;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/health")
@Tag(name = "Health", description = "Application health status API")
public class HealthController {

    private final String applicationVersion;

    public HealthController(@Value("${app.version:1.0.0}") String applicationVersion) {
        this.applicationVersion = applicationVersion;
    }

    @GetMapping
    @Operation(summary = "Check health status", description = "Returns the service health status, application version, and current timestamp.")
    public ResponseEntity<HealthStatusResponse> getHealth() {
        return ResponseEntity.ok(HealthStatusResponse.up(applicationVersion));
    }
}
