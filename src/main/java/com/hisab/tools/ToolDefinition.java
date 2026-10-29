package com.hisab.tools;

import java.util.List;

public record ToolDefinition(
    String id,
    String name,
    String route,
    String description,
    String icon,
    ToolCategory category,
    List<String> keywords,
    ToolStatus status
) {}
