import { defineStore } from "pinia";

export const usePWAStore = defineStore("user", {
  state: () => {
    return {
      needsRefresh: false,
      isOfflineReady: false,
    };
  },
  actions: {
    async setRefresh(payload: boolean) {
      this.needsRefresh = payload;
    },
    async setOffline(payload: boolean) {
      this.isOfflineReady = payload;
    },
  },
});
