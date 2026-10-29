package com.hisab.tax;

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
class TaxCalculatorControllerTest {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    void calculateTaxWithValidRequestReturns200() throws Exception {
        String json = """
                {
                  "taxYear": "2024-2025",
                  "category": "GENERAL",
                  "location": "DHAKA_CHATTOGRAM_CITY",
                  "annualSalary": 1200000.00,
                  "otherIncome": 0.0,
                  "eligibleInvestment": 100000.0,
                  "disabledDependentsCount": 0
                }
                """;

        mockMvc.perform(post("/api/v1/tax/calculate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.taxYear", is("2024-2025")))
                .andExpect(jsonPath("$.category", is("GENERAL")))
                .andExpect(jsonPath("$.grossIncome", is(1200000.00)))
                .andExpect(jsonPath("$.taxableIncome", is(800000.00)))
                .andExpect(jsonPath("$.finalTax", is(25000.00)));
    }

    @Test
    void calculateTaxWithUnsupportedYearReturns400() throws Exception {
        String json = """
                {
                  "taxYear": "2015-2016",
                  "category": "GENERAL",
                  "location": "DHAKA_CHATTOGRAM_CITY",
                  "annualSalary": 800000.00
                }
                """;

        mockMvc.perform(post("/api/v1/tax/calculate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status", is(400)))
                .andExpect(jsonPath("$.error", is("Bad Request")));
    }
}
