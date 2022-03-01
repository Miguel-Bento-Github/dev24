<script setup lang="ts">
import SignIn from "@/components/medium/SignIn.vue";
import { useEntrance } from "@/animation/useEntranceAnimation";
import { useUserStore } from "@/stores/user";
import content from "@/locales/en.json";
import IconHand from "@/components/icons/IconHand.vue";
import CSSDoodle from "@/components/small/CSSDoodle.vue";
import ContactButton from "@/components/small/ContactButton.vue";

import DevicesWrapper from "@/components/medium/DevicesWrapper.vue";

useEntrance();

const user = useUserStore();
</script>

<template>
  <article ref="elementRef" class="content">
    <section itemscope itemtype="https://schema.org/Service" class="hero">
      <meta itemprop="serviceType" content="Website development" />
      <header class="app-header">
        <h1 class="h2 headline">
          {{ content.welcome }}
          <Transition name="fade" mode="out-in">
            <span v-if="user.name">{{ user.name }}</span>
            <IconHand v-else />
          </Transition>
        </h1>
        <p class="description">
          {{ content.hero }}
        </p>
        <ContactButton />
      </header>
      <div class="doodle-wrapper">
        <CSSDoodle />
      </div>
    </section>
    <section>
      <h3 class="hidden">Browser support</h3>
    </section>
    <DevicesWrapper>
      <template #support>
        {{ content.browserSupport }}
      </template>
      <template #content>
        {{ content.devices }}
      </template>
    </DevicesWrapper>
  </article>

  <SignIn />
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

.hero {
  display: grid;
  margin-bottom: 1rem;

  @media screen and (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
    margin-top: 15rem;
    margin-bottom: 15rem;
  }

  .doodle-wrapper {
    display: flex;
    justify-content: center;
  }
}
</style>
