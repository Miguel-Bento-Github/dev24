<script setup lang="ts">
import router from "@/router";
import { onMounted, onUnmounted } from "vue";

if (!sessionStorage.isPrivacyOpen && !sessionStorage.wasPrivacyOpen) {
  router.go(0);
}

onMounted(() => {
  sessionStorage.setItem("isPrivacyOpen", "true");
  sessionStorage.setItem("wasPrivacyOpen", "true");
});

onUnmounted(() => {
  sessionStorage.removeItem("isPrivacyOpen");
});

window.onunload = () => sessionStorage.removeItem("wasPrivacyOpen");
</script>

<template>
  <div class="privacy-view">
    <section class="cookies">
      <div id="cookiefirst-policy-page"></div>
      <div>
        This cookie policy has been created and updated by
        <a href="https://cookiefirst.com">CookieFirst.com</a>
        .
      </div>
      <div id="cookiefirst-cookies-table"></div>
      <div>
        This cookie table has been created and updated by the
        <a href="https://cookiefirst.com">
          CookieFirst consent management platform
        </a>
        .
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.privacy-view {
  font-size: 1rem;
  padding: 1rem;
}
.cookies {
  background: var(--white);
  color: var(--black);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: inset 0 -4px 4px 4px #999, inset 0 -8px 8px #777,
    2px 2px 16px 8px var(--black);
}
</style>
