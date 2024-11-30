<script setup>
import CreditTable from '@/components/CreditTable.vue';
import PageSpinner from '@/components/PageSpinner.vue';
import PageTitle from '@/components/PageTitle.vue';
import { ANNUAL_BUDGET_COLS, TOAST_DEFAULT_ERROR_MESSAGE } from '@/constants';
import { useBudget } from '@/store/budget';
import { getFirstAndLastDayOfPeriod } from '@/utils';
import Tag from 'primevue/tag';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

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
</script>

<template>
  <PageTitle>Расходы по кредитной карте</PageTitle>
  <div class="credit__info">
    <Tag value="Отложено: 2" />
    <Tag value="Кредитные: 200" />
    <Tag severity="danger" value="Разница: 200" />
  </div>

  <PageSpinner v-if="isLoading" />
  <CreditTable v-else />
</template>

<style scoped>
.credit__info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}
</style>
