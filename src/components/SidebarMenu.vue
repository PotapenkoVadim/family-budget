<script setup>
import { ROUTER_PATHS, TOAST_DEFAULT_ERROR_MESSAGE } from '@/constants';
import { useSession } from '@/store/session';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import { useToast } from 'primevue/usetoast';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const sessionStore = useSession();
const router = useRouter();
const toast = useToast();

const isLoading = ref(false);
const menuItems = ref([
  {
    key: 'home',
    label: 'Главная',
    icon: 'pi pi-home',
    route: ROUTER_PATHS.home,
    show: true
  },
  {
    key: 'daily',
    label: 'Повседневные',
    icon: 'pi pi-calendar',
    route: ROUTER_PATHS.daily,
    show: computed(() => !!sessionStore.currentSession)
  },
  {
    key: 'annual',
    label: 'Итого',
    icon: 'pi pi-briefcase',
    route: ROUTER_PATHS.annual,
    show: computed(() => !!sessionStore.currentSession)
  },
  {
    key: 'login',
    label: 'Войти',
    icon: 'pi pi-user',
    route: ROUTER_PATHS.login,
    show: computed(() => !sessionStore.currentSession)
  }
]);

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    await sessionStore.signOut();
    router.push(ROUTER_PATHS.home);
  } catch (error) {
    console.warn(error);
    toast.add(TOAST_DEFAULT_ERROR_MESSAGE);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="sidebar-menu">
    <Menu id="nav" class="sidebar-menu__menu" :model="menuItems">
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
              :class="{
                'sidebar-menu__link': true,
                'sidebar-menu__link_active': isActive
              }"
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
          v-if="!!sessionStore.currentSession"
          class="sidebar-menu__button"
          @click="handleSubmit"
          icon="pi pi-sign-out"
          label="Выход"
          :loading="isLoading"
        />
      </template>
    </Menu>
  </div>
</template>

<style>
.sidebar-menu {
  margin-top: 32px;
}

#nav.sidebar-menu__menu {
  border: none;
  background-color: inherit;
}

.sidebar-menu__link:hover {
  color: var(--secondary-white);
  transition: 0.2s;
}

.sidebar-menu__link_active {
  box-shadow: -1px 0 0 var(--accent);
}

.sidebar-menu__button {
  margin-top: 24px;
  width: 100%;
}
</style>
