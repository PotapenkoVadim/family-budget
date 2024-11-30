<script setup>
import BudgetTable from './BudgetTable.vue';
import BudgetTableItem from './BudgetTableItem.vue';
</script>

<template>
  <BudgetTable :className="'credit-table'">
    <template v-slot:header>
      <BudgetTableItem>Дата покупки</BudgetTableItem>
      <BudgetTableItem>Дата возврата</BudgetTableItem>
      <BudgetTableItem>Сумма</BudgetTableItem>
    </template>

    <template v-slot:body> </template>
  </BudgetTable>
</template>

<style scoped>
.credit-table {
  width: max-content;
}
</style>
