<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  sessions: { type: Array, required: true },
});
const emit = defineEmits(["submit", "error"]);

const name = ref("");
const amount = ref("");
const note = ref("");
const nameRef = ref(null);
const amountRef = ref(null);
const noteRef = ref(null);

const suggestions = computed(() => [...new Set(props.sessions.map((s) => s.name))]);

function focusAmount() {
  amountRef.value?.focus();
}
function focusNote() {
  noteRef.value?.focus();
}

function handleSubmit() {
  if (!name.value.trim()) {
    emit("error", "⚠️ Entre un prénom !");
    return;
  }
  emit("submit", {
    name: name.value.trim(),
    amount: parseFloat(amount.value) || null,
    note: note.value.trim(),
  });
  name.value = "";
  amount.value = "";
  note.value = "";
  nameRef.value?.focus();
}
</script>
<template>
  <div class="card">
    <div class="card-title">Nouvelle tournée</div>

    <div class="form-group">
      <label>Qui paie ?</label>
      <input
        ref="nameRef"
        v-model="name"
        type="text"
        list="namesSuggestions"
        @keydown.enter="focusAmount"
      />
      <datalist id="namesSuggestions">
        <option v-for="n in suggestions" :key="n" :value="n" />
      </datalist>
    </div>

    <div class="form-group">
      <label>Montant — optionnel</label>
      <input
        ref="amountRef"
        v-model="amount"
        type="number"
        min="0"
        step="0.1"
        @keydown.enter="focusNote"
      />
    </div>

    <div class="form-group">
      <label>Note — optionnel</label>
      <input
        ref="noteRef"
        v-model="note"
        type="text"
        placeholder="ex: Mad Café, Sky, chez Miguel"
        @keydown.enter="handleSubmit"
      />
    </div>

    <button class="btn btn-primary" @click="handleSubmit">＋ Enregistrer</button>
  </div>
</template>
