<script setup>
import { computed } from "vue";

const props = defineProps({
  sessions: { type: Array, required: true },
});

const total = computed(() => props.sessions.length);
const participants = computed(() => new Set(props.sessions.map((s) => s.name)).size);
const amounts = computed(() => props.sessions.filter((s) => s.amount).map((s) => s.amount));
const sum = computed(() => amounts.value.reduce((a, b) => a + b, 0));

const totalAmount = computed(() => (sum.value ? sum.value.toFixed(0) + " CHF" : "— CHF"));
const avgAmount = computed(() => {
  const avg = amounts.value.length ? sum.value / amounts.value.length : 0;
  return avg ? avg.toFixed(0) + " CHF" : "— CHF";
});
</script>
<template>
  <div class="stats-row">
    <div class="stat-card">
      <span class="val">{{ total }}</span>
      <span class="lbl">Tournées</span>
    </div>
    <div class="stat-card">
      <span class="val">{{ participants }}</span>
      <span class="lbl">Participants</span>
    </div>
    <div class="stat-card">
      <span class="val">{{ totalAmount }}</span>
      <span class="lbl">Total dépensé</span>
    </div>
    <div class="stat-card">
      <span class="val">{{ avgAmount }}</span>
      <span class="lbl">Moyenne / tournée</span>
    </div>
  </div>
</template>
