<script setup>
import Skeleton from 'primevue/skeleton';
</script>

<template>
  <div class="skeleton">
    <Skeleton class="skeleton__item" width="205px" height="34px"></Skeleton>
    <Skeleton class="skeleton__item" width="205px" height="34px"></Skeleton>
    <Skeleton class="skeleton__item" width="205px" height="34px"></Skeleton>
    <Skeleton class="skeleton__item" width="205px" height="34px"></Skeleton>
  </div>
</template>

<style scoped>
.skeleton {
  margin-top: 32px;
}

.skeleton__item {
  margin-top: 8px;
}
</style>
