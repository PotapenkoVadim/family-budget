<script setup>
import BudgetTable from './BudgetTable.vue';
import { CATEGORIES, CATEGORIES_DIC, DASH_CHAR, EMPTY_DAILY_BUDGET_TEXT } from '@/constants';
import {
  calculateDailyResultByCategory,
  calculateDailyResultByDay,
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
  transition: 0.4s;
}

.table__item_active {
  background-color: rgba(52, 211, 153, 0.4);
}
</style>
