<script setup>
import { computed } from "vue";

const props = defineProps({
  sessions: { type: Array, required: true },
});

const last = computed(() => props.sessions[0] ?? null);

const subtitle = computed(() => {
  if (!last.value) return "";
  const days = Math.floor((Date.now() - new Date(last.value.date)) / 86400000);
  const when = days === 0 ? "Aujourd'hui" : `Il y a ${days} jour(s)`;
  return last.value.amount ? `${when} · ${last.value.amount} CHF` : when;
});
</script>
<template>
  <div v-if="last" class="streak-banner">
    <div class="streak-icon">🔥</div>
    <div class="streak-text">
      <div class="top">Dernière tournée payée par</div>
      <div class="name">{{ last.name }}</div>
      <div class="sub">{{ subtitle }}</div>
    </div>
  </div>
</template>
