package com.hisab.tools;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
class ToolRegistryControllerTest {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    void getAllToolsReturnsInitialTools() throws Exception {
        mockMvc.perform(get("/api/v1/tools")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].id", is("calculator")))
                .andExpect(jsonPath("$[1].id", is("dps-calculator")))
                .andExpect(jsonPath("$[2].id", is("tax-calculator")));
    }

    @Test
    void getToolByIdReturnsCorrectTool() throws Exception {
        mockMvc.perform(get("/api/v1/tools/calculator")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is("calculator")))
                .andExpect(jsonPath("$.name", is("Calculator")))
                .andExpect(jsonPath("$.route", is("/tools/calculator")))
                .andExpect(jsonPath("$.category", is("GENERAL")));
    }

    @Test
    void getToolByInvalidIdReturns404() throws Exception {
        mockMvc.perform(get("/api/v1/tools/unknown-tool")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}
