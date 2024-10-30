import { supabase } from '@/clients/supabase';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSession = defineStore('session', () => {
  const currentSession = ref(null);

  async function getSession() {
    const { data, error } = await supabase.auth.getSession();

    if (data.session) {
      currentSession.value = data.session;
    }

    if (error) {
      throw new Error(error.message);
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    currentSession.value = null;
  }

  async function signUp(credentials) {
    const { error } = await supabase.auth.signUp(credentials);

    if (error) {
      throw new Error(error.message);
    }

    await getSession();
  }

  async function signIn(credentials) {
    const { error } = await supabase.auth.signInWithPassword(credentials);

    if (error) {
      throw new Error(error.message);
    }

    await getSession();
  }

  return {
    currentSession,
    getSession,
    signOut,
    signUp,
    signIn
  };
});
