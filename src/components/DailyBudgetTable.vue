<script setup>
import BudgetTable from './BudgetTable.vue';
import { CATEGORIES, CATEGORIES_DIC, DASH_CHAR, EMPTY_DAILY_BUDGET_TEXT } from '@/constants';
import {
  calculateDailyResultByCategory,
  calculateDailyResultByDay,
  getComment,
  groupBudgetByCategory,
  toClientDate,
  toRoundNumber
} from '@/utils';
import { computed } from 'vue';
import BudgetTableItem from './BudgetTableItem.vue';
import BudgetTableEmpty from './BudgetTableEmpty.vue';

const props = defineProps({
  budgetData: Object,
  selectedBudgetItem: Object
});

const tableData = computed(() => {
  return groupBudgetByCategory(props.budgetData);
});

const isEmpty = computed(() => {
  return !Object.values(tableData.value).length;
});

const dates = computed(() => {
  return Object.keys(tableData.value);
});

const totalByCategories = computed(() => {
  return calculateDailyResultByCategory(tableData.value);
});
</script>

<template>
  <BudgetTable>
    <template v-slot:side>
      <BudgetTableItem v-for="date in dates" :key="date">
        {{ toClientDate(date) }}
      </BudgetTableItem>
      <BudgetTableItem v-if="!isEmpty">Итого</BudgetTableItem>
    </template>

    <template v-slot:header>
      <BudgetTableItem v-for="category in CATEGORIES" :key="category">
        {{ CATEGORIES_DIC[category] }}
      </BudgetTableItem>
      <BudgetTableItem>Итого</BudgetTableItem>
    </template>

    <template v-slot:body>
      <BudgetTableEmpty v-if="isEmpty">
        {{ EMPTY_DAILY_BUDGET_TEXT }}
      </BudgetTableEmpty>

      <div v-else v-for="date in dates" :key="date" class="table__data">
        <BudgetTableItem
          v-for="category in CATEGORIES"
          :key="category"
          v-bind:data-comment="getComment(tableData[date][category])"
          :class="{
            table__item_active:
              selectedBudgetItem?.category === category && selectedBudgetItem?.date === date
          }"
          @click="
            $emit(
              'onClick',
              tableData[date][category] ? tableData[date][category][0] : undefined,
              date,
              category
            )
          "
        >
          {{ tableData[date][category]?.reduce((acc, i) => (acc += i.sum), 0) || DASH_CHAR }}
        </BudgetTableItem>
        <BudgetTableItem isTotal>
          {{ toRoundNumber(calculateDailyResultByDay(tableData[date])) }}
        </BudgetTableItem>
      </div>

      <div v-if="!isEmpty" class="table__total">
        <BudgetTableItem v-for="category in CATEGORIES" :key="category" isTotal>
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

.table__item {
  position: relative;
  transition: 0.4s;
  cursor: pointer;
}

.table__item[data-comment]:hover::after {
  content: '';
  position: absolute;
  top: 0;
  left: 16%;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid var(--p-surface-600);
  z-index: 999;
}

.table__item[data-comment]:hover::before {
  content: attr(data-comment);
  position: absolute;
  top: -70%;
  left: 10%;
  padding: 2px 24px;
  border-radius: 4px;
  border: none;
  background-color: var(--p-surface-600);
  color: var(--white);
  width: max-content;
  z-index: 999;
  box-shadow: 1px 1px 1px var(--white);
}

.table__item_active {
  background-color: rgba(52, 211, 153, 0.4);
}
</style>
