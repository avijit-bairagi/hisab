package com.hisab.tools;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tools")
@Tag(name = "Tools", description = "Centralized tool registry API")
public class ToolRegistryController {

    private final ToolRegistryService toolRegistryService;

    public ToolRegistryController(ToolRegistryService toolRegistryService) {
        this.toolRegistryService = toolRegistryService;
    }

    @GetMapping
    @Operation(summary = "Get all tools", description = "Returns the registered tool catalog with metadata, keywords, and routing paths.")
    public ResponseEntity<List<ToolDefinition>> getAllTools() {
        return ResponseEntity.ok(toolRegistryService.getAllTools());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get tool by ID", description = "Returns tool metadata for a specific tool ID.")
    public ResponseEntity<ToolDefinition> getToolById(@PathVariable String id) {
        return toolRegistryService.getToolById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
