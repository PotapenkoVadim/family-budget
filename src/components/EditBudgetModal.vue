<script setup>
import { CATEGORIES_DIC, SERVER_DATE_FORMAT } from '@/constants';
import moment from 'moment';
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
  visible: Boolean
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
      date: moment(date.value).format(SERVER_DATE_FORMAT),
      sum: sum.value,
      category: category.value.code,
      comment: comment.value,
      demo: true // TODO: should add demo item for guests
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
        <DatePicker dateFormat="dd.mm.yy" inputId="date" v-model="date" fluid />
        <Message v-if="!isValidDate" severity="error">Обязательное поле</Message>
      </div>

      <div>
        <label class="modal__label" for="sum">Сумма покупки</label>
        <InputNumber
          inputId="sum"
          v-model="sum"
          mode="currency"
          currency="RUB"
          locale="de-RU"
          fluid
        />
        <Message v-if="!isValidSum" severity="error">Обязательное поле</Message>
      </div>

      <div>
        <label class="modal__label" for="sum">Категория</label>
        <Select optionLabel="name" :options="categories" v-model="category" fluid />
        <Message v-if="!isValidCategory" severity="error">Обязательное поле</Message>
      </div>
      <div>
        <label class="modal__label" for="comment">Комментарий</label>
        <Textarea v-model="comment" rows="3" fluid />
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
  width: 680px;
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
