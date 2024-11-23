<script setup>
import PageSpinner from '@/components/PageSpinner.vue';
import PageTitle from '@/components/PageTitle.vue';
import { DAILY_BUDGET_COLS, TOAST_DEFAULT_ERROR_MESSAGE } from '@/constants';
import { useBudget } from '@/store/budget';
import { getFirstAndLastDayOfPeriod } from '@/utils';
import Card from 'primevue/card';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

const budgetStore = useBudget();
const toast = useToast();

const isLoading = ref(true);
const isMonthPanel = ref('month');

const getBudget = async () => {
  isLoading.value = true;
  try {
    const period = getFirstAndLastDayOfPeriod(0, 'month');
    await budgetStore.getBudget(period, DAILY_BUDGET_COLS);
  } catch (error) {
    console.warn(error);
    toast.add(TOAST_DEFAULT_ERROR_MESSAGE);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await getBudget();
});
</script>

<template>
  <PageTitle>Показатели бюджета</PageTitle>

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
            <div v-if="isMonthPanel" class="home__card-content">Month Budget Content</div>
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
            <div v-if="!isMonthPanel" class="home__card-content">Annual Budget Content</div>
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
  min-height: 320px;
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
  color: var(--secondary-white);
  display: flex;
  align-items: center;
  gap: 6px;
  transition: 0.5s ease-in;
  width: max-content;
  transform: rotate(-90deg) translate(-60px, -60px);
}

.home__card_open .home__card-title {
  color: var(--accent);
  transform: rotate(0) translate(0, 0);
}

.home__card-content {
  margin-top: 12px;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(250px);
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
}
</style>
