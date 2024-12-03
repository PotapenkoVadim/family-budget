<script setup>
import PageSpinner from '@/components/PageSpinner.vue';
import PageTitle from '@/components/PageTitle.vue';
import ReviewBudget from '@/components/ReviewBudget.vue';
import { ANNUAL_BUDGET_COLS, ROUTER_PATHS, TOAST_DEFAULT_ERROR_MESSAGE } from '@/constants';
import { useBudget } from '@/store/budget';
import { useSession } from '@/store/session';
import {
  getChartData,
  getFirstAndLastDayOfPeriod,
  getInCome,
  getMaxSpend,
  getMostSpend,
  getMostSpendCategory,
  isCurrentMonth,
  transformToAnnualBudget
} from '@/utils';
import Card from 'primevue/card';
import Message from 'primevue/message';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, ref } from 'vue';

const sessionStorage = useSession();
const budgetStore = useBudget();
const toast = useToast();

const isLoading = ref(true);
const isMonthPanel = ref(true);

const getBudget = async () => {
  isLoading.value = true;
  try {
    const period = getFirstAndLastDayOfPeriod(0, 'year');
    await budgetStore.getBudget(period, ANNUAL_BUDGET_COLS);
  } catch (error) {
    console.warn(error);
    toast.add(TOAST_DEFAULT_ERROR_MESSAGE);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  if (sessionStorage.currentSession) {
    await getBudget();
  } else {
    isLoading.value = false;
  }
});

const data = computed(() => {
  return isMonthPanel.value
    ? budgetStore.budget?.filter((item) => isCurrentMonth(item.date))
    : transformToAnnualBudget(budgetStore.budget);
});

const chartData = computed(() => {
  return getChartData(data.value);
});

const mostSpendText = computed(() => {
  return getMostSpend(data.value);
});

const mostSpendCategoryText = computed(() => {
  return getMostSpendCategory(data.value);
});

const maxSpendText = computed(() => {
  return getMaxSpend(data.value);
});

const inComeText = computed(() => {
  return getInCome(data.value);
});
</script>

<template>
  <PageTitle>Показатели бюджета</PageTitle>
  <Message v-if="!sessionStorage.currentSession" class="home__message" severity="error">
    Необходимо
    <router-link class="home__login-link" :to="ROUTER_PATHS.login">войти</router-link>
    в приложение.
  </Message>

  <PageSpinner v-if="isLoading" />

  <div v-else class="home__content">
    <div class="home__cards">
      <Card
        @click="isMonthPanel = !isMonthPanel"
        :class="['home__card', { home__card_open: isMonthPanel }]"
      >
        <template #title>
          <div class="home__card-title">
            <span class="pi pi-wallet"></span>
            <span>Текущий месяц</span>
          </div>
        </template>

        <template #content>
          <Transition>
            <ReviewBudget
              v-if="isMonthPanel"
              :mostSpend="{ title: 'Самая большая трата:', text: mostSpendText }"
              :mostSpendCategory="{
                title: 'Самая затратная категория:',
                text: mostSpendCategoryText
              }"
              :maxSpend="{ title: 'Всего трат:', text: maxSpendText }"
              :inCome="{ title: 'Доход:', text: inComeText }"
              :chartData="chartData"
            />
          </Transition>
        </template>
      </Card>

      <Card
        @click="isMonthPanel = !isMonthPanel"
        :class="['home__card', { home__card_open: !isMonthPanel }]"
      >
        <template #title>
          <div class="home__card-title">
            <span class="pi pi-wallet"></span>
            <span>Текущий год</span>
          </div>
        </template>

        <template #content>
          <Transition>
            <ReviewBudget
              v-if="!isMonthPanel"
              :mostSpend="{ title: 'Самая большая трата:', text: mostSpendText }"
              :mostSpendCategory="{
                title: 'Самая затратная категория:',
                text: mostSpendCategoryText
              }"
              :maxSpend="{ title: 'Всего трат:', text: maxSpendText }"
              :inCome="{ title: 'Доход:', text: inComeText }"
              :chartData="chartData"
            />
          </Transition>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.home__cards {
  display: flex;
  margin-top: 14px;
  gap: 24px;
  width: 100%;
  overflow: hidden;
}

.home__content {
  width: 100%;
  overflow: hidden;
}

.home__card {
  flex: 0;
  min-width: 60px;
  min-height: 500px;
  transition: 0.65s ease-out;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
}

.home__card_open {
  flex: 1;
}

.home__card-title {
  font-size: 0.94rem;
  font-weight: 600;
  color: var(--p-gray-400);
  display: flex;
  align-items: center;
  gap: 6px;
  transition: 0.5s ease-out;
  width: max-content;
  transform: rotate(-90deg) translate(-60px, -60px);
}

.home__card_open .home__card-title {
  color: var(--accent);
  transform: rotate(0) translate(0, 0);
}

.home__message {
  margin-top: 8px;
}

.home__login-link {
  color: var(--p-message-error-color);
  text-decoration: underline;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(-800px);
}

@media (max-width: 600px) {
  .home__cards {
    flex-direction: column;
    gap: 12px;
  }

  .home__card {
    min-height: auto;
  }

  .home__card-title {
    transform: rotate(0) translate(0, 0);
  }

  .home__card-content {
    flex-direction: column;
    gap: 14px;
  }

  .v-enter-active,
  .v-leave-active {
    transition: none;
  }
}
</style>
