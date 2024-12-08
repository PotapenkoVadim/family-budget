<script setup>
import CreditTable from '@/components/CreditTable.vue';
import PageSpinner from '@/components/PageSpinner.vue';
import PageTitle from '@/components/PageTitle.vue';
import { ANNUAL_BUDGET_COLS, SERVER_DATE_FORMAT, TOAST_DEFAULT_ERROR_MESSAGE } from '@/constants';
import { useBudget } from '@/store/budget';
import { getFirstAndLastDayOfPeriod, toRoundNumber } from '@/utils';
import moment from 'moment';
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
    if (item.category === 'deposit') {
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

const diff = computed(() => {
  const incomeValue = income.value || 0;
  const creditValue = credit.value || 0;

  return toRoundNumber(incomeValue - creditValue);
});

const creditDataByDate = computed(() => {
  return budgetStore.budget?.reduce((acc, item) => {
    if (item.category !== 'deposit') {
      const date = moment(item.date).startOf('month').format(SERVER_DATE_FORMAT);
      acc[date] = (acc[date] || 0) + item.sum;
    }

    return acc;
  }, {});
});
</script>

<template>
  <PageTitle>Расходы по кредитной карте</PageTitle>
  <PageSpinner v-if="isLoading" />

  <template v-else>
    <div class="credit__info">
      <Tag :value="`Отложено: ${toRoundNumber(income)}`" />
      <Tag severity="danger" :value="`Кредитные: ${toRoundNumber(credit)}`" />
      <Tag :value="`Разница: ${diff}`" />
    </div>

    <CreditTable :budget="creditDataByDate" />
  </template>
</template>

<style scoped>
.credit__info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

@media (max-width: 600px) {
  .credit__info {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
