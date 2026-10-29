package com.hisab.tax;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class TaxProfileRegistry {

    private final List<TaxRuleProfile> profiles;

    public TaxProfileRegistry(List<TaxRuleProfile> profiles) {
        this.profiles = profiles;
    }

    public Optional<TaxRuleProfile> findProfile(String year) {
        if (year == null) {
            return Optional.empty();
        }
        return profiles.stream()
                .filter(p -> p.supportsYear(year.trim()))
                .findFirst();
    }

    public List<String> getSupportedYears() {
        return List.of("2024-2025", "2025-2026");
    }
}
