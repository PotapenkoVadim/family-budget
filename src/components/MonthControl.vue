<script setup>
import { getMonthName } from '@/utils';
import Button from 'primevue/button';

const props = defineProps({
  monthOffset: Number
});
</script>

<template>
  <div class="month">
    <Button text @click="$emit('onBack')" icon="pi pi-caret-left" size="small" />
    <div class="month__text">{{ getMonthName(props.monthOffset) }}</div>
    <Button text @click="$emit('onForward')" icon="pi pi-caret-right" size="small" />

    <Button text @click="$emit('onEdit')" class="month__add" icon="pi pi-pencil" size="small" />
  </div>
</template>

<style scoped>
.month {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 12px;
}

.month__text {
  color: var(--accent);
}

@media (max-width: 1025px) {
  .month__add {
    margin-left: auto;
  }
}
</style>
