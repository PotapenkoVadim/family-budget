import { supabase } from '@/clients/supabase';
import { defineStore } from 'pinia';

export const useSession = defineStore('session', {
  state: () => ({
    currentUser: null,
    error: null,
    loading: false,
    test: false
  }),
  actions: {
    async getSession() {
      this.loading = true;
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        this.session = data.session;
      }

      if (error) {
        this.error = error;
      }

      this.loading = false;
      this.test = true;
    }
  }
});
