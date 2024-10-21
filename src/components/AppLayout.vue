<script setup lang="ts">
import SidebarMenu from './SidebarMenu.vue';
</script>

<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="sidebar__title">Family Budget</div>
      <SidebarMenu />
    </aside>

    <main class="content">
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

.sidebar {
  padding: 24px;
  background-color: var(--secondary-dark);
  width: 260px;
}

.sidebar__title {
  font-size: 1.24rem;
  font-weight: 800;
  text-align: center;
}

.content {
  padding: 24px;
}

@media (max-width: 1025px) {
  .layout {
    gap: 0;
  }

  .sidebar {
    width: 0;
    padding: 0;
    overflow: hidden;
  }

  .content {
    padding: 12px;
  }
}

@media (max-width: 600px) {
  .content {
    padding: 4px;
  }
}
</style>
