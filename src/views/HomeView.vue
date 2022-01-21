<script setup lang="ts">
import SignIn from "@/components/SignIn.vue";
</script>

<template>
  <h1>Here comes Pumpkin</h1>
  <div class="sign-in">
    <button
      aria-label="close sign in button"
      type="button"
      class="close"
    ></button>
    <SignIn />
  </div>
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
  position: relative;
  cursor: pointer;
  width: 24px;
  height: 24px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 8px;
    height: 100%;
    width: 2px;
    background: #e27171;
    transform-origin: center;
    transform: rotate(45deg);
    filter: drop-shadow(0 0 1px #ccc);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 8px;
    height: 100%;
    width: 2px;
    background: #ff0000;
    transform-origin: center;
    transform: rotate(-45deg);
    filter: drop-shadow(0 0 1px #ccc);
  }

  &:hover {
    transition: filter 0.15s cubic-bezier(1, 0.2, 0.49, 1.88);
    filter: drop-shadow(0 0 1px #ccc);
  }
}
</style>
