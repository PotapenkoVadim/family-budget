import { supabase } from '@/clients/supabase';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBudget = defineStore('budget', () => {
  const budget = ref(null);

  const getBudget = async (dateRange) => {
    // TODO: should return demo for guests
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

  const updateItem = async (value) => {
    const { error } = await supabase
      .from('budget')
      .update(value)
      .eq('date', value.date)
      .eq('category', value.category)
      .eq('demo', true); // TODO: demo

    if (error) {
      throw new Error(error.message);
    }
  };

  const createItem = async (value) => {
    const { error } = await supabase.from('budget').insert(value);

    if (error) {
      throw new Error(error.message);
    }
  };

  const insertBudgetItem = async (value, dateRange) => {
    // TODO: should return demo for guests
    let { data: budget } = await supabase
      .from('budget')
      .select('id')
      .eq('date', value.date)
      .eq('category', value.category);

    if (budget.length) await updateItem(value);
    else await createItem(value);
    await getBudget(dateRange);
  };

  return {
    budget,
    getBudget,
    insertBudgetItem
  };
});
