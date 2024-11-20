<script setup>
import { CATEGORIES_DIC, MONTHS, TOTAL_CATEGORIES } from '@/constants';
import BudgetTable from './BudgetTable.vue';
import BudgetTableItem from './BudgetTableItem.vue';

const props = defineProps({
  budgetData: Object
});

console.warn(props.budgetData);
</script>

<template>
  <BudgetTable>
    <template v-slot:side>
      <BudgetTableItem v-for="month in MONTHS" :key="month">
        {{ month }}
      </BudgetTableItem>
    </template>

    <template v-slot:header>
      <BudgetTableItem v-for="category in TOTAL_CATEGORIES" :key="category">
        {{ CATEGORIES_DIC[category] }}
      </BudgetTableItem>
      <BudgetTableItem>Итого</BudgetTableItem>
    </template>

    <template v-slot:body> Content </template>
  </BudgetTable>
</template>
