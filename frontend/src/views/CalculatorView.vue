<template>
  <v-container class="py-8" style="max-width: 900px">
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
      <v-avatar color="accent" variant="tonal" size="56" rounded="lg">
        <v-icon icon="mdi-calculator" size="32" />
      </v-avatar>
      <div>
        <h1 class="text-h4 font-weight-bold">Calculator</h1>
        <p class="text-body-2 text-medium-emphasis mb-0">
          Perform everyday mathematical calculations with support for arithmetic, percentages, and parentheses.
        </p>
      </div>
    </div>

    <v-row>
      <!-- Calculator Body -->
      <v-col cols="12" md="7">
        <v-card elevation="2" rounded="xl" class="pa-4 pa-sm-6 border">
          <!-- Display Screen -->
          <v-sheet
            color="grey-lighten-4"
            rounded="lg"
            class="pa-4 mb-4 text-right"
            elevation="0"
            border
          >
            <div class="text-caption text-medium-emphasis text-truncate" style="min-height: 20px">
              {{ lastEvaluatedExpression || '&nbsp;' }}
            </div>
            <v-text-field
              v-model="expression"
              placeholder="0"
              variant="plain"
              hide-details
              density="compact"
              class="calc-input text-right font-weight-bold"
              :loading="loading"
              @keydown.enter.prevent="evaluate"
            />
            <div
              v-if="result !== null"
              class="text-h5 font-weight-bold text-primary mt-1 text-truncate"
            >
              = {{ formattedResult }}
            </div>
          </v-sheet>

          <!-- Error Alert -->
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

          <!-- Keypad Grid -->
          <div class="calc-grid">
            <v-btn size="large" variant="tonal" color="error" rounded="lg" @click="clear">C</v-btn>
            <v-btn size="large" variant="tonal" color="secondary" rounded="lg" @click="append('(')">(</v-btn>
            <v-btn size="large" variant="tonal" color="secondary" rounded="lg" @click="append(')')">)</v-btn>
            <v-btn size="large" variant="tonal" color="secondary" rounded="lg" @click="backspace">⌫</v-btn>

            <v-btn size="large" variant="tonal" color="secondary" rounded="lg" @click="append('%')">%</v-btn>
            <v-btn size="large" variant="tonal" color="secondary" rounded="lg" @click="append('^')">^</v-btn>
            <v-btn size="large" variant="tonal" color="primary" rounded="lg" @click="append('/')">÷</v-btn>
            <v-btn size="large" variant="tonal" color="primary" rounded="lg" @click="append('*')">×</v-btn>

            <v-btn size="large" variant="outlined" rounded="lg" @click="append('7')">7</v-btn>
            <v-btn size="large" variant="outlined" rounded="lg" @click="append('8')">8</v-btn>
            <v-btn size="large" variant="outlined" rounded="lg" @click="append('9')">9</v-btn>
            <v-btn size="large" variant="tonal" color="primary" rounded="lg" @click="append('-')">−</v-btn>

            <v-btn size="large" variant="outlined" rounded="lg" @click="append('4')">4</v-btn>
            <v-btn size="large" variant="outlined" rounded="lg" @click="append('5')">5</v-btn>
            <v-btn size="large" variant="outlined" rounded="lg" @click="append('6')">6</v-btn>
            <v-btn size="large" variant="tonal" color="primary" rounded="lg" @click="append('+')">+</v-btn>

            <v-btn size="large" variant="outlined" rounded="lg" @click="append('1')">1</v-btn>
            <v-btn size="large" variant="outlined" rounded="lg" @click="append('2')">2</v-btn>
            <v-btn size="large" variant="outlined" rounded="lg" @click="append('3')">3</v-btn>
            <v-btn
              size="large"
              variant="flat"
              color="primary"
              rounded="lg"
              class="font-weight-bold"
              :loading="loading"
              @click="evaluate"
            >
              =
            </v-btn>

            <v-btn size="large" variant="outlined" rounded="lg" style="grid-column: span 2" @click="append('0')">0</v-btn>
            <v-btn size="large" variant="outlined" rounded="lg" @click="append('.')">.</v-btn>
            <v-btn size="large" variant="tonal" color="accent" rounded="lg" @click="evaluate">Eval</v-btn>
          </div>
        </v-card>
      </v-col>

      <!-- History & Features Sidebar -->
      <v-col cols="12" md="5">
        <v-card elevation="1" rounded="xl" class="pa-4 border mb-4">
          <div class="d-flex align-center justify-space-between mb-3">
            <h3 class="text-subtitle-1 font-weight-bold">Calculation History</h3>
            <v-btn
              v-if="history.length > 0"
              size="small"
              variant="text"
              color="error"
              density="compact"
              @click="history = []"
            >
              Clear
            </v-btn>
          </div>

          <div v-if="history.length === 0" class="text-caption text-medium-emphasis py-4 text-center">
            No calculations yet. Enter an expression and press '='.
          </div>

          <v-list v-else density="compact" class="pa-0">
            <v-list-item
              v-for="(item, index) in history"
              :key="index"
              rounded="lg"
              class="mb-1"
              @click="reuseHistory(item)"
            >
              <template #title>
                <div class="d-flex justify-space-between">
                  <span class="text-caption text-medium-emphasis">{{ item.expression }}</span>
                  <span class="text-body-2 font-weight-bold text-primary">= {{ item.formattedResult }}</span>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-card>

        <v-card elevation="0" rounded="xl" class="pa-4 bg-grey-lighten-4 border">
          <h4 class="text-subtitle-2 font-weight-bold mb-2">Tips</h4>
          <ul class="text-caption text-medium-emphasis pl-4">
            <li>You can type directly into the input using your keyboard.</li>
            <li>Supports standard precedence: <code>( )</code>, <code>^</code>, <code>*</code>, <code>/</code>, <code>+</code>, <code>-</code>.</li>
            <li>Percentage operator: <code>50 * 10%</code> calculates 5.</li>
            <li>Calculations are performed safely with high-precision arithmetic.</li>
          </ul>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { apiService, ApiException } from '../services/api';
import type { CalculatorResponse } from '../types';

const expression = ref('');
const lastEvaluatedExpression = ref('');
const result = ref<string | null>(null);
const formattedResult = ref('');
const loading = ref(false);
const errorMessage = ref('');
const history = ref<CalculatorResponse[]>([]);

function append(char: string) {
  errorMessage.value = '';
  expression.value += char;
}

function clear() {
  expression.value = '';
  result.value = null;
  formattedResult.value = '';
  errorMessage.value = '';
}

function backspace() {
  errorMessage.value = '';
  expression.value = expression.value.slice(0, -1);
}

function reuseHistory(item: CalculatorResponse) {
  expression.value = item.result;
  result.value = item.result;
  formattedResult.value = item.formattedResult;
  lastEvaluatedExpression.value = item.expression;
}

async function evaluate() {
  if (!expression.value || !expression.value.trim()) {
    errorMessage.value = 'Please enter an expression to calculate.';
    return;
  }
  loading.value = true;
  errorMessage.value = '';
  try {
    const res = await apiService.evaluateCalculator(expression.value);
    result.value = res.result;
    formattedResult.value = res.formattedResult;
    lastEvaluatedExpression.value = res.expression;
    history.value.unshift(res);
    if (history.value.length > 10) {
      history.value.pop();
    }
  } catch (err: unknown) {
    if (err instanceof ApiException) {
      errorMessage.value = err.message;
    } else if (err instanceof Error) {
      errorMessage.value = err.message;
    } else {
      errorMessage.value = 'Failed to evaluate expression.';
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.calc-input :deep(input) {
  text-align: right !important;
  font-size: 1.5rem !important;
}
.calc-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}
</style>
