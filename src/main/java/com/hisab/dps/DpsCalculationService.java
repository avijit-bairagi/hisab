package com.hisab.dps;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
public class DpsCalculationService {

    private static final MathContext MC = MathContext.DECIMAL128;

    public DpsCalculationResponse calculate(DpsCalculationRequest request) {
        BigDecimal monthlyDeposit = request.monthlyDeposit();
        int n = request.durationMonths();
        BigDecimal annualRatePct = request.annualInterestRate();
        DpsDepositTiming timing = request.depositTiming();
        DpsCompoundingFrequency frequency = request.compoundingFrequency();

        BigDecimal totalPrincipal = monthlyDeposit.multiply(BigDecimal.valueOf(n), MC)
                .setScale(2, RoundingMode.HALF_UP);

        BigDecimal maturityAmount;

        if (annualRatePct.compareTo(BigDecimal.ZERO) == 0) {
            maturityAmount = totalPrincipal;
        } else {
            maturityAmount = calculateMaturityAmount(monthlyDeposit, n, annualRatePct, timing, frequency);
        }

        BigDecimal estimatedProfit = maturityAmount.subtract(totalPrincipal, MC)
                .setScale(2, RoundingMode.HALF_UP);
        if (estimatedProfit.compareTo(BigDecimal.ZERO) < 0) {
            estimatedProfit = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        }

        List<DpsYearlyBreakdown> breakdown = calculateYearlyBreakdown(
                monthlyDeposit, n, annualRatePct, timing, frequency
        );

        List<String> assumptions = buildAssumptions(
                monthlyDeposit, n, annualRatePct, timing, frequency
        );

        return new DpsCalculationResponse(
                monthlyDeposit.setScale(2, RoundingMode.HALF_UP),
                n,
                annualRatePct.setScale(2, RoundingMode.HALF_UP),
                timing,
                frequency,
                totalPrincipal,
                estimatedProfit,
                maturityAmount,
                assumptions,
                breakdown
        );
    }

    private BigDecimal calculateMaturityAmount(
            BigDecimal monthlyDeposit,
            int totalMonths,
            BigDecimal annualRatePct,
            DpsDepositTiming timing,
            DpsCompoundingFrequency frequency
    ) {
        double rAnnual = annualRatePct.doubleValue() / 100.0;
        int m = frequency.getPeriodsPerYear();
        double periodicRate = rAnnual / m;

        BigDecimal sum = BigDecimal.ZERO;

        for (int k = 1; k <= totalMonths; k++) {
            int remainingMonths = (timing == DpsDepositTiming.BEGINNING_OF_MONTH)
                    ? (totalMonths - k + 1)
                    : (totalMonths - k);

            if (remainingMonths <= 0) {
                sum = sum.add(monthlyDeposit, MC);
                continue;
            }

            double compoundingPeriods = (remainingMonths * m) / 12.0;
            double growthFactor = Math.pow(1.0 + periodicRate, compoundingPeriods);

            BigDecimal depositMaturity = monthlyDeposit.multiply(BigDecimal.valueOf(growthFactor), MC);
            sum = sum.add(depositMaturity, MC);
        }

        return sum.setScale(2, RoundingMode.HALF_UP);
    }

    private List<DpsYearlyBreakdown> calculateYearlyBreakdown(
            BigDecimal monthlyDeposit,
            int totalMonths,
            BigDecimal annualRatePct,
            DpsDepositTiming timing,
            DpsCompoundingFrequency frequency
    ) {
        List<DpsYearlyBreakdown> list = new ArrayList<>();
        int years = (int) Math.ceil(totalMonths / 12.0);

        for (int y = 1; y <= years; y++) {
            int currentMonths = Math.min(y * 12, totalMonths);
            BigDecimal depositSoFar = monthlyDeposit.multiply(BigDecimal.valueOf(currentMonths), MC)
                    .setScale(2, RoundingMode.HALF_UP);

            BigDecimal balanceSoFar;
            if (annualRatePct.compareTo(BigDecimal.ZERO) == 0) {
                balanceSoFar = depositSoFar;
            } else {
                balanceSoFar = calculateMaturityAmount(monthlyDeposit, currentMonths, annualRatePct, timing, frequency);
            }

            BigDecimal profitSoFar = balanceSoFar.subtract(depositSoFar, MC).setScale(2, RoundingMode.HALF_UP);
            if (profitSoFar.compareTo(BigDecimal.ZERO) < 0) {
                profitSoFar = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
            }

            list.add(new DpsYearlyBreakdown(y, depositSoFar, profitSoFar, balanceSoFar));
        }

        return list;
    }

    private List<String> buildAssumptions(
            BigDecimal monthlyDeposit,
            int totalMonths,
            BigDecimal annualRatePct,
            DpsDepositTiming timing,
            DpsCompoundingFrequency frequency
    ) {
        String timingLabel = (timing == DpsDepositTiming.BEGINNING_OF_MONTH)
                ? "beginning of each month (Annuity Due / Advance)"
                : "end of each month (Ordinary Annuity / Arrears)";

        return List.of(
                "Monthly installment of ৳ " + monthlyDeposit.setScale(2, RoundingMode.HALF_UP) + " deposited for " + totalMonths + " months.",
                "Fixed annual interest / profit rate of " + annualRatePct.setScale(2, RoundingMode.HALF_UP) + "%.",
                "Compounding applied on a " + frequency.getDisplayName().toLowerCase() + " frequency basis.",
                "Installment deposited at the " + timingLabel + ".",
                "Calculations assume continuous monthly installments without default or penalty.",
                "Excludes bank maintenance fees, government excise duty, and Advance Income Tax (AIT / source tax) deductions."
        );
    }
}
