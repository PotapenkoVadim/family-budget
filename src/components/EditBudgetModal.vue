<script setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const props = defineProps({
  visible: Boolean
});
</script>

<template>
  <Dialog
    header="Редактировать бюджет"
    :visible="props.visible"
    :draggable="false"
    :closable="false"
    modal
  >
    <div class="modal__content">EDIT BUDGET MODAL</div>

    <template #footer>
      <div class="modal__buttons">
        <Button @click="$emit('onClose')" severity="danger" label="Отмена" text />

        <Button @click="$emit('onEdit')" label="Сохранить" outlined />
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

@media (max-width: 1025px) {
  .modal__content {
    width: 100%;
  }
}
</style>
