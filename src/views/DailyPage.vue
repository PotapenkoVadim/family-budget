<script setup>
import BudgetControl from '@/components/BudgetControl.vue';
import DailyBudgetTable from '@/components/DailyBudgetTable.vue';
import EditBudgetModal from '@/components/EditBudgetModal.vue';
import PageSpinner from '@/components/PageSpinner.vue';
import PageTitle from '@/components/PageTitle.vue';
import { DAILY_BUDGET_COLS, TOAST_DEFAULT_ERROR_MESSAGE } from '@/constants';
import { useBudget } from '@/store/budget';
import { getFirstAndLastDayOfPeriod, getMonthName } from '@/utils';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref, watch } from 'vue';

const budgetStore = useBudget();
const toast = useToast();

const monthOffset = ref(0);
const isLoading = ref(true);
const isOpen = ref(false);
const selectedBudgetItem = ref();

const handleBackMonth = () => (monthOffset.value -= 1);
const handleForwardMonth = () => (monthOffset.value += 1);
const getBudget = async (monthOffset) => {
  isLoading.value = true;
  try {
    const period = getFirstAndLastDayOfPeriod(monthOffset, 'month');
    await budgetStore.getBudget(period, DAILY_BUDGET_COLS);
  } catch (error) {
    console.warn(error);
    toast.add(TOAST_DEFAULT_ERROR_MESSAGE);
  } finally {
    isLoading.value = false;
  }
};

const editBudget = async (budgetItem) => {
  isOpen.value = false;
  isLoading.value = true;
  try {
    const period = getFirstAndLastDayOfPeriod(monthOffset.value, 'month');
    await budgetStore.insertBudgetItem(budgetItem, period, DAILY_BUDGET_COLS);
  } catch (error) {
    console.warn(error);
    toast.add(TOAST_DEFAULT_ERROR_MESSAGE);
  } finally {
    isLoading.value = false;
  }
};

const selectBudgetItem = (value, date, category) => {
  selectedBudgetItem.value = { ...value, date, category };
  isOpen.value = true;
};

const closeEditModal = () => {
  isOpen.value = false;
  selectedBudgetItem.value = undefined;
};

onMounted(async () => {
  await getBudget(monthOffset.value);
});

watch(monthOffset, async () => {
  await getBudget(monthOffset.value);
});
</script>

<template>
  <PageTitle>Учет повседневных финансов</PageTitle>
  <BudgetControl
    @onBack="handleBackMonth"
    @onForward="handleForwardMonth"
    @onEdit="isOpen = true"
    :monthOffset="monthOffset"
    :isLoading="isLoading"
    isEditable
  >
    {{ getMonthName(monthOffset) }}
  </BudgetControl>

  <PageSpinner v-if="isLoading" />
  <DailyBudgetTable v-else :budgetData="budgetStore.budget" @onClick="selectBudgetItem" />

  <EditBudgetModal
    :budget="budgetStore.budget"
    :visible="isOpen"
    :selectedBudgetItem="selectedBudgetItem"
    @onClose="closeEditModal"
    @onEdit="editBudget"
  />
</template>
