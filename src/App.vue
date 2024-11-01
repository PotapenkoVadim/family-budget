<script setup>
import { onMounted, ref } from 'vue';
import AppLayout from './components/AppLayout.vue';
import { useSession } from './store/session';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { TOAST_DEFAULT_ERROR_MESSAGE } from './constants';

const sessionStore = useSession();
const toast = useToast();

const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  try {
    await sessionStore.getSession();
  } catch (error) {
    console.warn(error);
    toast.add(TOAST_DEFAULT_ERROR_MESSAGE);
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
