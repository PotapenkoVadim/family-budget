import { supabase } from '@/clients/supabase';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSession = defineStore('session', () => {
  const currentSession = ref(null);
  const sessionError = ref(true);

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (data.session) {
      currentSession.value = data.session;
      sessionError.value = null;
    }

    if (error) {
      sessionError.value = error;
      currentSession.value = null;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      sessionError.value = error;
      return;
    }

    currentSession.value = null;
    sessionError.value = null;
  };

  return {
    currentSession,
    sessionError,
    getSession,
    signOut
  };
});
