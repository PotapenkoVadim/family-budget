<script setup>
import SidebarMenu from './SidebarMenu.vue';
</script>

<template>
  <div class="layout">
    <aside class="layout__sidebar">
      <div class="layout__title">Family Budget</div>
      <SidebarMenu />
    </aside>

    <main class="layout__content">
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>
.layout {
  height: 100vh;
  display: grid;
  gap: 12px;
  grid-template-columns: auto 1fr;
}

.layout__sidebar {
  padding: 24px;
  background-color: var(--secondary-dark);
  width: 260px;
}

.layout__title {
  font-size: 1.24rem;
  font-weight: 800;
  cursor: default;
  color: var(--p-primary-400);
}

.layout__content {
  padding: 24px;
}

@media (max-width: 1025px) {
  .layout {
    gap: 0;
  }

  .layout__sidebar {
    width: 0;
    padding: 0;
    overflow: hidden;
  }

  .layout__content {
    padding: 16px;
  }
}

@media (max-width: 600px) {
  .layout__content {
    padding: 10px;
  }
}
</style>
