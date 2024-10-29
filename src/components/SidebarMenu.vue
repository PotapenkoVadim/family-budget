<script setup>
import { useNavigationMenu } from '@/hooks/useNavigationMenu';
import { useSession } from '@/store/session';
import Button from 'primevue/button';
import Menu from 'primevue/menu';

const sessionStore = useSession();
const { menuItems } = useNavigationMenu();
</script>

<template>
  <div class="sidebar-menu">
    <Menu id="nav" class="menu" :model="menuItems">
      <template #item="{ item, props }">
        <template v-if="item.show">
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
              :class="{ link: true, link_active: isActive }"
            >
              <span :class="item.icon" />
              <span>{{ item.label }}</span>
            </a>
          </router-link>

          <a v-else :href="item.url" :target="item.target" v-bind="props.action">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </template>
      </template>

      <template #end>
        <Button
          v-if="Boolean(sessionStore.currentSession)"
          class="sign-out-button"
          @click="sessionStore.signOut"
        >
          <span class="pi pi-sign-out"></span>
          <span>Выход</span>
        </Button>
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
#nav.menu {
  border: none;
  background-color: inherit;
}

.link:hover {
  color: var(--secondary-white);
  transition: 0.2s;
}

.link_active {
  box-shadow: -1px 0 0 var(--accent);
}

.sign-out-button {
  margin-top: 24px;
  width: 100%;
}
</style>
