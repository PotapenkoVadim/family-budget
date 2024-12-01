import { supabase } from '@/clients/supabase';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useSession } from './session';

export const useBudget = defineStore('budget', () => {
  const sessionStorage = useSession();
  const isDemo = sessionStorage.currentSession.profile.access_type === 'demo';

  const budget = ref(null);

  const getBudget = async (dateRange, select = '*') => {
    const { data, error } = await supabase
      .from('budget')
      .select(select)
      .lte('date', dateRange[1])
      .gte('date', dateRange[0])
      .eq('demo', isDemo);

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
      .eq('demo', isDemo)
      .or('is_credit.eq.true,category.eq.income');

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
      .eq('demo', isDemo);

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
    const data = { ...value, demo: isDemo };
    let { data: budget } = await supabase
      .from('budget')
      .select('id')
      .eq('date', value.date)
      .eq('category', value.category)
      .eq('demo', isDemo);

    if (budget.length) await updateItem(data);
    else await createItem(data);
    await getBudget(dateRange, select);
  };

  return {
    budget,
    getBudget,
    insertBudgetItem,
    getCreditBudget
  };
});
