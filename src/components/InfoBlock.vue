<script setup>
const props = defineProps({
  title: String,
  text: String,
  className: String
});
</script>

<template>
  <div :class="['info', props.className]">
    <div class="info__title">{{ props.title }}</div>
    <div class="info__text">{{ props.text }}</div>
  </div>
</template>

<style scoped>
.info {
  font-size: 0.9rem;
}

.info__title {
  color: var(--p-gray-400);
  font-weight: 600;
}
</style>
