<script setup lang="ts">
import SignIn from "@/components/molecule/SignIn.vue";
</script>

<template>
  <h1>Here comes Pumpkin</h1>
  <transition name="fade">
    <SignIn />
  </transition>
</template>

<style lang="scss" scoped>
.sign-in {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}

.close {
  display: flex;
  margin-left: auto;
  margin-bottom: 4px;
  position: relative;
  cursor: pointer;
  width: 24px;
  height: 24px;
  transform: rotateZ(45deg);
  transition: all 0.15s ease-in-out;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    width: 2px;
    background: #e27171;
    filter: drop-shadow(0 0 1px #ccc);
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 2px;
    width: 24px;
    background: #ff0000;
    filter: drop-shadow(0 0 1px #ccc);
  }

  &:hover {
    transition: filter 0.25s cubic-bezier(1, 0.2, 0.49, 1.88);
    filter: drop-shadow(0 0 1px #e0e0e0);
  }
}
</style>
