import { getUserState } from "@/config/firebase/getUser";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      id: "",
      name: "",
      photoURL: "",
      isSignedIn: false,
    };
  },
  getters: {
    getUser() {
      getUserState().then(({ uid, displayName, photoURL }) => {
        if (!uid && !displayName && !photoURL) return;
        if (uid) this.id = uid;
        if (displayName) this.name = displayName;
        if (photoURL) this.photoURL = photoURL;

        this.isSignedIn = true;
      });
    },
  },
});
