<script setup>
import { SIDEBAR_MENU_ITEMS } from '@/constants';
import Menu from 'primevue/menu';
import { ref } from 'vue';

const items = ref(SIDEBAR_MENU_ITEMS);
</script>

<template>
  <div class="sidebar-menu">
    <Menu class="menu" :model="items">
      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate, isActive }"
          :to="item.route"
          custom
        >
          <a
            :href="href"
            v-bind="props.action"
            @click="navigate"
            :class="{ link_active: isActive }"
          >
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>

        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
    </Menu>
  </div>
</template>

<style scoped>
.sidebar-menu {
  margin-top: 32px;
}
</style>

<style>
.menu {
  border: none !important;
  background-color: inherit !important;
}

.link_active {
  box-shadow: 0 1px 0 var(--white);
}
</style>
