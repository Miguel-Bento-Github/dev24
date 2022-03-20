<script setup lang="ts">
import { useEntrance } from "@/animation/useEntranceAnimation";
import SignIn from "@/components/medium/SignIn.vue";
import ContactButton from "@/components/small/ContactButton.vue";
import CSSDoodle from "@/components/small/CSSDoodle.vue";
import { useScreenQuery } from "@/hooks/useScreenQuery";
import content from "@/locales/en.json";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";
import IconWelcome from "@/components/icons/IconWelcome.vue";

useEntrance();
const { isMatch } = useScreenQuery("(min-width: 550px)");
const hasConsent = computed(() => window?.CookieFirst?.consent.functional);
const user = useUserStore();
</script>

<template>
  <article aria-label="Hero" ref="elementRef" class="content">
    <section
      aria-labelledby="headline"
      itemscope
      itemtype="https://schema.org/Service"
      class="hero"
    >
      <meta itemprop="serviceType" content="Website development" />
      <header class="app-header">
        <h1 id="headline" class="h2 headline">
          <IconWelcome :aria-label="content.welcome" />
          <Transition name="fade" mode="out-in">
            <span v-if="user.name">{{ user.name }}</span>
          </Transition>
        </h1>
        <p class="description">
          {{ content.hero }}
        </p>
        <ContactButton />
      </header>
      <div v-if="isMatch" aria-hidden="true" class="doodle-wrapper">
        <CSSDoodle />
      </div>
    </section>
  </article>

  <SignIn v-if="hasConsent" />
</template>

<style lang="scss" scoped>
.content {
  padding: 1rem;

  @media screen and (min-width: 800px) {
    padding: 2rem;
  }
}
.app-header {
  margin-bottom: 4rem;
}

.headline {
  display: flex;
  align-items: center;
  margin-bottom: 5rem;
}

.hero {
  display: grid;
  margin-bottom: 1rem;

  @media screen and (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
    margin-top: 5rem;
    margin-bottom: 5rem;
  }

  .doodle-wrapper {
    display: flex;
    justify-content: center;
  }
}
</style>
