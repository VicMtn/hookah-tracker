<script setup>
import { useAuth } from "@/hooks/useAuth";
import LoginPage from "@/pages/LoginPage.vue";
import DashboardPage from "@/pages/DashboardPage.vue";

const { user, ready } = useAuth();
</script>
<template>
  <template v-if="!ready" />
  <LoginPage v-else-if="!user" />
  <DashboardPage v-else />
</template>
