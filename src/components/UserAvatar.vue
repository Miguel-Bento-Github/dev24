<script setup lang="ts">
import { useUserStore } from "@/store/useUserStore";

const userStore = useUserStore();
</script>

<template>
  <article class="avatar">
    <img
      height="64"
      width="64"
      class="avatar-img"
      :src="userStore.photoURL"
      :alt="`${userStore.name} profile image`"
    />
  </article>
</template>

<style lang="scss" scoped>
.avatar {
  width: max-content;
}

.avatar-img {
  border-radius: 50%;
  filter: drop-shadow(2px 2px 4px #333);
}
</style>
