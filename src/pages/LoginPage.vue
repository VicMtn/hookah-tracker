<script setup>
import { ref } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { signIn, signInWithGoogle, getAuthErrorMessage } from "@/lib/auth";
import { isRegistrationOpen } from "@/lib/registrations";

const mode = ref("login");
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

async function goToRegister() {
  loading.value = true;
  const open = await isRegistrationOpen();
  loading.value = false;
  mode.value = open ? "register" : "closed";
}

async function handleRegister() {
  if (!email.value || !password.value) {
    errorMsg.value = "Remplis tous les champs.";
    return;
  }
  loading.value = true;
  errorMsg.value = "";
  try {
    const open = await isRegistrationOpen();
    if (!open) {
      mode.value = "closed";
      return;
    }
    await createUserWithEmailAndPassword(auth, email.value.trim(), password.value);
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

      <!-- FORMULAIRE LOGIN -->
      <template v-if="mode === 'login'">
        <div class="login-field">
          <label>Email</label>
          <input
            ref="emailRef"
            v-model="email"
            class="login-input"
            type="email"
            placeholder="ton@email.com"
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
        <button class="btn btn-ghost" style="margin-top: 0.5rem" @click="goToRegister">
          Créer un compte
        </button>
      </template>

      <!-- FORMULAIRE INSCRIPTION -->
      <template v-else-if="mode === 'register'">
        <div class="login-field">
          <label>Email</label>
          <input v-model="email" class="login-input" type="email" placeholder="ton@email.com" />
        </div>
        <div class="login-field">
          <label>Mot de passe</label>
          <input v-model="password" class="login-input" type="password" />
        </div>
        <div class="login-error">{{ errorMsg }}</div>
        <button class="login-btn" :disabled="loading" @click="handleRegister">
          {{ loading ? "Création..." : "Créer mon compte" }}
        </button>
        <button class="btn btn-ghost" style="margin-top: 0.5rem" @click="mode = 'login'">
          ← Retour
        </button>
      </template>

      <!-- INSCRIPTIONS FERMÉES -->
      <template v-else-if="mode === 'closed'">
        <p style="color: var(--text-dim); font-size: 0.8rem; margin-bottom: 1.5rem">
          Les inscriptions sont actuellement fermées.
        </p>
        <button class="btn btn-ghost" @click="mode = 'login'">← Retour</button>
      </template>

      <div class="login-footer">Made by VicMtn</div>
    </div>
  </div>
</template>
