<script setup>
import ProgressSpinner from 'primevue/progressspinner';
import MenuSkeleton from './MenuSkeleton.vue';
import SidebarMenu from './SidebarMenu.vue';
import Button from 'primevue/button';
import { ref } from 'vue';

const props = defineProps({
  isLoading: Boolean
});

const isOpenMobileMenu = ref(false);
</script>

<template>
  <div class="layout">
    <aside :class="{ layout__sidebar: true, layout__sidebar_open: isOpenMobileMenu }">
      <div class="layout__title">Family Budget</div>
      <MenuSkeleton v-if="props.isLoading" />
      <SidebarMenu v-else @afterNavigate="isOpenMobileMenu = false" />
    </aside>

    <main class="layout__content">
      <Button
        class="layout__burger"
        text
        :icon="isOpenMobileMenu ? 'pi pi-times' : 'pi pi-bars'"
        @click="isOpenMobileMenu = !isOpenMobileMenu"
        v-if="!props.isLoading"
      />

      <div class="layout__spinner" v-if="props.isLoading">
        <ProgressSpinner />
      </div>
      <slot v-else></slot>
    </main>
  </div>
</template>

<style scoped>
.layout {
  position: relative;
  height: 100vh;
  display: grid;
  gap: 12px;
  grid-template-columns: auto 1fr;
}

.layout__sidebar {
  padding: 24px;
  background-color: var(--secondary-dark);
  width: 260px;
  height: 100%;
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

.layout__spinner {
  width: calc(100vw - 340px);
  height: calc(100vh - 48px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.layout__burger {
  position: absolute;
  right: 0;
  display: none;
  margin-left: auto;
}

@media (max-width: 1025px) {
  .layout__burger {
    display: block;
  }

  .layout {
    gap: 0;
  }

  .layout__sidebar {
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
    z-index: 999;
    transition: 0.45s;
    transform: translateX(-100%);
  }

  .layout__sidebar_open {
    transform: translateX(0);
  }

  .layout__content {
    padding: 16px;
    width: 100vw;
  }
}

@media (max-width: 600px) {
  .layout__content {
    padding: 10px;
  }
}
</style>
