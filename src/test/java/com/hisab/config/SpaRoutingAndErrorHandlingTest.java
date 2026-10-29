package com.hisab.config;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
class SpaRoutingAndErrorHandlingTest {

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private SpaCacheFilter spaCacheFilter;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context)
                .addFilter(spaCacheFilter)
                .build();
    }

    @Test
    void rootRouteForwardsToIndexHtmlWithNoCacheHeader() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(forwardedUrl("/index.html"))
                .andExpect(header().string("Cache-Control", containsString("no-cache")))
                .andExpect(header().string("Cache-Control", containsString("no-store")));
    }

    @Test
    void calculatorRouteForwardsToIndexHtml() throws Exception {
        mockMvc.perform(get("/tools/calculator"))
                .andExpect(status().isOk())
                .andExpect(forwardedUrl("/index.html"))
                .andExpect(header().string("Cache-Control", containsString("no-cache")));
    }

    @Test
    void dpsRouteForwardsToIndexHtml() throws Exception {
        mockMvc.perform(get("/tools/dps-calculator"))
                .andExpect(status().isOk())
                .andExpect(forwardedUrl("/index.html"))
                .andExpect(header().string("Cache-Control", containsString("no-cache")));
    }

    @Test
    void taxRouteForwardsToIndexHtml() throws Exception {
        mockMvc.perform(get("/tools/tax-calculator"))
                .andExpect(status().isOk())
                .andExpect(forwardedUrl("/index.html"))
                .andExpect(header().string("Cache-Control", containsString("no-cache")));
    }

    @Test
    void unknownApiEndpointReturnsJson404NeverFrontendHtml() throws Exception {
        mockMvc.perform(get("/api/v1/nonexistent-endpoint")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status", is(404)))
                .andExpect(jsonPath("$.error", is("Not Found")))
                .andExpect(jsonPath("$.message", containsString("/api/v1/nonexistent-endpoint")));
    }

    @Test
    void missingStaticAssetReturns404NeverFrontendHtml() throws Exception {
        mockMvc.perform(get("/assets/non-existent-script-xyz123.js"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status", is(404)));
    }
}
