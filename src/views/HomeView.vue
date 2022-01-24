<script setup lang="ts">
import SignIn from "@/components/molecule/SignIn.vue";
import { useEntrance } from "@/hooks/useEntrance";
import { useUserStore } from "@/stores/user";
import content from "@/locales/en.json";
import IconHand from "@/components/atom/icons/IconHand.vue";
import IconPhone from "@/components/atom/icons/IconPhone.vue";
import IconTablet from "@/components/atom/icons/IconTablet.vue";
import IconMonitor from "@/components/atom/icons/IconMonitor.vue";

useEntrance();
const user = useUserStore();
const year = new Date().getFullYear();
</script>

<template>
  <article class="content">
    <h2 class="headline">
      Hi
      <Transition name="fade" mode="out-in">
        <span v-if="user.name">{{ user.name }}</span>
        <IconHand v-else />
      </Transition>
    </h2>
    <p class="intro">
      {{ content.intro }}
    </p>
    <section
      v-for="{ header, link, caption } in content.sections"
      :key="caption"
      class="monkey"
    >
      <h3 class="monkey-header">{{ header }}</h3>
      <div class="monkey-wrapper">
        <div class="monkey-iframe-container">
          <iframe frameborder="0" :src="link"></iframe>
        </div>
      </div>
      <a class="monkey-link" target="_blank" :href="link">{{ caption }}</a>
    </section>
    <section>
      <h3 class="hidden">Browser support</h3>
      <p>
        {{ content.browserSupport }}
      </p>
    </section>
    <section>
      <h3 class="hidden">Devices</h3>
      <div class="devices">
        <IconPhone />
        <IconTablet />
        <IconMonitor />
      </div>
      <p>
        {{ content.devices }}
      </p>
    </section>
    <footer class="footer">
      Created by Dev24 with love
      <span class="footer-emoji">🧡</span>
      {{ year }}
    </footer>
  </article>

  <Transition name="fade">
    <SignIn />
  </Transition>
</template>

<style lang="scss" scoped>
.monkey {
  margin-top: 15vh;
  margin-bottom: 15vh;
  text-align: center;

  @media screen and (min-width: 800px) {
    text-align: start;
    display: grid;
    align-items: flex-start;
    justify-items: flex-start;
    grid-template-areas:
      "frame description"
      "link .";
    grid-template-columns: minmax(auto, 60%) minmax(auto, 40%);
    gap: 0 32px;

    &:nth-child(even) {
      grid-template-areas:
        "description frame"
        ". link";
      grid-template-columns: minmax(auto, 40%) minmax(auto, 60%);
      justify-items: flex-end;
    }
  }
}

.monkey-wrapper {
  overflow: hidden;
  border-radius: 32px;
  margin: auto auto 2rem;
  max-width: max-content;
  max-height: max-content;
  padding: 0.5rem;
  box-shadow: inset 0 -2px 4px 1px var(--black), 2px 2px 2px 1px var(--black);

  @media screen and (min-width: 800px) {
    margin: auto 0 2rem;
  }
}

.monkey-header {
  grid-area: description;
}

.monkey-wrapper {
  grid-area: frame;
}

.monkey-link {
  width: max-content;
  grid-area: link;
}

.monkey-iframe-container {
  position: relative;
  height: max-content;
  width: max-content;
  overflow: hidden;
  height: 70vh;
  aspect-ratio: 10 / 16;

  @media screen and (min-width: 450px) {
    height: 40vh;
    aspect-ratio: 4 / 3;
  }

  @media screen and (min-width: 1000px) {
    aspect-ratio: 16 / 9;
  }
}

.monkey iframe {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 24px;
  transition: all 0.15s ease-in-out;
}

.devices {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 5rem;
  margin-bottom: 5rem;

  & > svg {
    animation: move 8s ease-in-out infinite alternate;

    @for $i from 1 through 3 {
      &:nth-child(#{$i}) {
        animation-delay: $i * 1s;
      }
    }
  }
}

.footer {
  font-size: 1rem;
  margin-top: 10rem;
  padding: 1rem;
  border-radius: 1rem;
  background: rgba(#000, 0.2);
}

.footer-emoji {
  font-size: 1rem;
  margin-right: 4px;
}

@keyframes move {
  10% {
    stroke: #59f0be;
    filter: drop-shadow(0 0 1px #59f0be);
    stroke-dashoffset: 40;
  }
  23% {
    stroke: #92cf21;
    filter: drop-shadow(0 0 4px #59f0be);
  }
  32% {
    stroke: #d67bd2;
    filter: drop-shadow(0 0 4px #d67bd2);
  }
  46% {
    stroke: #ca851e;
    filter: drop-shadow(0 0 4px #ca851e);
  }
  50% {
    stroke: #2c8511;
    filter: drop-shadow(0 0 4px #2c8511);
    stroke-dashoffset: 50;
  }
  63% {
    stroke: #59d2f0;
    filter: drop-shadow(0 0 4px #59d2f0);
  }
  72% {
    stroke: #3a9e60;
    filter: drop-shadow(0 0 4px #3a9e60);
  }
  86% {
    stroke: #f05959;
    filter: drop-shadow(0 0 4px #f05959);
  }
  92% {
    stroke: #a4aa4d;
    filter: drop-shadow(0 0 8px #a4aa4d);
  }
  100% {
    filter: drop-shadow(0 0 4px currentColor);
    stroke-dashoffset: 100;
  }
}
</style>
