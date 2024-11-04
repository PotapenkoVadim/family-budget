<script setup>
import { CATEGORIES, CATEGORIES_DIC, CLIENT_DATE_FORMAT } from '@/constants';
import { groupBudgetByCategory } from '@/utils';
import moment from 'moment';
import { computed } from 'vue';

const props = defineProps({
  budgetData: Object
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
</script>

<template>
  <div class="table">
    <div class="table__dates">
      <div v-for="date in dates" :key="date" class="table__item">
        {{ moment(date).format(CLIENT_DATE_FORMAT) }}
      </div>
    </div>

    <div class="table__content">
      <div class="table__header">
        <div v-for="category in CATEGORIES" :key="category" class="table__item">
          {{ CATEGORIES_DIC[category] }}
        </div>
      </div>

      <div class="table__wrapper">
        <div class="table__empty" v-if="isEmpty">Данные за этот месяц отсутствуют</div>

        <div v-else v-for="date in dates" :key="date" class="table__data">
          <div v-for="category in CATEGORIES" class="table__item" :key="category">
            {{ tableData[date][category]?.reduce((acc, i) => (acc += i.sum), 0) || '-' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table {
  margin-top: 12px;
  background-color: var(--light-dark);
  border-radius: 4px;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  overflow: auto;
  width: calc(100vw - 324px);
  height: calc(100vh - 140px);
}

.table__content {
  width: max-content;
  height: max-content;
}

.table__dates {
  position: sticky;
  left: 0;
  background-color: var(--light-dark);
  margin-top: 40px;
  box-shadow: 0 2px 8px var(--p-surface-700);
  height: max-content;
}

.table__header {
  display: flex;
  position: sticky;
  top: 0;
  background-color: var(--light-dark);
  box-shadow: 2px 0 8px var(--p-surface-700);
}

.table__item {
  width: max-content;
  border-bottom: 1px solid var(--p-surface-800);
  border-right: 1px solid var(--p-surface-700);
  padding: 8px;
  font-size: 0.9rem;
  width: 100px;
  height: 40px;
}

.table__dates .table__item {
  font-size: 0.75rem;
  border-right: 1px solid var(--p-surface-500);
}

.table__header .table__item {
  border-bottom: 1px solid var(--p-surface-500);
}

.table__empty {
  font-size: 0.9rem;
  padding: 16px;
  color: var(--p-red-400);
}

.table__data {
  display: flex;
}

@media (max-width: 1025px) {
  .table {
    width: calc(100vw - 20px);
  }
}
</style>
