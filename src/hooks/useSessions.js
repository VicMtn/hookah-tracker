import { ref, onMounted, onUnmounted } from "vue";
import { ref as dbRef, onValue, push, remove } from "firebase/database";
import { db } from "@/lib/firebase";

export function useSessions() {
  const sessions = ref([]);
  const loading = ref(true);

  const sessionsRef = dbRef(db, "sessions");
  let unsubscribe = null;

  onMounted(() => {
    unsubscribe = onValue(sessionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        sessions.value = Object.entries(data)
          .map(([key, val]) => ({ ...val, _key: key }))
          .sort((a, b) => new Date(b.date) - new Date(a.date));
      } else {
        sessions.value = [];
      }
      loading.value = false;
    });
  });

  onUnmounted(() => {
    unsubscribe?.();
  });

  async function addSession({ name, amount, note }) {
    return push(sessionsRef, {
      id: Date.now(),
      name,
      amount: amount || null,
      note: note || "",
      date: new Date().toISOString(),
    });
  }

  async function deleteSession(id) {
    const target = sessions.value.find((s) => s.id === id);
    if (!target?._key) return;
    return remove(dbRef(db, `sessions/${target._key}`));
  }

  return { sessions, loading, addSession, deleteSession };
}
