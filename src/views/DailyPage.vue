<script setup>
import MonthControl from '@/components/MonthControl.vue';
import PageTitle from '@/components/PageTitle.vue';
import { useBudget } from '@/store/budget';
import { getFirstAndLastDayOfMonth } from '@/utils';
import ProgressSpinner from 'primevue/progressspinner';
import { onMounted, ref, watch } from 'vue';

const budgetStore = useBudget();

const monthOffset = ref(0);
const isLoading = ref(false);

const handleBackMonth = () => (monthOffset.value -= 1);
const handleForwardMonth = () => (monthOffset.value += 1);
const getBudget = async (monthOffset) => {
  isLoading.value = true;
  try {
    await budgetStore.getBudget(getFirstAndLastDayOfMonth(monthOffset));
  } catch (error) {
    console.warn(error);
  } finally {
    isLoading.value = false;
  }
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
    :monthOffset="monthOffset"
  />

  <div class="daily__spinner" v-if="isLoading">
    <ProgressSpinner />
  </div>

  <div v-else>BUDGET CONTENT</div>
</template>

<style scoped>
.daily__spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 36px;
}
</style>
