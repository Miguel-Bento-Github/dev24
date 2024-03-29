<script setup lang="ts">
import IconLogo from "@/components/icons/IconLogo.vue";
import IconMenu from "@/components/icons/IconMenu.vue";
import router from "@/router";
import { computed, onUnmounted, ref, watch, watchEffect } from "vue";

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
    <IconLogo />
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
        <RouterLink class="router-link" to="/">Home</RouterLink>
        <RouterLink class="router-link" to="/work">Work</RouterLink>
        <RouterLink class="router-link" to="/privacy-policy">
          Privacy Policy
        </RouterLink>
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

.router-link {
  position: relative;
  display: inline-block;
  padding: 1rem;
  overflow: hidden;

  @media screen and (max-width: 800px) {
    color: var(--blue);
  }

  &:first-child::before {
    transform: translateX(200%);
  }

  &::before {
    @include pseudo;
    top: 90%;
    left: 0.5rem;
    width: calc(100% - 1rem);
    height: 3px;
    background: currentColor;
    border-radius: 0% 100% 10% 10% / 100% 100% 10% 10%;
    transform: translateX(-200%);
    transition: transform 0.15s ease-in-out;
  }
}

.router-link-exact-active {
  position: relative;
  color: var(--color-text);

  @media screen and (max-width: 800px) {
    color: var(--white);
  }

  &:first-child::before {
    transform: translateX(0%);
  }

  &::before {
    transform: translateX(0%);
    border-radius: 20% 70% 40% 20% / 100% 90% 20% 10%;
  }
}

.router-link-exact-active:hover {
  background-color: transparent;
}
</style>
