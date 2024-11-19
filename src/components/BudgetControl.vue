<script setup>
import Button from 'primevue/button';

const props = defineProps({
  isEditable: Boolean,
  isLoading: Boolean
});
</script>

<template>
  <div class="control">
    <Button
      :disabled="props.isLoading"
      text
      @click="$emit('onBack')"
      icon="pi pi-caret-left"
      size="small"
    />

    <div class="control__text">
      <slot></slot>
    </div>

    <Button
      :disabled="props.isLoading"
      text
      @click="$emit('onForward')"
      icon="pi pi-caret-right"
      size="small"
    />

    <Button
      v-if="props.isEditable"
      :disabled="props.isLoading"
      text
      @click="$emit('onEdit')"
      class="control__add"
      icon="pi pi-pencil"
      size="small"
    />
  </div>
</template>

<style scoped>
.control {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 12px;
}

.control__text {
  color: var(--accent);
}

@media (max-width: 1025px) {
  .control__add {
    margin-left: auto;
  }
}
</style>
