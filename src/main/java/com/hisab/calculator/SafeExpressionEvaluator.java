package com.hisab.calculator;

import com.hisab.common.exception.CalculationException;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * Safe mathematical expression parser and evaluator using a recursive descent parser.
 * Does not execute dynamic code or use Java scripting engines.
 */
@Component
public class SafeExpressionEvaluator {

    private static final MathContext MATH_CONTEXT = MathContext.DECIMAL128;

    private enum TokenType {
        NUMBER, PLUS, MINUS, MULTIPLY, DIVIDE, POWER, PERCENT, LPAREN, RPAREN, EOF
    }

    private record Token(TokenType type, String text, BigDecimal value) {}

    public record EvaluationResult(String expression, String result, String formattedResult) {}

    public EvaluationResult evaluate(String expression) {
        if (expression == null || expression.trim().isEmpty()) {
            throw new CalculationException("Expression must not be empty");
        }

        List<Token> tokens = tokenize(expression.trim());
        Parser parser = new Parser(tokens);
        BigDecimal value = parser.parse();

        // Strip trailing zeros while keeping clean integer or decimal representation
        BigDecimal normalized = value.stripTrailingZeros();
        String resultStr = normalized.toPlainString();

        DecimalFormat df = new DecimalFormat("#,##0.################");
        String formatted = df.format(normalized);

        return new EvaluationResult(expression, resultStr, formatted);
    }

    private List<Token> tokenize(String input) {
        List<Token> tokens = new ArrayList<>();
        int i = 0;
        int len = input.length();

        while (i < len) {
            char c = input.charAt(i);

            if (Character.isWhitespace(c)) {
                i++;
                continue;
            }

            if (Character.isDigit(c) || c == '.') {
                int start = i;
                boolean seenDot = (c == '.');
                i++;
                while (i < len) {
                    char next = input.charAt(i);
                    if (Character.isDigit(next)) {
                        i++;
                    } else if (next == '.' && !seenDot) {
                        seenDot = true;
                        i++;
                    } else {
                        break;
                    }
                }
                String numStr = input.substring(start, i);
                if (numStr.equals(".")) {
                    throw new CalculationException("Invalid decimal point in expression");
                }
                try {
                    tokens.add(new Token(TokenType.NUMBER, numStr, new BigDecimal(numStr)));
                } catch (NumberFormatException e) {
                    throw new CalculationException("Invalid numeric literal: " + numStr);
                }
                continue;
            }

            switch (c) {
                case '+' -> tokens.add(new Token(TokenType.PLUS, "+", null));
                case '-' -> tokens.add(new Token(TokenType.MINUS, "-", null));
                case '*', '×' -> tokens.add(new Token(TokenType.MULTIPLY, "*", null));
                case '/', '÷' -> tokens.add(new Token(TokenType.DIVIDE, "/", null));
                case '^' -> tokens.add(new Token(TokenType.POWER, "^", null));
                case '%' -> tokens.add(new Token(TokenType.PERCENT, "%", null));
                case '(' -> tokens.add(new Token(TokenType.LPAREN, "(", null));
                case ')' -> tokens.add(new Token(TokenType.RPAREN, ")", null));
                default -> throw new CalculationException("Invalid or unsupported character: '" + c + "'");
            }
            i++;
        }

        tokens.add(new Token(TokenType.EOF, "", null));
        return tokens;
    }

    private static class Parser {
        private final List<Token> tokens;
        private int pos = 0;

        Parser(List<Token> tokens) {
            this.tokens = tokens;
        }

        BigDecimal parse() {
            BigDecimal res = parseExpression();
            if (!match(TokenType.EOF)) {
                throw new CalculationException("Unexpected token after expression: '" + peek().text() + "'");
            }
            return res;
        }

        private BigDecimal parseExpression() {
            BigDecimal left = parseTerm();
            while (true) {
                if (match(TokenType.PLUS)) {
                    BigDecimal right = parseTerm();
                    left = left.add(right, MATH_CONTEXT);
                } else if (match(TokenType.MINUS)) {
                    BigDecimal right = parseTerm();
                    left = left.subtract(right, MATH_CONTEXT);
                } else {
                    break;
                }
            }
            return left;
        }

        private BigDecimal parseTerm() {
            BigDecimal left = parsePower();
            while (true) {
                if (match(TokenType.MULTIPLY)) {
                    BigDecimal right = parsePower();
                    left = left.multiply(right, MATH_CONTEXT);
                } else if (match(TokenType.DIVIDE)) {
                    BigDecimal right = parsePower();
                    if (right.compareTo(BigDecimal.ZERO) == 0) {
                        throw new CalculationException("Division by zero is not allowed");
                    }
                    left = left.divide(right, 16, RoundingMode.HALF_UP);
                } else {
                    break;
                }
            }
            return left;
        }

        private BigDecimal parsePower() {
            BigDecimal left = parseUnary();
            if (match(TokenType.POWER)) {
                BigDecimal right = parsePower(); // Right-associative
                try {
                    int exp = right.intValueExact();
                    if (exp < 0) {
                        BigDecimal positivePow = left.pow(-exp, MATH_CONTEXT);
                        return BigDecimal.ONE.divide(positivePow, 16, RoundingMode.HALF_UP);
                    }
                    return left.pow(exp, MATH_CONTEXT);
                } catch (ArithmeticException e) {
                    throw new CalculationException("Power exponent must be an integer within standard limits");
                }
            }
            return left;
        }

        private BigDecimal parseUnary() {
            if (match(TokenType.PLUS)) {
                return parseUnary();
            }
            if (match(TokenType.MINUS)) {
                return parseUnary().negate(MATH_CONTEXT);
            }
            return parsePrimary();
        }

        private BigDecimal parsePrimary() {
            BigDecimal val;
            if (match(TokenType.NUMBER)) {
                val = previous().value();
            } else if (match(TokenType.LPAREN)) {
                val = parseExpression();
                if (!match(TokenType.RPAREN)) {
                    throw new CalculationException("Mismatched parentheses: missing closing ')'");
                }
            } else {
                throw new CalculationException("Expected number or '(' but found '" + peek().text() + "'");
            }

            // Postfix percentage: e.g. 10% -> 0.10
            while (match(TokenType.PERCENT)) {
                val = val.divide(BigDecimal.valueOf(100), MATH_CONTEXT);
            }

            return val;
        }

        private boolean match(TokenType type) {
            if (peek().type() == type) {
                pos++;
                return true;
            }
            return false;
        }

        private Token peek() {
            return tokens.get(pos);
        }

        private Token previous() {
            return tokens.get(pos - 1);
        }
    }
}
