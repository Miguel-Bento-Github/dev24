<script setup lang="ts">
import SignIn from "@/components/medium/SignIn.vue";
import { useEntrance } from "@/animation/useEntranceAnimation";
import { useUserStore } from "@/stores/user";
import content from "@/locales/en.json";
import IconHand from "@/components/icons/IconHand.vue";
import CSSDoodle from "@/components/small/CSSDoodle.vue";
import ContactButton from "@/components/small/ContactButton.vue";
import HomeSection from "@/components/medium/HomeSection.vue";

import DevicesWrapper from "@/components/medium/DevicesWrapper.vue";
import { useMonkeyAnimation } from "@/animation/useMonkeyAnimation";

useEntrance();
useMonkeyAnimation();
const user = useUserStore();
const year = new Date().getFullYear();
</script>

<template>
  <article class="content">
    <section itemscope itemtype="https://schema.org/Service" class="hero">
      <meta itemprop="serviceType" content="Website development" />
      <header>
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
    <div class="slide-sections">
      <HomeSection
        v-for="{ header, link, caption } in content.sections"
        :header="header"
        :link="link"
        :caption="caption"
        :key="caption"
      />
    </div>
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
    <footer class="footer">
      Created by Dev24 with love
      <span class="footer-emoji">🧡</span>
      {{ year }}
    </footer>
  </article>

  <SignIn />
</template>

<style lang="scss" scoped>
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

<style lang="scss" scoped>
.footer {
  font-size: 1rem;
  margin-top: 10rem;
  padding: 1rem;
  border-radius: 1rem;
  background: rgb(#000, 20%);
}

.footer-emoji {
  font-size: 1rem;
  margin-right: 4px;
}
</style>
