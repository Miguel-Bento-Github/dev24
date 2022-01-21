<script setup lang="ts">
import { useRegisterSW } from "virtual:pwa-register/vue";
import { reactive } from "vue";
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import { useUserStore } from "./stores/user";

const everyHour = 60 * 60 * 1000;
const user = useUserStore();
user.setUser();

useRegisterSW({
  onRegistered(registration) {
    registration &&
      setInterval(() => {
        registration.update();
      }, everyHour);
  },
});

const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

let pos = reactive({ x: 0, y: 0 });

const theme = {
  dark: "#0c001a,#1b0d22,#291429,#381a2f,#472134,#562838,#65303a,#72393c,#7f443d,#89503d,#925c3e,#996a3f",
  light:
    "#a8b2e6,#afb2e6,#c0b3e4,#d5b6e0,#e9bbd9,#f8c4d1,#ffcfcd,#ffdbce,#ffe7d3,#fef0db,#fdf6e1,#fdf8e4",
};

const conic = (colors: string, x: number, y: number) =>
  `conic-gradient(from 90deg at ${x}% ${y}%,${colors})`;

const interval = setInterval(() => {
  if (pos.x > 100) clearInterval(interval);
  document.documentElement.style.setProperty(
    "--color-background",
    conic(isDark ? theme.dark : theme.light, pos.x++, pos.y)
  );
}, 30);
</script>

<template>
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
</style>
