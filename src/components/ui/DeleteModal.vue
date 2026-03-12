<script setup>
defineProps({ modelValue: { type: Boolean, default: false } });
const emit = defineEmits(["update:modelValue", "confirm"]);
</script>
<template>
  <div
    class="modal-overlay"
    :class="{ open: modelValue }"
    @click.self="emit('update:modelValue', false)"
  >
    <div class="modal">
      <h3>Supprimer cette tournée ?</h3>
      <p class="modal-text">Cette action est irréversible.</p>
      <div class="modal-actions">
        <button class="btn btn-ghost" @click="emit('update:modelValue', false)">Annuler</button>
        <button class="btn btn-primary btn-delete" @click="emit('confirm')">Supprimer</button>
      </div>
    </div>
  </div>
</template>
