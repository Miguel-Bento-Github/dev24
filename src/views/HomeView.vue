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
</script>

<template>
  <article>
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
      <h3>{{ header }}</h3>
      <div class="monkey-iframe-container">
        <iframe frameborder="0" :src="link"></iframe>
      </div>
      <a target="_blank" :href="link">{{ caption }}</a>
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
  </article>

  <Transition name="fade">
    <SignIn />
  </Transition>
</template>

<style lang="scss" scoped>
section {
  margin-top: 15vh;
  margin-bottom: 15vh;
}

.monkey-iframe-container {
  height: max-content;
  overflow: hidden;
  border-radius: 1rem;
  height: 50vh;
  box-shadow: 2px 2px 2px 1px var(--black);
}

.monkey iframe {
  height: 100%;
  width: 100%;
}

.devices {
  display: flex;

  & > svg {
    stroke-dashoffset: 0;
    animation: move 8s ease-in-out infinite alternate;

    @for $i from 1 through 3 {
      &:nth-child(#{$i}) {
        animation-delay: $i * 1s;
      }
    }
  }
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
