import { ref, onMounted, onUnmounted } from "vue";
import { onAuthChange } from "@/lib/auth";

export function useAuth() {
  const user = ref(null);
  const ready = ref(false);

  let unsubscribe = null;

  onMounted(() => {
    unsubscribe = onAuthChange((firebaseUser) => {
      user.value = firebaseUser;
      ready.value = true;
    });
  });

  onUnmounted(() => {
    unsubscribe?.();
  });

  return { user, ready };
}
