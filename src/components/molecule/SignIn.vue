<script setup lang="ts">
import GoogleButton from "@/components/atom/GoogleButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import { useUserStore } from "@/stores/user";
import { computed, ref, watchEffect } from "vue";
const user = useUserStore();

const signInDisabled = ref(sessionStorage["sign-in-disabled"]);
const isEnabled = computed(() => !signInDisabled.value || user.isSignedIn);

watchEffect(() => {
  if (signInDisabled.value) {
    sessionStorage["sign-in-disabled"] = signInDisabled.value;
  }
});
</script>

<template>
  <div class="sign-in" v-if="isEnabled">
    <button
      aria-label="close sign in button"
      type="button"
      class="close"
      @click="signInDisabled = true"
      v-if="!user.isSignedIn"
    ></button>
    <transition name="fade" mode="out-in">
      <GoogleButton v-if="!user.isSignedIn" />
      <UserAvatar v-else />
    </transition>
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
