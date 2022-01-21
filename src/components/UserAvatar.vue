<script setup lang="ts">
import { firebaseService } from "@/config/firebase/firebaseService";
import { useUserStore } from "@/stores/user";

const user = useUserStore();

const logout = firebaseService.logout;
</script>

<template>
  <article class="avatar">
    <img
      height="64"
      width="64"
      class="avatar-img"
      :src="user.photoURL"
      :alt="`${user.name} profile image`"
      @click="logout"
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
