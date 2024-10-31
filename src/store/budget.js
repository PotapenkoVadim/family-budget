import { supabase } from '@/clients/supabase';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBudget = defineStore('budget', () => {
  const budget = ref(null);

  const getBudget = async (dateRange) => {
    const { data, error } = await supabase
      .from('budget')
      .select('*')
      .lte('date', dateRange[1])
      .gte('date', dateRange[0]);

    if (error) {
      throw new Error(error.message);
    }

    budget.value = data;
  };

  return {
    budget,
    getBudget
  };
});
