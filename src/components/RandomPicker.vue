<script setup>
import { ref } from "vue";

const emit = defineEmits(["error"]);
const namesInput = ref("");
const picked = ref("");
const picking = ref(false);

function pick() {
  const names = namesInput.value
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean);
  if (names.length < 2) {
    emit("error", "⚠️ Entre au moins 2 noms !");
    return;
  }
  picking.value = true;
  picked.value = "";
  setTimeout(() => {
    picked.value = names[Math.floor(Math.random() * names.length)];
    picking.value = false;
  }, 600);
}
</script>
<template>
  <div class="card">
    <div class="card-title">🎰 Tirage au sort</div>

    <div class="form-group">
      <label>Participants ce soir</label>
      <input
        v-model="namesInput"
        type="text"
        placeholder="Adri, Miguel, Flo..."
        @keydown.enter="pick"
      />
    </div>

    <button class="btn btn-primary" @click="pick">Tirer au sort</button>

    <div class="picker-result">
      <template v-if="picking">
        <span class="picked-sub spinning">🎲 Tirage...</span>
      </template>
      <template v-else-if="picked">
        <span class="picked-name">{{ picked }}</span>
        <span class="picked-sub">paye la prochaine !</span>
      </template>
      <template v-else>
        <span class="picked-sub">Entrez les noms et tirez !</span>
      </template>
    </div>
  </div>
</template>
