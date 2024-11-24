<script setup>
import Chart from 'primevue/chart';
import InfoBlock from './InfoBlock.vue';
import { CHART_OPTIONS } from '@/constants';

const props = defineProps({
  mostSpend: Object,
  mostSpendCategory: Object,
  maxSpend: Object,
  inCome: Object,
  chartData: Object
});
</script>

<template>
  <div class="review">
    <div class="review__info">
      <InfoBlock :title="props.mostSpend.title" :text="props.mostSpend.text" />
      <InfoBlock :title="props.mostSpendCategory.title" :text="props.mostSpendCategory.text" />
      <InfoBlock :title="props.maxSpend.title" :text="props.maxSpend.text" />
      <InfoBlock :title="props.inCome.title" :text="props.inCome.text" />
    </div>

    <Chart type="doughnut" :data="props.chartData" :options="CHART_OPTIONS" class="review__chart" />
  </div>
</template>

<style scoped>
.review {
  display: flex;
  align-items: flex-start;
  gap: 100px;
  margin-top: 22px;
}

.review__chart {
  max-width: 320px;
}

.review__info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (max-width: 600px) {
  .review {
    flex-direction: column;
    gap: 14px;
  }
}
</style>
