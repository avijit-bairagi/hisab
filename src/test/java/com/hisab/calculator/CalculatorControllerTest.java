package com.hisab.calculator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
class CalculatorControllerTest {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    void evaluateValidExpressionReturnsResult() throws Exception {
        String json = """
                {
                  "expression": "12 + 5 * (3 - 1)"
                }
                """;

        mockMvc.perform(post("/api/v1/calculator/evaluate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.expression", is("12 + 5 * (3 - 1)")))
                .andExpect(jsonPath("$.result", is("22")))
                .andExpect(jsonPath("$.formattedResult", is("22")));
    }

    @Test
    void evaluateDivisionByZeroReturns400() throws Exception {
        String json = """
                {
                  "expression": "42 / 0"
                }
                """;

        mockMvc.perform(post("/api/v1/calculator/evaluate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status", is(400)))
                .andExpect(jsonPath("$.message", is("Division by zero is not allowed")));
    }

    @Test
    void evaluateBlankExpressionReturns400Validation() throws Exception {
        String json = """
                {
                  "expression": ""
                }
                """;

        mockMvc.perform(post("/api/v1/calculator/evaluate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors.expression", is("Expression must not be blank")));
    }
}
