<template>
  <v-container class="py-8" style="max-width: 1050px">
    <!-- Back to Home -->
    <div class="mb-4">
      <v-btn
        to="/"
        variant="text"
        prepend-icon="mdi-arrow-left"
        class="text-none px-2"
      >
        Back to Tools
      </v-btn>
    </div>

    <!-- Header -->
    <div class="d-flex align-center ga-3 mb-6">
      <v-avatar color="primary" variant="tonal" size="56" rounded="lg">
        <v-icon icon="mdi-file-document-edit-outline" size="32" />
      </v-avatar>
      <div>
        <h1 class="text-h4 font-weight-bold">Bangladesh Income Tax Calculator</h1>
        <p class="text-body-2 text-medium-emphasis mb-0">
          Estimate individual income tax liability based on Bangladesh Income Tax Act 2023 and the Finance Act.
        </p>
      </div>
    </div>

    <v-row>
      <!-- Input Form Column -->
      <v-col cols="12" md="5">
        <v-card elevation="1" rounded="xl" class="pa-5 border">
          <h2 class="text-subtitle-1 font-weight-bold mb-3">Taxpayer Profile</h2>

          <!-- Tax Assessment Year -->
          <v-select
            v-model="form.taxYear"
            label="Assessment Year"
            :items="taxYears"
            variant="outlined"
            density="comfortable"
            class="mb-3"
          />

          <!-- Category -->
          <v-select
            v-model="form.category"
            label="Taxpayer Category"
            :items="categories"
            item-title="label"
            item-value="value"
            variant="outlined"
            density="comfortable"
            class="mb-3"
          />

          <!-- Location -->
          <v-select
            v-model="form.location"
            label="Residential Location / Zone"
            :items="locations"
            item-title="label"
            item-value="value"
            variant="outlined"
            density="comfortable"
            class="mb-4"
          />

          <h2 class="text-subtitle-1 font-weight-bold mb-3">Annual Incomes & Allowances</h2>

          <!-- Gross Salary -->
          <v-text-field
            v-model.number="form.annualSalary"
            label="Annual Gross Salary / Employment Income (BDT)"
            type="number"
            min="0"
            step="10000"
            prefix="৳"
            variant="outlined"
            density="comfortable"
            class="mb-3"
            hint="Basic, allowances, bonuses before tax"
            persistent-hint
          />

          <!-- Other Income -->
          <v-text-field
            v-model.number="form.otherIncome"
            label="Other Annual Income (BDT)"
            type="number"
            min="0"
            step="5000"
            prefix="৳"
            variant="outlined"
            density="comfortable"
            class="mb-3"
            hint="Rent, bank interest, freelancing, business"
            persistent-hint
          />

          <!-- Eligible Investment -->
          <v-text-field
            v-model.number="form.eligibleInvestment"
            label="Eligible Investment Amount (BDT)"
            type="number"
            min="0"
            step="5000"
            prefix="৳"
            variant="outlined"
            density="comfortable"
            class="mb-3"
            hint="DPS (up to 1.2L), Sanchayapatra, Capital Market, Provident Fund"
            persistent-hint
          />

          <!-- Disabled Dependents -->
          <v-text-field
            v-model.number="form.disabledDependentsCount"
            label="Children / Dependents with Disabilities"
            type="number"
            min="0"
            max="10"
            variant="outlined"
            density="comfortable"
            class="mb-4"
            hint="+৳ 50,000 threshold exemption per dependent"
            persistent-hint
          />

          <v-alert
            v-if="errorMessage"
            type="error"
            variant="tonal"
            density="compact"
            class="mb-4"
            closable
            @click:close="errorMessage = ''"
          >
            {{ errorMessage }}
          </v-alert>

          <v-btn
            color="primary"
            size="large"
            block
            rounded="lg"
            :loading="loading"
            class="font-weight-bold"
            @click="calculate"
          >
            Calculate Income Tax
          </v-btn>
        </v-card>
      </v-col>

      <!-- Results Column -->
      <v-col cols="12" md="7">
        <!-- Results Card -->
        <v-card v-if="result" elevation="1" rounded="xl" class="pa-5 border mb-6">
          <div class="d-flex align-center justify-space-between mb-4">
            <div>
              <h2 class="text-subtitle-1 font-weight-bold">Tax Assessment Breakdown</h2>
              <div class="text-caption text-medium-emphasis">
                {{ result.profileSummary }}
              </div>
            </div>
            <v-chip color="primary" size="small" variant="flat">
              AY {{ result.taxYear }}
            </v-chip>
          </div>

          <!-- Highlight Metric: Final Tax -->
          <v-sheet border rounded="xl" class="pa-4 mb-5 bg-primary text-white text-center">
            <div class="text-caption text-white text-opacity-90">Net Estimated Tax Payable</div>
            <div class="text-h4 font-weight-bold my-1">
              ৳ {{ formatCurrency(result.finalTax) }}
            </div>
            <div v-if="result.minimumTaxApplied" class="text-caption text-warning font-weight-bold">
              * Minimum Tax applies based on location
            </div>
          </v-sheet>

          <!-- Income & Exemption Breakdown -->
          <h3 class="text-subtitle-2 font-weight-bold mb-2">Income & Exemption Details</h3>
          <v-table density="compact" class="border rounded-lg mb-5">
            <tbody>
              <tr>
                <td class="font-weight-medium">Gross Annual Income</td>
                <td class="text-right">৳ {{ formatCurrency(result.grossIncome) }}</td>
              </tr>
              <tr>
                <td class="font-weight-medium text-medium-emphasis">
                  Less: Salary Exemption (Section 32 / Rule 19: lower of 1/3 salary or ৳4,50,000)
                </td>
                <td class="text-right text-success">- ৳ {{ formatCurrency(result.exemptSalaryIncome) }}</td>
              </tr>
              <tr class="bg-grey-lighten-5">
                <td class="font-weight-bold">Net Taxable Income</td>
                <td class="text-right font-weight-bold">৳ {{ formatCurrency(result.taxableIncome) }}</td>
              </tr>
            </tbody>
          </v-table>

          <!-- Slab Calculation Breakdown -->
          <h3 class="text-subtitle-2 font-weight-bold mb-2">Tax Slab Calculations</h3>
          <v-table density="compact" class="border rounded-lg mb-5">
            <thead>
              <tr>
                <th class="text-left font-weight-bold">Slab Bracket</th>
                <th class="text-center font-weight-bold">Rate</th>
                <th class="text-right font-weight-bold">Taxable Amount</th>
                <th class="text-right font-weight-bold">Tax Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(slab, idx) in result.slabBreakdowns" :key="idx">
                <td>{{ slab.slabDescription }}</td>
                <td class="text-center">{{ slab.ratePercent }}%</td>
                <td class="text-right">৳ {{ formatCurrency(slab.taxableAmountInSlab) }}</td>
                <td class="text-right font-weight-medium">৳ {{ formatCurrency(slab.taxForSlab) }}</td>
              </tr>
              <tr class="bg-grey-lighten-5 font-weight-bold">
                <td colspan="3">Total Tax Before Rebate</td>
                <td class="text-right">৳ {{ formatCurrency(result.taxBeforeRebate) }}</td>
              </tr>
            </tbody>
          </v-table>

          <!-- Rebate and Final Tax Details -->
          <h3 class="text-subtitle-2 font-weight-bold mb-2">Rebate & Final Determination</h3>
          <v-table density="compact" class="border rounded-lg mb-5">
            <tbody>
              <tr>
                <td class="font-weight-medium">Gross Tax Before Rebate</td>
                <td class="text-right">৳ {{ formatCurrency(result.taxBeforeRebate) }}</td>
              </tr>
              <tr>
                <td class="font-weight-medium">
                  Less: Investment Rebate (Section 78)
                </td>
                <td class="text-right text-success">- ৳ {{ formatCurrency(result.eligibleRebate) }}</td>
              </tr>
              <tr>
                <td class="font-weight-medium">Tax After Rebate</td>
                <td class="text-right">৳ {{ formatCurrency(result.taxAfterRebate) }}</td>
              </tr>
              <tr class="bg-grey-lighten-5 font-weight-bold">
                <td>Final Net Tax Payable</td>
                <td class="text-right text-primary">৳ {{ formatCurrency(result.finalTax) }}</td>
              </tr>
            </tbody>
          </v-table>

          <!-- Notes & Authoritative Disclaimer -->
          <div class="bg-grey-lighten-4 pa-4 rounded-lg border">
            <div class="text-caption font-weight-bold mb-1">
              <v-icon icon="mdi-shield-check-outline" size="14" class="mr-1" />
              Verified Ruleset & Statutory Disclaimer:
            </div>
            <ul class="text-caption text-medium-emphasis pl-4 mb-0">
              <li v-for="(note, idx) in result.notes" :key="idx">
                {{ note }}
              </li>
              <li>
                <strong>Notice:</strong> This calculator provides an estimate according to the Bangladesh Income Tax Act 2023 and the Finance Act 2024. It does not constitute formal legal or tax advisory. Actual tax liabilities may depend on specific individual circumstances, wealth surcharges, and source tax deductions.
              </li>
            </ul>
          </div>
        </v-card>

        <!-- Initial Placeholder State -->
        <v-sheet
          v-else
          border
          rounded="xl"
          class="pa-8 text-center bg-surface"
        >
          <v-avatar color="primary" variant="tonal" size="64" class="mb-4">
            <v-icon icon="mdi-calculator-variant-outline" size="32" />
          </v-avatar>
          <h3 class="text-h6 font-weight-bold mb-2">Calculate Your Bangladesh Income Tax</h3>
          <p class="text-body-2 text-medium-emphasis mb-4 mx-auto" style="max-width: 440px">
            Enter your annual income, eligible investments, and taxpayer category on the left to get a complete breakdown of exemptions, tax slabs, and rebates.
          </p>
          <v-btn color="primary" variant="tonal" rounded="lg" @click="calculate">
            Calculate Now
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { apiService, ApiException } from '../services/api';
import type { TaxRequest, TaxResponse, TaxpayerCategory, TaxpayerLocation } from '../types';

const taxYears = ['2024-2025', '2025-2026'];

const categories = [
  { label: 'General Individual (Male under 65) — ৳3,50,000 threshold', value: 'GENERAL' },
  { label: 'Female & Senior Citizens (65+) — ৳4,00,000 threshold', value: 'FEMALE_AND_SENIOR' },
  { label: 'Persons with Disabilities — ৳4,75,000 threshold', value: 'DISABLED' },
  { label: 'Gazetted War-wounded Freedom Fighters — ৳5,00,000 threshold', value: 'FREEDOM_FIGHTER' }
];

const locations = [
  { label: 'Dhaka & Chattogram City Corporation areas (Min Tax ৳5,000)', value: 'DHAKA_CHATTOGRAM_CITY' },
  { label: 'Other City Corporation areas (Min Tax ৳4,000)', value: 'OTHER_CITY' },
  { label: 'Non-City Corporation / Upazila / Rural areas (Min Tax ৳3,000)', value: 'NON_CITY' }
];

const form = ref<TaxRequest>({
  taxYear: '2024-2025',
  category: 'GENERAL' as TaxpayerCategory,
  location: 'DHAKA_CHATTOGRAM_CITY' as TaxpayerLocation,
  annualSalary: 1200000,
  otherIncome: 0,
  eligibleInvestment: 150000,
  disabledDependentsCount: 0
});

const result = ref<TaxResponse | null>(null);
const loading = ref(false);
const errorMessage = ref('');

function formatCurrency(val: number): string {
  if (val === undefined || val === null) return '0.00';
  return Number(val).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

async function calculate() {
  if (form.value.annualSalary < 0 || (form.value.otherIncome ?? 0) < 0) {
    errorMessage.value = 'Income amounts cannot be negative.';
    return;
  }
  loading.value = true;
  errorMessage.value = '';
  try {
    const res = await apiService.calculateTax(form.value);
    result.value = res;
  } catch (err: unknown) {
    if (err instanceof ApiException) {
      errorMessage.value = err.message;
    } else if (err instanceof Error) {
      errorMessage.value = err.message;
    } else {
      errorMessage.value = 'Failed to calculate Bangladesh income tax.';
    }
  } finally {
    loading.value = false;
  }
}
</script>
