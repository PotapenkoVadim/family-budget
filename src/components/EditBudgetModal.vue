<script setup>
import { CATEGORIES_DIC } from '@/constants';
import { toServerDate } from '@/utils';
import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import Message from 'primevue/message';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import { ref, watch } from 'vue';

const emit = defineEmits(['onEdit', 'onClose']);
const props = defineProps({
  visible: Boolean,
  budget: Object,
  selectedBudgetItem: Object
});

const date = ref(new Date());
const isValidDate = ref(true);
const sum = ref();
const isValidSum = ref(true);
const category = ref();
const isValidCategory = ref(true);
const comment = ref();

const categories = Object.keys(CATEGORIES_DIC).map((key) => ({
  code: key,
  name: CATEGORIES_DIC[key]
}));

const validate = () => {
  isValidDate.value = Boolean(date.value);
  isValidSum.value = Boolean(sum.value);
  isValidCategory.value = Boolean(category.value);

  return isValidDate.value && isValidSum.value && isValidCategory.value;
};

const submit = () => {
  if (validate()) {
    emit('onEdit', {
      date: toServerDate(date.value),
      sum: sum.value,
      category: category.value.code,
      comment: comment.value
    });
  }
};

watch(
  () => props.visible,
  () => {
    if (!props.visible) {
      date.value = new Date();
      sum.value = undefined;
      category.value = undefined;
      comment.value = undefined;
    }
  }
);

watch([() => props.budget, date, category], ([budget, date, category]) => {
  const edited = budget?.find(
    (item) => item.category === category?.code && item.date === toServerDate(date)
  );

  sum.value = edited?.sum;
});

watch(
  () => props.selectedBudgetItem,
  (prev) => {
    if (prev) {
      date.value = new Date(prev[0].date);
      comment.value = prev[0].comment;
      category.value = {
        code: prev[0].category,
        name: CATEGORIES_DIC[prev[0].category]
      };
    }
  }
);
</script>

<template>
  <Dialog
    header="Редактировать бюджет"
    :visible="props.visible"
    :draggable="false"
    :closable="false"
    modal
  >
    <form id="edit-budget" class="modal__content" @submit.prevent="submit">
      <div>
        <label class="modal__label" for="date">Дата покупки</label>
        <DatePicker :required="true" dateFormat="dd.mm.yy" inputId="date" v-model="date" fluid />
        <Message v-if="!isValidDate" severity="error">Обязательное поле</Message>
      </div>

      <div>
        <label class="modal__label" for="category">Категория</label>
        <Select
          :required="true"
          optionLabel="name"
          labelId="category"
          :options="categories"
          v-model="category"
          fluid
        />
        <Message v-if="!isValidCategory" severity="error">Обязательное поле</Message>
      </div>

      <div>
        <label class="modal__label" for="sum">Сумма покупки</label>
        <InputNumber
          inputId="sum"
          v-model="sum"
          mode="currency"
          currency="RUB"
          locale="de-RU"
          :required="true"
          fluid
        />
        <Message v-if="!isValidSum" severity="error">Обязательное поле</Message>
      </div>

      <div>
        <label class="modal__label" for="comment">Комментарий</label>
        <Textarea v-model="comment" id="comment" rows="3" fluid />
      </div>
    </form>

    <template #footer>
      <div class="modal__buttons">
        <Button @click="$emit('onClose')" severity="danger" label="Отмена" text />
        <Button type="submit" form="edit-budget" label="Сохранить" outlined />
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
.modal__content {
  width: 400px;
}

.modal__buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal__content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.modal__label {
  font-size: 0.78rem;
  color: var(--secondary-white);
}

@media (max-width: 1025px) {
  .modal__content {
    width: 100%;
  }
}
</style>
