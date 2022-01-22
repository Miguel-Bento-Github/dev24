<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import { useUserStore } from "./stores/user";
import ReloadPrompt from "./components/ReloadPrompt.vue";

const user = useUserStore();
user.setUser();
</script>

<template>
  <div role="img" class="background"></div>
  <NavBar />
  <RouterView />
  <ReloadPrompt />
</template>

<style lang="scss">
@import "@/assets/base.css";
@import "@/scss/keyframes.scss";

#app {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  font-weight: normal;
  padding: 1rem;

  @media screen and (min-width: 800px) {
    padding: 2rem;
  }
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
