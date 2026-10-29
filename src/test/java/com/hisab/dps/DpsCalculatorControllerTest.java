package com.hisab.dps;

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
class DpsCalculatorControllerTest {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    void calculateDpsWithValidPayloadReturns200() throws Exception {
        String json = """
                {
                  "monthlyDeposit": 5000.00,
                  "durationMonths": 36,
                  "annualInterestRate": 8.5,
                  "depositTiming": "BEGINNING_OF_MONTH",
                  "compoundingFrequency": "MONTHLY"
                }
                """;

        mockMvc.perform(post("/api/v1/dps/calculate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.monthlyDeposit", is(5000.00)))
                .andExpect(jsonPath("$.durationMonths", is(36)))
                .andExpect(jsonPath("$.totalPrincipal", is(180000.00)))
                .andExpect(jsonPath("$.depositTiming", is("BEGINNING_OF_MONTH")))
                .andExpect(jsonPath("$.compoundingFrequency", is("MONTHLY")));
    }

    @Test
    void calculateDpsWithInvalidDepositReturns400() throws Exception {
        String json = """
                {
                  "monthlyDeposit": -500.00,
                  "durationMonths": 12,
                  "annualInterestRate": 8.0,
                  "depositTiming": "BEGINNING_OF_MONTH",
                  "compoundingFrequency": "MONTHLY"
                }
                """;

        mockMvc.perform(post("/api/v1/dps/calculate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors.monthlyDeposit", is("Monthly deposit must be at least 1.00")));
    }
}
