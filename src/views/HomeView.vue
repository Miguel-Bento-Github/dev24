<script setup lang="ts">
import SignIn from "@/components/medium/SignIn.vue";
import { useEntrance } from "@/hooks/useEntrance";
import { useUserStore } from "@/stores/user";
import content from "@/locales/en.json";
import IconHand from "@/components/icons/IconHand.vue";
import IconPhone from "@/components/icons/IconPhone.vue";
import IconTablet from "@/components/icons/IconTablet.vue";
import IconMonitor from "@/components/icons/IconMonitor.vue";
import CSSDoodle from "@/components/small/CSSDoodle.vue";
import ContactButton from "@/components/small/ContactButton.vue";
import HomeSection from "@/components/medium/HomeSection.vue";
import gsap from "gsap";
import { onMounted } from "vue";

useEntrance();
const user = useUserStore();
const year = new Date().getFullYear();

onMounted(() => {
  const frames: HTMLElement[] = gsap.utils.toArray(".monkey-wrapper");
  const texts: HTMLElement[] = gsap.utils.toArray(".monkey-header");
  frames.forEach((ref, i) => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        start: "top center",
        trigger: ref,
        scrub: i * 0.2,
      },
    });
    timeline
      .from(ref, {
        autoAlpha: 0.4,
        x: "30px",
      })
      .from(
        texts[i],
        {
          x: "-30px",
        },
        "<"
      );
  });
});
</script>

<template>
  <article class="content">
    <section itemscope itemtype="https://schema.org/Service" class="hero">
      <meta itemprop="serviceType" content="Website development" />
      <header>
        <h1 class="h2 headline">
          Welcome
          <Transition name="fade" mode="out-in">
            <span v-if="user.name">{{ user.name }}</span>
            <IconHand v-else />
          </Transition>
        </h1>
        <h2 class="h3 description">
          {{ content.hero }}
        </h2>
        <ContactButton />
      </header>
      <div class="doodle-wrapper"><CSSDoodle /></div>
    </section>
    <HomeSection
      v-for="{ header, link, caption } in content.sections"
      :header="header"
      :link="link"
      :caption="caption"
      :key="caption"
    />
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
  background: rgb(#000, 20%);
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
