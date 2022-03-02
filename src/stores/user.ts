import { getUserState } from "@/firebase/getUser";
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
  actions: {
    async setUser() {
      const { uid, displayName, photoURL } = await getUserState();

      if (!uid && !displayName && !photoURL) return;
      if (uid) this.id = uid;
      if (displayName) this.name = displayName;
      if (photoURL) this.photoURL = photoURL;

      this.isSignedIn = true;
    },
  },
});
