import { ref as dbRef, get } from "firebase/database";
import { db } from "./firebase";

export async function isRegistrationOpen() {
  const snapshot = await get(dbRef(db, "registrations_open"));
  return snapshot.val() === true;
}
