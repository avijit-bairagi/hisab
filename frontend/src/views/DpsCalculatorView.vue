<template>
  <v-container class="py-8" style="max-width: 1000px">
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
        <v-icon icon="mdi-piggy-bank-outline" size="32" />
      </v-avatar>
      <div>
        <h1 class="text-h4 font-weight-bold">DPS Calculator</h1>
        <p class="text-body-2 text-medium-emphasis mb-0">
          Estimate maturity value and interest earnings for Deposit Pension Schemes (DPS).
        </p>
      </div>
    </div>

    <v-row>
      <!-- Form Input Column -->
      <v-col cols="12" md="5">
        <v-card elevation="1" rounded="xl" class="pa-5 border">
          <h2 class="text-subtitle-1 font-weight-bold mb-4">DPS Parameters</h2>

          <!-- Monthly Deposit -->
          <v-text-field
            v-model.number="form.monthlyDeposit"
            label="Monthly Deposit Amount (BDT)"
            type="number"
            min="100"
            step="500"
            prefix="৳"
            variant="outlined"
            density="comfortable"
            class="mb-3"
            :rules="[rules.required, rules.positiveNumber]"
          />

          <!-- Duration Presets -->
          <div class="mb-3">
            <label class="text-caption font-weight-medium text-medium-emphasis mb-1 d-block">
              Duration Preset
            </label>
            <div class="d-flex flex-wrap ga-2">
              <v-chip
                v-for="preset in durationPresets"
                :key="preset.months"
                size="small"
                :variant="form.durationMonths === preset.months ? 'flat' : 'outlined'"
                :color="form.durationMonths === preset.months ? 'primary' : 'secondary'"
                clickable
                @click="form.durationMonths = preset.months"
              >
                {{ preset.label }}
              </v-chip>
            </div>
          </div>

          <!-- Duration in Months -->
          <v-text-field
            v-model.number="form.durationMonths"
            label="Duration (Months)"
            type="number"
            min="1"
            max="360"
            variant="outlined"
            density="comfortable"
            class="mb-3"
            suffix="months"
            :rules="[rules.required, rules.positiveInteger]"
          />

          <!-- Annual Interest Rate -->
          <v-text-field
            v-model.number="form.annualInterestRate"
            label="Annual Interest / Profit Rate (%)"
            type="number"
            min="0"
            max="100"
            step="0.25"
            suffix="%"
            variant="outlined"
            density="comfortable"
            class="mb-3"
            :rules="[rules.required, rules.nonNegativeNumber]"
          />

          <!-- Deposit Timing Convention -->
          <v-select
            v-model="form.depositTiming"
            label="Deposit Timing"
            :items="timingOptions"
            item-title="label"
            item-value="value"
            variant="outlined"
            density="comfortable"
            class="mb-3"
          />

          <!-- Compounding Frequency -->
          <v-select
            v-model="form.compoundingFrequency"
            label="Compounding Frequency"
            :items="compoundingOptions"
            item-title="label"
            item-value="value"
            variant="outlined"
            density="comfortable"
            class="mb-4"
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
            Calculate Maturity
          </v-btn>
        </v-card>
      </v-col>

      <!-- Results Column -->
      <v-col cols="12" md="7">
        <!-- Results Card -->
        <v-card v-if="result" elevation="1" rounded="xl" class="pa-5 border mb-6">
          <div class="d-flex align-center justify-space-between mb-4">
            <h2 class="text-subtitle-1 font-weight-bold">Estimated Maturity Summary</h2>
            <v-chip color="success" size="small" variant="flat">
              Calculated
            </v-chip>
          </div>

          <v-row class="mb-4">
            <v-col cols="12" sm="4">
              <v-sheet border rounded="lg" class="pa-3 text-center bg-grey-lighten-5">
                <div class="text-caption text-medium-emphasis">Total Deposit</div>
                <div class="text-h6 font-weight-bold text-secondary">
                  ৳ {{ formatCurrency(result.totalPrincipal) }}
                </div>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="4">
              <v-sheet border rounded="lg" class="pa-3 text-center bg-grey-lighten-5">
                <div class="text-caption text-medium-emphasis">Estimated Profit</div>
                <div class="text-h6 font-weight-bold text-success">
                  ৳ {{ formatCurrency(result.estimatedProfit) }}
                </div>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="4">
              <v-sheet border rounded="lg" class="pa-3 text-center bg-primary text-white">
                <div class="text-caption text-white text-opacity-90">Maturity Amount</div>
                <div class="text-h6 font-weight-bold">
                  ৳ {{ formatCurrency(result.maturityAmount) }}
                </div>
              </v-sheet>
            </v-col>
          </v-row>

          <!-- Yearly Breakdown Table -->
          <div v-if="result.breakdown && result.breakdown.length > 0" class="mb-4">
            <h3 class="text-subtitle-2 font-weight-bold mb-2">Year-by-Year Growth</h3>
            <v-table density="compact" class="border rounded-lg">
              <thead>
                <tr>
                  <th class="text-left font-weight-bold">Period</th>
                  <th class="text-right font-weight-bold">Deposit</th>
                  <th class="text-right font-weight-bold">Cumulative Profit</th>
                  <th class="text-right font-weight-bold">Total Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in result.breakdown" :key="row.year">
                  <td>Year {{ row.year }}</td>
                  <td class="text-right">৳ {{ formatCurrency(row.depositedAmount) }}</td>
                  <td class="text-right text-success">+ ৳ {{ formatCurrency(row.earnedProfit) }}</td>
                  <td class="text-right font-weight-medium">৳ {{ formatCurrency(row.balance) }}</td>
                </tr>
              </tbody>
            </v-table>
          </div>

          <!-- Assumptions and Notes -->
          <div class="bg-grey-lighten-4 pa-4 rounded-lg border">
            <div class="text-caption font-weight-bold mb-1">
              <v-icon icon="mdi-information-outline" size="14" class="mr-1" />
              Calculation Assumptions & Bank Disclaimer:
            </div>
            <ul class="text-caption text-medium-emphasis pl-4 mb-0">
              <li v-for="(assumption, idx) in result.assumptions" :key="idx">
                {{ assumption }}
              </li>
              <li>
                <strong>Notice:</strong> DPS products vary across financial institutions (e.g. leap years, exact daily interest counting, excise duty, and AIT tax deductions at source). This value represents an estimate, not a bank guarantee.
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
            <v-icon icon="mdi-chart-line" size="32" />
          </v-avatar>
          <h3 class="text-h6 font-weight-bold mb-2">Plan Your Savings</h3>
          <p class="text-body-2 text-medium-emphasis mb-4 mx-auto" style="max-width: 440px">
            Enter your monthly installment amount, expected annual rate, and investment tenure on the left to view your projected maturity schedule.
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
import type { DpsDepositTiming, DpsCompoundingFrequency, DpsRequest, DpsResponse } from '../types';

const form = ref<DpsRequest>({
  monthlyDeposit: 5000,
  durationMonths: 60,
  annualInterestRate: 8.5,
  depositTiming: 'BEGINNING_OF_MONTH',
  compoundingFrequency: 'MONTHLY'
});

const durationPresets = [
  { label: '1 Year', months: 12 },
  { label: '3 Years', months: 36 },
  { label: '5 Years', months: 60 },
  { label: '7 Years', months: 84 },
  { label: '10 Years', months: 120 }
];

const timingOptions = [
  { label: 'Beginning of Month (Advance / Annuity Due)', value: 'BEGINNING_OF_MONTH' },
  { label: 'End of Month (Arrears / Ordinary Annuity)', value: 'END_OF_MONTH' }
];

const compoundingOptions = [
  { label: 'Monthly (Most Common in BD)', value: 'MONTHLY' },
  { label: 'Quarterly', value: 'QUARTERLY' },
  { label: 'Semi-Annually', value: 'SEMI_ANNUALLY' },
  { label: 'Annually', value: 'ANNUALLY' }
];

const result = ref<DpsResponse | null>(null);
const loading = ref(false);
const errorMessage = ref('');

const rules = {
  required: (v: unknown) => v !== '' && v !== null && v !== undefined || 'This field is required',
  positiveNumber: (v: number) => v > 0 || 'Must be greater than 0',
  nonNegativeNumber: (v: number) => v >= 0 || 'Must be 0 or greater',
  positiveInteger: (v: number) => Number.isInteger(v) && v > 0 || 'Must be a positive whole number'
};

function formatCurrency(val: number): string {
  if (val === undefined || val === null) return '0.00';
  return Number(val).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

async function calculate() {
  if (form.value.monthlyDeposit <= 0 || form.value.durationMonths <= 0 || form.value.annualInterestRate < 0) {
    errorMessage.value = 'Please fill all required fields with valid positive values.';
    return;
  }
  loading.value = true;
  errorMessage.value = '';
  try {
    const res = await apiService.calculateDps(form.value);
    result.value = res;
  } catch (err: unknown) {
    if (err instanceof ApiException) {
      errorMessage.value = err.message;
    } else if (err instanceof Error) {
      errorMessage.value = err.message;
    } else {
      errorMessage.value = 'Failed to calculate DPS maturity.';
    }
  } finally {
    loading.value = false;
  }
}
</script>
