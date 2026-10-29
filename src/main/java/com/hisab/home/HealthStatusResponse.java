package com.hisab.home;

import java.time.Instant;

public record HealthStatusResponse(
    String status,
    String version,
    Instant timestamp
) {
    public static HealthStatusResponse up(String version) {
        return new HealthStatusResponse("UP", version, Instant.now());
    }
}
