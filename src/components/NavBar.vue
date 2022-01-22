<script setup lang="ts">
import IconLogo from "@/components/atom/icons/IconLogo.vue";
import router from "@/router";
import { computed, ref, watchEffect } from "vue";
import IconMenu from "./atom/icons/IconMenu.vue";

const isSmallScreen = computed(
  () => window.matchMedia("(max-width: 800px)").matches
);

const isMenuOpen = ref(!isSmallScreen.value);

if (isSmallScreen.value) {
  watchEffect(() => {
    router.beforeEach(() => {
      isMenuOpen.value = false;
    });
  });
}

const closeMenu = () => {
  if (isSmallScreen.value) isMenuOpen.value = false;
};
</script>

<template>
  <header @focusout="closeMenu" class="wrapper">
    <IconLogo />
    <button
      type="button"
      v-if="isSmallScreen"
      @click="isMenuOpen = !isMenuOpen"
    >
      <IconMenu :is-open="isMenuOpen" />
    </button>

    <transition name="fade">
      <nav class="nav" v-if="isMenuOpen">
        <RouterLink class="router-link" to="/">Home</RouterLink>
        <RouterLink class="router-link" to="/about">About</RouterLink>
        <RouterLink class="router-link" to="/privacy-policy">
          Privacy Policy
        </RouterLink>
      </nav>
    </transition>
  </header>
</template>

<style lang="scss" scoped>
@use "@/scss/boot.scss" as *;

.wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.nav {
  @media screen and (max-width: 800px) {
    position: fixed;
    top: 5rem;
    right: 2rem;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    background: rgb(#000, 70%);
    backdrop-filter: blur(3px);
    border-radius: 1rem;
  }
}

.router-link {
  position: relative;
  display: inline-block;
  padding: 1rem;
  overflow: hidden;

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

@keyframes slide {
  from {
    transform: translateX(-200%);
  }
}
</style>
