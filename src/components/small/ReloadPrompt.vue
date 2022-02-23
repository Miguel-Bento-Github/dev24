<script setup lang="ts">
import { useRegisterSW } from "virtual:pwa-register/vue";

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

const close = async () => {
  offlineReady.value = false;
  needRefresh.value = false;
};
</script>

<template>
  <div v-if="offlineReady || needRefresh" class="pwa-toast" role="alert">
    <div class="pwa-message">
      <span v-if="offlineReady">App ready to work offline</span>
      <span v-else>
        New content available, click on the reload button to update.
      </span>
    </div>
    <button v-if="needRefresh" @click="updateServiceWorker()">Reload</button>
    <button @click="close">Close</button>
  </div>
</template>

<style lang="scss" scoped>
.pwa-toast {
  position: fixed;
  width: 30vw;
  z-index: 10;
  right: 0;
  bottom: 0;
  margin: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: inset 0 -4px 6px 4px var(--black);
  background: rgb(#000, 25%);
  color: var(--white);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(3px);
}

.pwa-message {
  font-size: 1rem;
  text-align: start;
  margin-bottom: 8px;
}

button {
  border: 1px solid var(--color-text);
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
  cursor: pointer;
}
</style>
