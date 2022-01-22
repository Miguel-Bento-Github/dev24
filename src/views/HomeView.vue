<script setup lang="ts">
import SignIn from "@/components/molecule/SignIn.vue";
import { useEntrance } from "@/hooks/useEntrance";
import { useUserStore } from "@/stores/user";
useEntrance();
const user = useUserStore();
</script>

<template>
  <p class="intro">
    Hi{{ user.name && ` ${user.name}` }}, Bento here, a web developer.
    <br />
    Through Dev24, I offer my web development skills to create beautiful and
    user-friendly websites for you.
  </p>
  <p>
    From your Smartphone to your 8k OLED Screen. Anything is possible with state
    of the art animations we provide.
  </p>
  <p>
    We build for Chrome, Firefox, Safari, Edge, and virtually any modern browser
  </p>

  <transition name="fade">
    <SignIn />
  </transition>
</template>

<style lang="scss" scoped></style>
