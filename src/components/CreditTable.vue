<script setup>
import { computed } from 'vue';
import BudgetTable from './BudgetTable.vue';
import BudgetTableItem from './BudgetTableItem.vue';
import BudgetTableEmpty from './BudgetTableEmpty.vue';
import { EMPTY_DAILY_BUDGET_TEXT } from '@/constants';
import { addGracePeriod, toClientDate } from '@/utils';

const props = defineProps({
  budget: Array
});

const creditData = computed(() => {
  return props.budget.filter((item) => item.is_credit);
});

const isEmpty = computed(() => {
  return !props.budget.length;
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

      <div v-for="data in creditData" :key="data.id" class="credit-table__data">
        <BudgetTableItem>{{ toClientDate(data.date) }}</BudgetTableItem>
        <BudgetTableItem>{{ addGracePeriod(data.date) }}</BudgetTableItem>
        <BudgetTableItem>{{ data.sum }}</BudgetTableItem>
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
