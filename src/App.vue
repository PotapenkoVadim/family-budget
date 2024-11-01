<script setup>
import { onMounted, ref } from 'vue';
import AppLayout from './components/AppLayout.vue';
import { useSession } from './store/session';
import Toast from 'primevue/toast';

const sessionStore = useSession();

const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  try {
    await sessionStore.getSession();
  } catch (error) {
    console.warn(error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <AppLayout :isLoading="isLoading">
    <RouterView />
    <Toast />
  </AppLayout>
</template>
