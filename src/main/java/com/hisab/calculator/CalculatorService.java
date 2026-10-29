package com.hisab.calculator;

import org.springframework.stereotype.Service;

@Service
public class CalculatorService {

    private final SafeExpressionEvaluator evaluator;

    public CalculatorService(SafeExpressionEvaluator evaluator) {
        this.evaluator = evaluator;
    }

    public CalculatorResponse evaluate(CalculatorRequest request) {
        SafeExpressionEvaluator.EvaluationResult res = evaluator.evaluate(request.expression());
        return new CalculatorResponse(res.expression(), res.result(), res.formattedResult());
    }
}
