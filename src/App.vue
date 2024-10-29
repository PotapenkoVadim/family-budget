<script setup>
import { onMounted } from 'vue';
import AppLayout from './components/AppLayout.vue';
import { useSession } from './store/session';

const sessionStore = useSession();

onMounted(async () => {
  await sessionStore.getSession();
});
</script>

<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>
