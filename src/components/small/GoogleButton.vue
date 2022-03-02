<script setup lang="ts">
import { firebaseProvider } from "@/firebase/firebaseProvider";
import { firebaseService } from "@/firebase/firebaseService";

const login = <K extends keyof typeof firebaseProvider>(providerKey: K) => {
  firebaseService.login(firebaseProvider[providerKey], providerKey);
};
</script>

<template>
  <button @click="login('google')" type="button" class="google-button">
    <span class="google-logo"></span>
    <div class="google-text">Sign in with Google</div>
  </button>
</template>

<style lang="scss" scoped>
.google-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  color: #fff;
  background: #4285f4;
  cursor: pointer;
  box-shadow: 1px 1px 4px #999;
}

.google-logo {
  height: 40px;
  width: 40px;
  background: url("/g-cta/normal.svg") no-repeat;
  background-size: contain;

  &:active {
    background: url("/g-cta/pressed.svg") no-repeat;
    background-size: contain;
  }

  &:focus {
    background: url("/g-cta/focus.svg") no-repeat;
    background-size: contain;
  }

  &:disabled {
    background: url("/g-cta/disabled.svg") no-repeat;
    background-size: contain;
  }
}

.google-text {
  padding-left: 8px;
  padding-right: 8px;
}
</style>
