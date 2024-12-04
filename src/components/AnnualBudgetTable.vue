<script setup>
import {
  CATEGORIES_DIC,
  DASH_CHAR,
  EMPTY_ANNUAL_BUDGET_TEXT,
  MONTHS,
  TOTAL_CATEGORIES
} from '@/constants';
import BudgetTable from './BudgetTable.vue';
import BudgetTableItem from './BudgetTableItem.vue';
import { computed } from 'vue';
import {
  calculateAnnualResultByCategories,
  calculateAnnualResultByMonth,
  getAnnualTotal,
  getAnnualTotalByCategory,
  toRoundNumber
} from '@/utils';
import BudgetTableEmpty from './BudgetTableEmpty.vue';

const props = defineProps({
  budgetData: Object
});

const tableData = computed(() => {
  return getAnnualTotal(props.budgetData);
});

const isEmpty = computed(() => {
  return tableData.value.every((obj) => Object.keys(obj).length === 0);
});

const totalByCategories = computed(() => {
  return calculateAnnualResultByCategories(tableData.value);
});
</script>

<template>
  <BudgetTable>
    <template v-slot:side>
      <template v-if="!isEmpty">
        <BudgetTableItem v-for="month in MONTHS" :key="month">
          {{ month }}
        </BudgetTableItem>
        <BudgetTableItem v-if="!isEmpty">Итого</BudgetTableItem>
      </template>
    </template>

    <template v-slot:header>
      <BudgetTableItem v-for="category in TOTAL_CATEGORIES" :key="category">
        {{ CATEGORIES_DIC[category] }}
      </BudgetTableItem>
      <BudgetTableItem>Итого</BudgetTableItem>
    </template>

    <template v-slot:body>
      <BudgetTableEmpty v-if="isEmpty">
        {{ EMPTY_ANNUAL_BUDGET_TEXT }}
      </BudgetTableEmpty>

      <div v-else v-for="(item, index) in tableData" :key="index" class="table__data">
        <BudgetTableItem v-for="category in TOTAL_CATEGORIES" :key="category">
          {{ getAnnualTotalByCategory(item, category) || DASH_CHAR }}
        </BudgetTableItem>
        <BudgetTableItem isTotal>
          {{ toRoundNumber(calculateAnnualResultByMonth(tableData[index])) }}
        </BudgetTableItem>
      </div>

      <div v-if="!isEmpty" class="table__total">
        <BudgetTableItem v-for="category in TOTAL_CATEGORIES" :key="category" isTotal>
          {{ totalByCategories[category] || DASH_CHAR }}
        </BudgetTableItem>
      </div>
    </template>
  </BudgetTable>
</template>

<style scoped>
.table__total,
.table__data {
  display: flex;
}
</style>
