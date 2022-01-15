<script setup lang="ts">
import { useUserStore } from "@/store/useUserStore";
import IconLogo from "./IconLogo.vue";
import SignIn from "./SignIn.vue";
import UserAvatar from "./UserAvatar.vue";

const userStore = useUserStore();
</script>

<template>
  <nav class="nav">
    <icon-logo aria-label="Dev24 Logo" role="img" class="home__icon" />
    <transition name="fade" mode="out-in">
      <user-avatar v-if="userStore.isSignedIn" />
      <sign-in v-else />
    </transition>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: inset 0 0 4px #333;
  padding: 0.5rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
