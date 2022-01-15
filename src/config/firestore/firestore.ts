import { collection, getDocs, getFirestore } from "firebase/firestore";

export const db = getFirestore();
const querySnapshot = await getDocs(collection(db, "users"));
console.log({ querySnapshot });
