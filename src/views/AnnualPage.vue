<script setup>
import AnnualBudgetTable from '@/components/AnnualBudgetTable.vue';
import BudgetControl from '@/components/BudgetControl.vue';
import PageSpinner from '@/components/PageSpinner.vue';
import PageTitle from '@/components/PageTitle.vue';
import { ANNUAL_BUDGET_COLS, TOAST_DEFAULT_ERROR_MESSAGE } from '@/constants';
import { useBudget } from '@/store/budget';
import { getFirstAndLastDayOfPeriod, getYearText } from '@/utils';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref, watch } from 'vue';

const budgetStore = useBudget();
const toast = useToast();

const yearOffset = ref(0);
const isLoading = ref(true);

const getBudget = async (yearOffset) => {
  isLoading.value = true;
  try {
    const period = getFirstAndLastDayOfPeriod(yearOffset, 'year');
    await budgetStore.getBudget(period, ANNUAL_BUDGET_COLS);
  } catch (error) {
    console.warn(error);
    toast.add(TOAST_DEFAULT_ERROR_MESSAGE);
  } finally {
    isLoading.value = false;
  }
};

const handleBackYear = () => (yearOffset.value -= 1);
const handleForwardYear = () => (yearOffset.value += 1);

onMounted(async () => {
  await getBudget(yearOffset.value);
});

watch(yearOffset, async () => {
  await getBudget(yearOffset.value);
});
</script>

<template>
  <PageTitle>Бюджет за год</PageTitle>
  <BudgetControl @onBack="handleBackYear" @onForward="handleForwardYear" :isLoading="isLoading">
    {{ getYearText(yearOffset) }}
  </BudgetControl>

  <PageSpinner v-if="isLoading" />
  <AnnualBudgetTable v-else :budgetData="budgetStore.budget" />
</template>
