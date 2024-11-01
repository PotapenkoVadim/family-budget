<script setup>
import { groupBudgetByCategory } from '@/utils';
import { computed } from 'vue';

const props = defineProps({
  budgetData: Object
});

const tableData = computed(() => {
  return groupBudgetByCategory(props.budgetData);
});

console.warn(tableData);
</script>

<template>
  <div>Data Table</div>
</template>
