package com.hisab.tools;

import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ToolRegistryService {

    private final List<ToolDefinition> tools = List.of(
            new ToolDefinition(
                    "calculator",
                    "Calculator",
                    "/tools/calculator",
                    "Perform everyday mathematical calculations.",
                    "mdi-calculator",
                    ToolCategory.GENERAL,
                    List.of(
                            "calculator",
                            "math",
                            "arithmetic",
                            "percentage",
                            "addition",
                            "subtraction",
                            "multiplication",
                            "division"
                    ),
                    ToolStatus.AVAILABLE
            ),
            new ToolDefinition(
                    "dps-calculator",
                    "DPS Calculator",
                    "/tools/dps-calculator",
                    "Estimate savings maturity from regular monthly deposits.",
                    "mdi-piggy-bank-outline",
                    ToolCategory.FINANCE,
                    List.of(
                            "DPS",
                            "savings",
                            "monthly deposit",
                            "maturity",
                            "interest",
                            "profit"
                    ),
                    ToolStatus.AVAILABLE
            ),
            new ToolDefinition(
                    "tax-calculator",
                    "Tax Calculator",
                    "/tools/tax-calculator",
                    "Estimate income tax based on a selected Bangladesh tax-year profile.",
                    "mdi-file-document-edit-outline",
                    ToolCategory.FINANCE,
                    List.of(
                            "income tax",
                            "salary tax",
                            "tax",
                            "rebate",
                            "annual income"
                    ),
                    ToolStatus.AVAILABLE
            )
    );

    public List<ToolDefinition> getAllTools() {
        return Collections.unmodifiableList(tools);
    }

    public Optional<ToolDefinition> getToolById(String id) {
        return tools.stream()
                .filter(tool -> tool.id().equalsIgnoreCase(id))
                .findFirst();
    }
}
