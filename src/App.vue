<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { RouterView } from "vue-router";
import NavBar from "./components/medium/NavBar.vue";
import ReloadPrompt from "./components/small/ReloadPrompt.vue";
import { useUserStore } from "./stores/user";

const shouldReload =
  typeof window !== "undefined"
    ? defineAsyncComponent(() => import("@/components/small/ReloadPrompt.vue"))
    : null;

const user = useUserStore();

if (window?.CookieFirst?.consent.functional) {
  user.setUser();
}

const year = new Date().getFullYear();
</script>

<template>
  <div role="img" class="background"></div>
  <NavBar />

  <div class="main-view">
    <RouterView />
  </div>
  <footer class="footer">
    Created by Dev24 with love
    <span class="footer-emoji">🧡</span>
    {{ year }}
  </footer>
  <ReloadPrompt v-if="shouldReload" />
</template>

<style lang="scss">
@import "@/assets/base.css";
@import "@/scss/boot.scss";

#app {
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  font-weight: normal;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>

<style lang="scss" scoped>
.background {
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: var(--color-background);
}

.main-view {
  margin-top: 5rem;
}

.footer {
  font-size: 1rem;
  margin-top: 10rem;
  margin: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background: rgb(#000, 20%);
}

.footer-emoji {
  font-size: 1rem;
  margin-right: 4px;
}
</style>
