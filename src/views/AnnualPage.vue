<script setup>
import PageSpinner from '@/components/PageSpinner.vue';
import PageTitle from '@/components/PageTitle.vue';
import { ANNUAL_BUDGET_COLS, TOAST_DEFAULT_ERROR_MESSAGE } from '@/constants';
import { useBudget } from '@/store/budget';
import { getFirstAndLastDayOfPeriod } from '@/utils';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

const budgetStore = useBudget();
const toast = useToast();

const yearOffset = ref(0);
const isLoading = ref(true);

const getBudget = async (yearOffset) => {
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

onMounted(async () => {
  await getBudget(yearOffset.value);
});
</script>

<template>
  <PageTitle>Бюджет за год</PageTitle>

  <PageSpinner v-if="isLoading" />
  <div v-else>Data Table</div>
</template>
