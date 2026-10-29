package com.hisab.calculator;

import com.hisab.common.exception.CalculationException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class SafeExpressionEvaluatorTest {

    private SafeExpressionEvaluator evaluator;

    @BeforeEach
    void setUp() {
        evaluator = new SafeExpressionEvaluator();
    }

    @Test
    void testBasicArithmetic() {
        assertEquals("7", evaluator.evaluate("3 + 4").result());
        assertEquals("12", evaluator.evaluate("15 - 3").result());
        assertEquals("42", evaluator.evaluate("6 * 7").result());
        assertEquals("4", evaluator.evaluate("20 / 5").result());
    }

    @Test
    void testPrecedenceAndParentheses() {
        assertEquals("14", evaluator.evaluate("2 + 3 * 4").result());
        assertEquals("20", evaluator.evaluate("(2 + 3) * 4").result());
        assertEquals("22", evaluator.evaluate("12 + 5 * (3 - 1)").result());
        assertEquals("5", evaluator.evaluate("((10 + 5) / 3)").result());
    }

    @Test
    void testDecimalsAndPrecision() {
        assertEquals("7.5", evaluator.evaluate("15 / 2").result());
        assertEquals("0.3", evaluator.evaluate("0.1 + 0.2").result());
    }

    @Test
    void testUnaryNegation() {
        assertEquals("-5", evaluator.evaluate("-5").result());
        assertEquals("-15", evaluator.evaluate("3 * -5").result());
        assertEquals("8", evaluator.evaluate("12 + -4").result());
    }

    @Test
    void testPercentageOperator() {
        // 50 * 10% = 5
        assertEquals("5", evaluator.evaluate("50 * 10%").result());
        // 200 * 15% = 30
        assertEquals("30", evaluator.evaluate("200 * 15%").result());
    }

    @Test
    void testExponentiation() {
        assertEquals("8", evaluator.evaluate("2 ^ 3").result());
        assertEquals("512", evaluator.evaluate("2 ^ 3 ^ 2").result()); // 2^(3^2) = 2^9 = 512
    }

    @Test
    void testDivisionByZeroThrowsCalculationException() {
        CalculationException ex = assertThrows(CalculationException.class, () -> evaluator.evaluate("10 / 0"));
        assertTrue(ex.getMessage().contains("Division by zero is not allowed"));
    }

    @Test
    void testMalformedExpressionsThrowCalculationException() {
        assertThrows(CalculationException.class, () -> evaluator.evaluate(""));
        assertThrows(CalculationException.class, () -> evaluator.evaluate("   "));
        assertThrows(CalculationException.class, () -> evaluator.evaluate("12 + * 3"));
        assertThrows(CalculationException.class, () -> evaluator.evaluate("(5 + 2"));
        assertThrows(CalculationException.class, () -> evaluator.evaluate("5 + 2)"));
    }

    @Test
    void testInvalidCharactersThrowCalculationException() {
        CalculationException ex = assertThrows(CalculationException.class, () -> evaluator.evaluate("10 + abc"));
        assertTrue(ex.getMessage().contains("Invalid or unsupported character"));
    }
}
