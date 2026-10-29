package com.hisab.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    /**
     * Forwards root and SPA tool routes to index.html.
     * Specific route matching prevents intercepting /api/** or static assets.
     */
    @GetMapping(value = {
        "/",
        "/tools",
        "/tools/**"
    })
    public String forwardSpa() {
        return "forward:/index.html";
    }
}
