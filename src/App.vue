<script setup lang="ts">
import { useRegisterSW } from "virtual:pwa-register/vue";
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import { useUserStore } from "./stores/user";

const user = useUserStore();
user.setUser();

const everyHour = 60 * 60 * 1000;
useRegisterSW({
  onRegistered(registration) {
    registration &&
      setInterval(() => {
        registration.update();
      }, everyHour);
  },
});
</script>

<template>
  <div role="img" class="background"></div>
  <NavBar />
  <RouterView />
</template>

<style>
@import "@/assets/base.css";

#app {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding: 2rem;
  font-weight: normal;
}

.background {
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: var(--color-background);
}
</style>
