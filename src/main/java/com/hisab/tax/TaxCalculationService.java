package com.hisab.tax;

import com.hisab.common.exception.UnsupportedTaxYearException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
public class TaxCalculationService {

    private static final MathContext MC = MathContext.DECIMAL128;

    private final TaxProfileRegistry profileRegistry;

    public TaxCalculationService(TaxProfileRegistry profileRegistry) {
        this.profileRegistry = profileRegistry;
    }

    public TaxCalculationResponse calculate(TaxCalculationRequest request) {
        TaxRuleProfile profile = profileRegistry.findProfile(request.taxYear())
                .orElseThrow(() -> new UnsupportedTaxYearException(
                        "Unsupported tax assessment year: '" + request.taxYear() +
                                "'. Supported assessment years: " + String.join(", ", profileRegistry.getSupportedYears())
                ));

        BigDecimal salary = request.annualSalary();
        BigDecimal otherIncome = request.otherIncome() != null ? request.otherIncome() : BigDecimal.ZERO;
        BigDecimal investment = request.eligibleInvestment() != null ? request.eligibleInvestment() : BigDecimal.ZERO;
        int disabledCount = request.disabledDependentsCount() != null ? request.disabledDependentsCount() : 0;

        BigDecimal grossIncome = salary.add(otherIncome, MC).setScale(2, RoundingMode.HALF_UP);
        BigDecimal exemptSalaryIncome = profile.calculateSalaryExemption(salary);

        BigDecimal taxableIncome = grossIncome.subtract(exemptSalaryIncome, MC);
        if (taxableIncome.compareTo(BigDecimal.ZERO) < 0) {
            taxableIncome = BigDecimal.ZERO;
        }
        taxableIncome = taxableIncome.setScale(2, RoundingMode.HALF_UP);

        BigDecimal initialThreshold = profile.getInitialThreshold(request.category(), disabledCount);

        List<TaxSlabBreakdownDto> slabBreakdowns = new ArrayList<>();
        BigDecimal remainingTaxable = taxableIncome;
        BigDecimal taxBeforeRebate = BigDecimal.ZERO;

        List<TaxSlab> slabs = profile.getTaxSlabs(request.category(), disabledCount);
        for (TaxSlab slab : slabs) {
            if (remainingTaxable.compareTo(BigDecimal.ZERO) <= 0) {
                slabBreakdowns.add(new TaxSlabBreakdownDto(
                        slab.description(),
                        slab.ratePercent(),
                        BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP),
                        BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP)
                ));
                continue;
            }

            BigDecimal amountInSlab;
            if (slab.isUnlimited()) {
                amountInSlab = remainingTaxable;
                remainingTaxable = BigDecimal.ZERO;
            } else {
                amountInSlab = remainingTaxable.min(slab.span());
                remainingTaxable = remainingTaxable.subtract(amountInSlab, MC);
            }

            BigDecimal rateFactor = slab.ratePercent().divide(BigDecimal.valueOf(100), MC);
            BigDecimal taxForSlab = amountInSlab.multiply(rateFactor, MC).setScale(2, RoundingMode.HALF_UP);

            taxBeforeRebate = taxBeforeRebate.add(taxForSlab, MC);

            slabBreakdowns.add(new TaxSlabBreakdownDto(
                    slab.description(),
                    slab.ratePercent(),
                    amountInSlab.setScale(2, RoundingMode.HALF_UP),
                    taxForSlab
            ));
        }

        taxBeforeRebate = taxBeforeRebate.setScale(2, RoundingMode.HALF_UP);

        BigDecimal eligibleRebate = profile.calculateInvestmentRebate(taxableIncome, investment);

        BigDecimal taxAfterRebate = taxBeforeRebate.subtract(eligibleRebate, MC);
        if (taxAfterRebate.compareTo(BigDecimal.ZERO) < 0) {
            taxAfterRebate = BigDecimal.ZERO;
        }
        taxAfterRebate = taxAfterRebate.setScale(2, RoundingMode.HALF_UP);

        boolean minimumTaxApplied = false;
        BigDecimal finalTax;

        if (taxableIncome.compareTo(initialThreshold) > 0) {
            BigDecimal minimumTax = profile.calculateMinimumTax(request.location());
            if (taxAfterRebate.compareTo(minimumTax) < 0) {
                finalTax = minimumTax;
                minimumTaxApplied = true;
            } else {
                finalTax = taxAfterRebate;
            }
        } else {
            finalTax = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        }

        return new TaxCalculationResponse(
                request.taxYear(),
                request.category(),
                request.location(),
                grossIncome,
                exemptSalaryIncome,
                taxableIncome,
                slabBreakdowns,
                taxBeforeRebate,
                eligibleRebate,
                taxAfterRebate,
                minimumTaxApplied,
                finalTax,
                profile.getProfileSummary() + " (" + request.category().getDisplayName() + ")",
                profile.getStatutoryNotes()
        );
    }
}
