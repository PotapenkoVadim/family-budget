import { supabase } from '@/clients/supabase';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useSession } from './session';

export const useBudget = defineStore('budget', () => {
  const sessionStorage = useSession();

  const budget = ref(null);
  const isDemo = computed(() => {
    return sessionStorage.currentSession?.profile?.access_type === 'demo';
  });

  const getBudget = async (dateRange, select = '*') => {
    const { data, error } = await supabase
      .from('budget')
      .select(select)
      .lte('date', dateRange[1])
      .gte('date', dateRange[0])
      .eq('demo', isDemo.value);

    if (error) {
      throw new Error(error.message);
    }

    budget.value = data;
  };

  const getCreditBudget = async (dateRange, select = '*') => {
    const { data, error } = await supabase
      .from('budget')
      .select(select)
      .lte('date', dateRange[1])
      .gte('date', dateRange[0])
      .eq('demo', isDemo.value)
      .or('is_credit.eq.true,category.eq.deposit');

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
      .eq('demo', isDemo.value);

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

  const insertBudgetItem = async (value, dateRange, select = '*') => {
    const data = { ...value, demo: isDemo.value };
    let { data: budget } = await supabase
      .from('budget')
      .select('id')
      .eq('date', value.date)
      .eq('category', value.category)
      .eq('demo', isDemo.value);

    if (budget.length) await updateItem(data);
    else await createItem(data);
    await getBudget(dateRange, select);
  };

  const resetBudget = () => {
    budget.value = null;
  };

  return {
    budget,
    getBudget,
    insertBudgetItem,
    getCreditBudget,
    resetBudget
  };
});
