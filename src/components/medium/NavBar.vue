<script setup lang="ts">
import IconLogo from "@/components/icons/IconLogo.vue";
import IconMenu from "@/components/icons/IconMenu.vue";
import router from "@/router";
import { analytics } from "@/firebase/firebaseConfig";
import { logEvent } from "firebase/analytics";
import { computed, onUnmounted, ref, watch, watchEffect } from "vue";

const CAL_URL = "https://cal.com/dev24";

const openBooking = () => {
  if (analytics) {
    logEvent(analytics, "schedule_click", { location: "navbar" });
  }
  window.open(CAL_URL, "_blank", "noopener");
};

const isSmallScreen = computed(
  () => window.matchMedia("(max-width: 800px)").matches
);

const isMenuOpen = ref(!isSmallScreen.value);
const navigation = ref<HTMLElement | null>(null);
const toggle = ref<HTMLElement | null>(null);

const closeMenu = () => {
  if (isSmallScreen.value) isMenuOpen.value = false;
};

if (isSmallScreen.value) {
  watchEffect(() => {
    router.beforeEach(() => {
      closeMenu();
    });
  });
}

const checkForEscape = ({ code }: KeyboardEvent) => {
  if (code === "Escape") closeMenu();
};

const checkForClickOutside = (e: MouseEvent) => {
  if (!navigation.value || !e.target) return;
  if (!navigation.value.contains(e.target as Node)) {
    closeMenu();
  }
};

watch(isMenuOpen, (newValue) => {
  if (newValue) {
    window.addEventListener("click", checkForClickOutside);
    window.addEventListener("keyup", checkForEscape);
  } else {
    window.removeEventListener("click", checkForClickOutside);
    window.removeEventListener("keyup", checkForEscape);
  }
});

onUnmounted(() => {
  window.removeEventListener("keyup", checkForEscape);
  window.removeEventListener("click", checkForClickOutside);
});
</script>

<template>
  <header ref="navigation" title="navigation header" class="wrapper">
    <RouterLink to="/" class="logo-link" aria-label="Go to homepage">
      <IconLogo />
    </RouterLink>
    <button
      aria-label="toggle navigation menu"
      ref="toggle"
      class="dots"
      type="button"
      v-if="isSmallScreen"
      @click="isMenuOpen = !isMenuOpen"
    >
      <IconMenu :is-open="isMenuOpen" />
    </button>

    <transition name="fade">
      <nav aria-label="Page links" class="nav" v-if="isMenuOpen">
        <RouterLink class="router-link" to="/#client-work">Work</RouterLink>
        <button class="router-link book-link" @click="openBooking">Book</button>
      </nav>
    </transition>
  </header>
</template>

<style lang="scss" scoped>
@use "@/scss/pseudo.scss" as *;

.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  padding: 1rem 2rem;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  isolation: isolate;
  z-index: 10;
  background: linear-gradient(to bottom, rgb(#000, 80%), rgb(#000, 50%));

  @supports (backdrop-filter: blur(3px)) {
    background: linear-gradient(to bottom, rgb(#000, 10%), transparent);
    backdrop-filter: blur(3px);
  }

  @supports (-webkit-backdrop-filter: blur(3px)) {
    background: linear-gradient(to bottom, rgb(#000, 10%), transparent);
    -webkit-backdrop-filter: blur(3px);
  }
}

.dots {
  @media screen and (max-width: 800px) {
    position: fixed;
    z-index: 10;
    top: 1rem;
    right: 1rem;
  }
}

.nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media screen and (max-width: 800px) {
    position: fixed;
    z-index: 10;
    top: 5rem;
    right: 2rem;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    background: rgb(#000, 70%);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    border-radius: 1rem;
  }
}

.logo-link {
  display: flex;
  align-items: center;
}

.router-link {
  padding: 0.6rem 0;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-text);
  border-bottom: 1px solid currentColor;
  transition: all 0.2s ease;
  cursor: pointer;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;

  &:hover {
    color: var(--blue);
    border-bottom-color: currentColor;
  }
}

.book-link {
  background: var(--blue);
  color: var(--black);
  border: none;
  border-radius: 2px;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0.6rem 1.4rem;
  transition: all 0.2s ease;

  &:hover {
    background: var(--white);
    transform: translateY(-1px);
  }
}
</style>
