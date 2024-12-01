<script setup>
import CreditTable from '@/components/CreditTable.vue';
import PageSpinner from '@/components/PageSpinner.vue';
import PageTitle from '@/components/PageTitle.vue';
import { ANNUAL_BUDGET_COLS, TOAST_DEFAULT_ERROR_MESSAGE } from '@/constants';
import { useBudget } from '@/store/budget';
import { getFirstAndLastDayOfPeriod } from '@/utils';
import Tag from 'primevue/tag';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, ref } from 'vue';

const budgetStore = useBudget();
const toast = useToast();

const isLoading = ref(true);

const getBudget = async () => {
  isLoading.value = true;
  try {
    const period = getFirstAndLastDayOfPeriod(0, 'year');
    await budgetStore.getCreditBudget(period, ANNUAL_BUDGET_COLS);
  } catch (error) {
    console.warn(error);
    toast.add(TOAST_DEFAULT_ERROR_MESSAGE);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await getBudget();
});

const income = computed(() => {
  if (!budgetStore.budget) return 0;

  return budgetStore.budget.reduce((acc, item) => {
    if (item.category === 'income') {
      acc += item.sum;
    }

    return acc;
  }, 0);
});

const credit = computed(() => {
  if (!budgetStore.budget) return 0;

  return budgetStore.budget.reduce((acc, item) => {
    if (item.is_credit) {
      acc += item.sum;
    }

    return acc;
  }, 0);
});
</script>

<template>
  <PageTitle>Расходы по кредитной карте</PageTitle>
  <div class="credit__info">
    <Tag :value="`Отложено: ${income}`" />
    <Tag :value="`Кредитные: ${credit}`" />
    <Tag severity="danger" :value="`Разница: ${income - credit}`" />
  </div>

  <PageSpinner v-if="isLoading" />
  <CreditTable v-else :budget="budgetStore.budget" />
</template>

<style scoped>
.credit__info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}
</style>
