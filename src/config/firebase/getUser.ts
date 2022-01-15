import { firebaseAuth } from "@/config/firebase/firebaseConfig";
import { User } from "firebase/auth";

export const getUserState = (): Promise<User> => {
  return new Promise((resolve, reject) => {
    firebaseAuth.onAuthStateChanged((fireUser) => {
      if (fireUser) {
        resolve(fireUser);
      } else {
        reject("no user");
      }
    });
  });
};
