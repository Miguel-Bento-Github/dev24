<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/medium/NavBar.vue";
import { useUserStore } from "./stores/user";

const user = useUserStore();

if (!import.meta.env.SSR && window.CookieFirst?.consent.functional) {
  user.setUser();
}

const year = new Date().getFullYear();</script>

<template>
  <div role="img" aria-hidden="true" class="background"></div>
  <NavBar />

  <main title="main" class="main-view">
    <RouterView />
  </main>
  <footer aria-label="footer" class="footer">
    <span>Created by Dev24 with love <span class="footer-emoji">🧡</span> {{ year }}</span>
    <RouterLink class="footer-link" to="/privacy-policy">Privacy Policy</RouterLink>
  </footer>
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
  padding-bottom: 5rem;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.footer-link {
  opacity: 0.6;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 1;
  }
}

.footer-emoji {
  font-size: 1rem;
  margin-right: 4px;
}
</style>
