<script setup>
import { ref } from "vue";
import { useSessions } from "@/hooks/useSessions";
import { useToast } from "@/hooks/useToast";

import AppHeader from "@/components/AppHeader.vue";
import StatsRow from "@/components/StatsRow.vue";
import StreakBanner from "@/components/StreakBanner.vue";
import AddSessionForm from "@/components/AddSessionForm.vue";
import RandomPicker from "@/components/RandomPicker.vue";
import HistoryList from "@/components/HistoryList.vue";
import DeleteModal from "@/components/ui/DeleteModal.vue";
import AppToast from "@/components/ui/AppToast.vue";
import AppLeaderboard from "../components/AppLeaderboard.vue";

const { sessions, addSession, deleteSession } = useSessions();
const { message: toastMessage, visible: toastVisible, showToast } = useToast();

const showDeleteModal = ref(false);
const deleteTarget = ref(null);

async function handleAddSession(payload) {
  try {
    await addSession(payload);
    showToast(`✓ ${payload.name} a payé la tournée !`);
  } catch {
    showToast("⚠️ Erreur de connexion");
  }
}

function askDelete(id) {
  deleteTarget.value = id;
  showDeleteModal.value = true;
}

async function handleConfirmDelete() {
  showDeleteModal.value = false;
  try {
    await deleteSession(deleteTarget.value);
    showToast("Tournée supprimée");
  } catch {
    showToast("⚠️ Erreur de suppression");
  }
  deleteTarget.value = null;
}
</script>
<template>
  <div class="container">
    <AppHeader />
    <StatsRow :sessions="sessions" />
    <StreakBanner :sessions="sessions" />

    <div class="main-grid">
      <AddSessionForm :sessions="sessions" @submit="handleAddSession" @error="showToast" />
      <RandomPicker @error="showToast" />
      <AppLeaderboard :sessions="sessions" />
      <HistoryList :sessions="sessions" @delete="askDelete" />
    </div>
  </div>

  <DeleteModal v-model="showDeleteModal" @confirm="handleConfirmDelete" />
  <AppToast :message="toastMessage" :visible="toastVisible" />
</template>
