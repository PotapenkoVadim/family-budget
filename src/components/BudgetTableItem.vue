<script setup>
const props = defineProps({
  class: String,
  isTotal: Boolean
});
</script>

<template>
  <div :class="['table__item', props.class, { 'table__total-item': props.isTotal }]">
    <slot></slot>
  </div>
</template>

<style scoped>
.table__item {
  border-bottom: 1px solid var(--p-surface-800);
  border-right: 1px solid var(--p-surface-700);
  padding: 8px;
  font-size: 0.9rem;
  width: 120px;
  height: 40px;
  text-align: center;
}

.table__header .table__item {
  border-bottom: 1px solid var(--p-surface-500);
}

.table__side .table__item {
  font-size: 0.75rem;
  border-right: 1px solid var(--p-surface-500);
}

.table__total-item {
  color: var(--p-red-400);
}
</style>
