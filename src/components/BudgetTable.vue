<script setup>
const props = defineProps({
  className: String
});
</script>

<template>
  <div :class="['table', props.className]">
    <div class="table__side">
      <slot name="side"></slot>
    </div>

    <div class="table__content">
      <div class="table__header">
        <slot name="header"></slot>
      </div>

      <div class="table__wrapper">
        <slot name="body"></slot>
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

.table__side {
  position: sticky;
  left: 0;
  background-color: var(--light-dark);
  margin-top: 34px;
  box-shadow: 0 2px 8px var(--p-surface-700);
  height: max-content;
  z-index: 1;
}

.table__header {
  display: flex;
  position: sticky;
  top: 0;
  background-color: var(--light-dark);
  box-shadow: 2px 0 8px var(--p-surface-700);
}

@media (max-width: 1025px) {
  .table {
    width: calc(100vw - 20px);
  }
}
</style>
