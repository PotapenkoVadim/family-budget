<script setup>
import PageTitle from '@/components/PageTitle.vue';
import { ROUTER_PATHS, TOAST_DEFAULT_ERROR_MESSAGE } from '@/constants';
import { useSession } from '@/store/session';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Password from 'primevue/password';
import { useToast } from 'primevue/usetoast';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const sessionStore = useSession();
const router = useRouter();
const toast = useToast();

const isLogInVariant = ref(false);
const email = ref('');
const isValidEmail = ref(true);
const password = ref('');
const isValidPassword = ref(true);
const isLoading = ref(false);

watch([email, password], () => {
  isValidEmail.value = true;
  isValidPassword.value = true;
});

const validateCredentials = () => {
  isValidEmail.value = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email.value);
  isValidPassword.value = /^(?=.*\d).{8,}$/g.test(password.value);

  return isValidEmail.value && isValidPassword.value;
};

const submit = async () => {
  if (validateCredentials()) {
    isLoading.value = true;
    const credentials = {
      email: email.value,
      password: password.value
    };

    try {
      if (isLogInVariant.value) {
        await sessionStore.signIn(credentials);
      } else {
        await sessionStore.signUp(credentials);
      }
      router.push(ROUTER_PATHS.budget);
    } catch (error) {
      console.warn(error);
      toast.add(TOAST_DEFAULT_ERROR_MESSAGE);
    } finally {
      isLoading.value = false;
    }
  }
};

const toggleAuth = () => (isLogInVariant.value = !isLogInVariant.value);

const titleText = computed(() => {
  return isLogInVariant.value ? 'Вход в приложение' : 'Зарегистрироваться в приложении';
});

const buttonText = computed(() => {
  return isLogInVariant.value ? 'Войти' : 'Зарегистрироваться';
});

const authText = computed(() => {
  return isLogInVariant.value ? 'Еще не зарегистрированы?' : 'Уже зарегистрированы?';
});

const authButtonText = computed(() => {
  return isLogInVariant.value ? 'Зарегистрироваться' : 'Войти со своего аккаунта';
});
</script>

<template>
  <PageTitle>{{ titleText }}</PageTitle>

  <form class="form" @submit.prevent="submit">
    <InputGroup>
      <InputGroupAddon>
        <span class="pi pi-at"></span>
      </InputGroupAddon>
      <InputText
        type="email"
        placeholder="Email"
        v-model="email"
        :required="true"
        :invalid="!isValidEmail"
        :disabled="isLoading"
      />
    </InputGroup>
    <Message v-if="!isValidEmail" severity="error"> Неверный формат пароля </Message>

    <InputGroup>
      <InputGroupAddon>
        <span class="pi pi-key"></span>
      </InputGroupAddon>
      <Password
        placeholder="Password"
        toggleMask
        v-model="password"
        :feedback="false"
        :required="true"
        :invalid="!isValidPassword"
        :disabled="isLoading"
      />
    </InputGroup>
    <Message v-if="!isValidPassword" severity="error">
      Пароль должен содержать как минимум 8 символов и 1 цифру
    </Message>

    <Button :loading="isLoading" :label="buttonText" type="submit" />
  </form>

  <div>
    <span>{{ authText }}</span>
    <Button :label="authButtonText" link @click="toggleAuth" />
  </div>
</template>

<style scoped>
.form {
  margin-top: 32px;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form__field-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

@media (max-width: 1025px) {
  .form {
    max-width: 100%;
  }
}
</style>
