<script setup>
defineProps({ sessions: { type: Array, required: true } });
const emit = defineEmits(["delete"]);

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("fr-CH", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
</script>
<template>
  <div class="card history-list">
    <div class="card-title">Historique</div>

    <div v-if="sessions.length === 0" class="empty-state">Aucune tournée enregistrée</div>

    <div v-for="s in sessions" :key="s.id" class="history-item">
      <div class="history-dot"></div>
      <div class="history-info">
        <div class="history-name">{{ s.name }}</div>
        <div class="history-meta">
          <span>{{ formatDate(s.date) }}</span>
          <span v-if="s.note">{{ s.note }}</span>
        </div>
      </div>
      <div v-if="s.amount" class="history-amount">{{ s.amount }} CHF</div>
      <div class="history-actions">
        <button class="btn btn-danger" @click="emit('delete', s.id)">✕</button>
      </div>
    </div>
  </div>
</template>
