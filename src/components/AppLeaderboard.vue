<script setup>
import { computed } from "vue";

const props = defineProps({ sessions: { type: Array, required: true } });
const sorted = computed(() => {
  const counts = {},
    amounts = {};
  props.sessions.forEach((s) => {
    counts[s.name] = (counts[s.name] || 0) + 1;
    amounts[s.name] = (amounts[s.name] || 0) + (s.amount || 0);
  });
  return Object.entries(amounts)
    .map(([name, total]) => ({ name, total, count: counts[name] }))
    .sort((a, b) => b.total - a.total);
});

const max = computed(() => sorted.value[0]?.total || 1);

const MEDALS = ["gold", "silver", "bronze"];
const MEDAL_ICONS = ["🥇", "🥈", "🥉"];

function barWidth(total) {
  return (total / max.value) * 100;
}
function medalClass(i) {
  return MEDALS[i] ?? "";
}
function medalIcon(i) {
  return MEDAL_ICONS[i];
}
</script>
<template>
  <div class="card leaderboard">
    <div class="card-title">🏆 Classement</div>

    <div v-if="sorted.length === 0" class="empty-state">Aucune donnée</div>

    <div v-for="(entry, i) in sorted" :key="entry.name" class="leader-item">
      <span class="leader-rank" :class="medalClass(i)">
        {{ i < 3 ? medalIcon(i) : i + 1 }}
      </span>
      <span class="leader-name">{{ entry.name }}</span>
      <div class="leader-bar-wrap">
        <div class="leader-bar" :style="{ width: barWidth(entry.total) + '%' }"></div>
      </div>
      <div class="leader-count">{{ entry.total.toFixed(0) }} CHF<br />{{ entry.count }}×</div>
    </div>
  </div>
</template>
