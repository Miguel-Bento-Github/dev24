<script setup lang="ts">
import GoogleButton from "@/components/small/GoogleButton.vue";
import UserAvatar from "@/components/small/UserAvatar.vue";
import { useUserStore } from "@/stores/user";
import { ref, watchEffect } from "vue";
import IconCross from "@/components/icons/IconCross.vue";

const user = useUserStore();

const signInDisabled = ref(sessionStorage["sign-in-disabled"]);

watchEffect(() => {
  if (signInDisabled.value) {
    sessionStorage["sign-in-disabled"] = signInDisabled.value;
  }
});
</script>

<template>
  <div class="sign-in">
    <TransitionGroup name="fade" mode="out-in">
      <GoogleButton key="button" v-if="!signInDisabled && !user.isSignedIn" />
      <UserAvatar key="avatar" v-if="user.isSignedIn" />
    </TransitionGroup>
  </div>
  <transition name="fade">
    <button
      key="cross"
      aria-label="close sign in button"
      type="button"
      class="close"
      :class="{ closed: !!signInDisabled }"
      v-if="!user.isSignedIn"
      @click="signInDisabled = !signInDisabled"
    >
      <IconCross :rotate="!!signInDisabled" />
    </button>
  </transition>
</template>

<style lang="scss" scoped>
.sign-in {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}

.close {
  position: fixed;
  bottom: 4rem;
  right: 1rem;
  margin-bottom: 4px;
  cursor: pointer;
  transition: bottom 0.15s ease-in-out;

  &:hover {
    filter: drop-shadow(0 0 1px #e0e0e0);
  }
}

.closed {
  bottom: 1rem;
  transition-delay: 0.3s;
}
</style>
