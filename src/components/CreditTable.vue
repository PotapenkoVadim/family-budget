<script setup>
import { computed } from 'vue';
import BudgetTable from './BudgetTable.vue';
import BudgetTableItem from './BudgetTableItem.vue';
import BudgetTableEmpty from './BudgetTableEmpty.vue';
import { EMPTY_DAILY_BUDGET_TEXT } from '@/constants';
import { addGracePeriod, toClientDate } from '@/utils';

const props = defineProps({
  budget: Object
});

const isEmpty = computed(() => {
  return !Object.keys(props.budget)?.length;
});
</script>

<template>
  <BudgetTable :className="'credit-table'">
    <template v-slot:header>
      <BudgetTableItem>Дата покупки</BudgetTableItem>
      <BudgetTableItem>Дата возврата</BudgetTableItem>
      <BudgetTableItem>Сумма</BudgetTableItem>
    </template>

    <template v-slot:body>
      <BudgetTableEmpty v-if="isEmpty">
        {{ EMPTY_DAILY_BUDGET_TEXT }}
      </BudgetTableEmpty>

      <div v-for="(sum, date) in props.budget" :key="date" class="credit-table__data">
        <BudgetTableItem>{{ toClientDate(date) }}</BudgetTableItem>
        <BudgetTableItem>{{ addGracePeriod(date) }}</BudgetTableItem>
        <BudgetTableItem>{{ sum }}</BudgetTableItem>
      </div>
    </template>
  </BudgetTable>
</template>

<style scoped>
.credit-table {
  width: max-content;
}

.credit-table__data {
  display: flex;
}

@media (max-width: 600px) {
  .credit-table {
    width: auto;
  }
}
</style>
