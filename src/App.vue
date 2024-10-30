<script setup>
import { onMounted } from 'vue';
import AppLayout from './components/AppLayout.vue';
import { useSession } from './store/session';
import Toast from 'primevue/toast';

const sessionStore = useSession();

onMounted(async () => {
  await sessionStore.getSession();
});
</script>

<template>
  <AppLayout>
    <RouterView />
    <Toast />
  </AppLayout>
</template>
