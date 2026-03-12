<script setup>
import { ref } from "vue";
import { signIn, signInWithGoogle, getAuthErrorMessage } from "@/lib/auth";

const email = ref("");
const password = ref("");
const errorMsg = ref("");
const loading = ref(false);
const emailRef = ref(null);
const passwordRef = ref(null);

function focusPassword() {
  passwordRef.value?.focus();
}

async function handleLogin() {
  if (!email.value || !password.value) {
    errorMsg.value = "Remplis tous les champs.";
    return;
  }
  loading.value = true;
  errorMsg.value = "";
  try {
    await signIn(email.value.trim(), password.value);
  } catch (err) {
    errorMsg.value = getAuthErrorMessage(err.code);
    password.value = "";
    passwordRef.value?.focus();
  } finally {
    loading.value = false;
  }
}

async function handleGoogle() {
  loading.value = true;
  errorMsg.value = "";
  try {
    await signInWithGoogle();
  } catch (err) {
    errorMsg.value = getAuthErrorMessage(err.code);
  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <div class="login-screen">
    <div class="login-box">
      <div class="login-title">Hookah</div>
      <div class="login-subtitle">Accès membres</div>

      <div class="login-field">
        <label>Email</label>
        <input
          ref="emailRef"
          v-model="email"
          class="login-input"
          type="email"
          placeholder="ton@email.com"
          autocomplete="email"
          @keydown.enter="focusPassword"
        />
      </div>

      <div class="login-field">
        <label>Mot de passe</label>
        <input
          ref="passwordRef"
          v-model="password"
          class="login-input"
          type="password"
          autocomplete="current-password"
          @keydown.enter="handleLogin"
        />
      </div>

      <div class="login-error">{{ errorMsg }}</div>

      <button class="login-btn" :disabled="loading" @click="handleLogin">
        {{ loading ? "Connexion..." : "Entrer" }}
      </button>

      <button
        class="btn btn-ghost"
        style="margin-top: 0.8rem"
        :disabled="loading"
        @click="handleGoogle"
      >
        Continuer avec Google
      </button>

      <div class="login-footer">Made by VicMtn</div>
    </div>
  </div>
</template>
