<script setup lang="ts">
import IconLogo from "@/components/atom/icons/IconLogo.vue";
</script>

<template>
  <header class="wrapper">
    <IconLogo />
    <nav class="nav">
      <RouterLink class="router-link" to="/">Home</RouterLink>
      <RouterLink class="router-link" to="/about">About</RouterLink>
      <RouterLink class="router-link" to="/privacy-policy">
        Privacy Policy
      </RouterLink>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@use "@/scss/boot.scss" as *;

.wrapper {
  opacity: 0;
  display: flex;
  justify-content: space-between;
  padding-right: 5vw;
  margin-bottom: 2rem;

  @media screen and (min-width: 800px) {
    opacity: 1;
  }
}

.router-link {
  position: relative;
  display: inline-block;
  padding: 0.5rem 1rem;
  font-weight: 600;
  font-size: 1rem;
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
