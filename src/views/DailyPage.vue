<script setup>
import BudgetTable from '@/components/BudgetTable.vue';
import EditBudgetModal from '@/components/EditBudgetModal.vue';
import MonthControl from '@/components/MonthControl.vue';
import PageTitle from '@/components/PageTitle.vue';
import { TOAST_DEFAULT_ERROR_MESSAGE } from '@/constants';
import { useBudget } from '@/store/budget';
import { getFirstAndLastDayOfMonth } from '@/utils';
import ProgressSpinner from 'primevue/progressspinner';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref, watch } from 'vue';

const budgetStore = useBudget();
const toast = useToast();

const monthOffset = ref(0);
const isLoading = ref(false);
const isOpen = ref(false);
const selectedBudgetItem = ref();

const handleBackMonth = () => (monthOffset.value -= 1);
const handleForwardMonth = () => (monthOffset.value += 1);
const getBudget = async (monthOffset) => {
  isLoading.value = true;
  try {
    await budgetStore.getBudget(getFirstAndLastDayOfMonth(monthOffset));
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
    await budgetStore.insertBudgetItem(budgetItem, getFirstAndLastDayOfMonth(monthOffset.value));
  } catch (error) {
    console.warn(error);
    toast.add(TOAST_DEFAULT_ERROR_MESSAGE);
  } finally {
    isLoading.value = false;
  }
};

const selectBudgetItem = (value) => {
  if (value) {
    selectedBudgetItem.value = value;
    isOpen.value = true;
  }
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
  <PageTitle>Учет повседневных финансов.</PageTitle>
  <MonthControl
    @onBack="handleBackMonth"
    @onForward="handleForwardMonth"
    @onEdit="isOpen = true"
    :monthOffset="monthOffset"
    :isLoading="isLoading"
  />
  <div class="daily__spinner" v-if="isLoading">
    <ProgressSpinner />
  </div>

  <BudgetTable v-else :budgetData="budgetStore.budget" @onClick="selectBudgetItem" />

  <EditBudgetModal
    :budget="budgetStore.budget"
    :visible="isOpen"
    :selectedBudgetItem="selectedBudgetItem"
    @onClose="closeEditModal"
    @onEdit="editBudget"
  />
</template>

<style scoped>
.daily__spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 36px;
}
</style>
