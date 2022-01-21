<script setup lang="ts">
import GoogleButton from "@/components/atom/GoogleButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import { useUserStore } from "@/stores/user";
import { computed, ref, watchEffect } from "vue";
const user = useUserStore();

const signInDisabled = ref(sessionStorage["sign-in-disabled"]);
const isEnabled = computed(() => signInDisabled.value || user.isSignedIn);

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
