<script setup lang="ts">
import IconLogo from "@/components/icons/IconLogo.vue";
import IconMenu from "@/components/icons/IconMenu.vue";
import { analytics } from "@/firebase/firebaseConfig";
import { logEvent } from "firebase/analytics";
import { onUnmounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const CAL_URL = "https://cal.com/dev24";

const openBooking = () => {
  if (analytics) {
    logEvent(analytics, "schedule_click", { location: "navbar" });
  }
  window.open(CAL_URL, "_blank", "noopener");
};

const router = useRouter();

// Only small screens have a menu to open. Which layout applies is left to the
// stylesheet, so the prerendered markup is right at every width before any
// script runs.
const isMenuOpen = ref(false);
const navigation = ref<HTMLElement | null>(null);
const toggle = ref<HTMLElement | null>(null);

const closeMenu = () => {
  isMenuOpen.value = false;
};

const stopClosingOnNavigation = router.beforeEach(closeMenu);

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
  stopClosingOnNavigation();
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
      :aria-expanded="isMenuOpen"
      @click="isMenuOpen = !isMenuOpen"
    >
      <IconMenu :is-open="isMenuOpen" />
    </button>

    <nav
      aria-label="Page links"
      class="nav"
      :class="{ 'nav--open': isMenuOpen }"
    >
      <RouterLink class="router-link" to="/#client-work">Work</RouterLink>
      <button class="router-link book-link" @click="openBooking">Book</button>
    </nav>
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
  display: none;

  @media screen and (max-width: 800px) {
    display: block;
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
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    background: rgb(#000, 80%);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 0.75rem;
    padding: 0.5rem;

    /* closed until the toggle opens it. Same timings as the global .fade
       transition, and hiding it keeps the links out of the tab order. */
    visibility: hidden;
    opacity: 0;
    transform: translateX(2rem);
    transition: all 0.1s ease-in-out;

    &--open {
      visibility: visible;
      opacity: 1;
      transform: none;
      transition: all 0.15s ease-out;
    }
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

  @media screen and (max-width: 800px) {
    padding: 0.75rem 1.2rem;
    border-bottom: none;
    text-align: center;
    color: var(--white);
  }

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

  @media screen and (max-width: 800px) {
    padding: 0.75rem 1.2rem;
    border-radius: 0.5rem;
    text-align: center;
  }

  &:hover {
    background: var(--white);
    transform: translateY(-1px);
  }
}
</style>
