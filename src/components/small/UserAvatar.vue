<script setup lang="ts">
import { firebaseService } from "@/firebase/firebaseService";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const user = useUserStore();

const showTooltip = ref(false);

const logout = () => {
  user.$reset();
  firebaseService.logout();
};
</script>

<template>
  <div class="avatar">
    <button
      class="avatar-button"
      type="button"
      @click="showTooltip = !showTooltip"
    >
      <img
        height="64"
        width="64"
        class="avatar-img"
        :src="user.photoURL"
        :alt="`${user.name} profile image`"
      />
    </button>
    <button
      type="button"
      @click="logout()"
      :class="{ 'tooltip--active': showTooltip }"
      class="tooltip"
    >
      Sign out
    </button>
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  width: max-content;
  position: relative;
}

.avatar-button {
  border-radius: 50%;
  height: 64px;
  width: 64px;
  padding: 0;
}

.avatar-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
  filter: drop-shadow(2px 2px 4px #333);
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translate3d(-50%, 2rem, 0) scale(0);
  opacity: 0;
  font-size: 1rem;
  min-width: max-content;
  white-space: nowrap;
  border-radius: 0.5rem;
  padding: 0.5rem;
  box-shadow: inset 0 -2px 4px 1px var(--black), 2px 2px 2px 1px var(--black);
  transition: all 0.15s ease-in-out;

  &:active {
    box-shadow: inset 0 -2px 2px 1px var(--black);
    transform: translate3d(-50%, 1px, 0);
  }

  &--active {
    transform: translate3d(-50%, 0, 0) scale(1);
    opacity: 1;
  }
}
</style>
