<script setup lang="ts">
import content from "@/locales/en.json";
import { analytics } from "@/firebase/firebaseConfig";
import { logEvent } from "firebase/analytics";
import { gsap } from "gsap";
import { onMounted, ref } from "vue";
import { useScreenQuery } from "@/hooks/useScreenQuery";
import { useWordCycle } from "@/animation/useWordCycle";

const CAL_URL = "https://cal.com/dev24";

const openBooking = () => {
  if (analytics) {
    logEvent(analytics, "schedule_click", { location: "hero" });
  }
  window.open(CAL_URL, "_blank", "noopener");
};

const heroRef = ref<HTMLElement | null>(null);
const wordRef = ref<HTMLElement | null>(null);

const { word } = useWordCycle(content.heroWords, wordRef);

const scrollTo = (id: string) => {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
};

const { isMatch: prefersReduced } = useScreenQuery("(prefers-reduced-motion)");

onMounted(() => {
  if (prefersReduced.value || !heroRef.value) return;

  const tl = gsap.timeline({ delay: 0.2 });

  tl.from(".hero-line-1", {
    y: 40,
    opacity: 0,
    duration: 0.7,
    ease: "power3.out",
  })
    .from(
      ".hero-line-2",
      {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      },
      "-=0.45"
    )
    .from(
      ".hero-rule",
      {
        scaleX: 0,
        duration: 0.6,
        ease: "power2.inOut",
      },
      "-=0.3"
    )
    .from(
      ".hero-sub",
      {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.2"
    )
    .from(
      ".hero-actions",
      {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.25"
    );
});
</script>

<template>
  <section ref="heroRef" aria-label="Introduction" class="hero">
    <div class="hero-content">
      <h1 class="hero-headline">
        <span class="hero-line-1">
          {{ content.heroLead }}
          <span ref="wordRef" class="hero-word">{{ word }}</span>
        </span>
        <span class="hero-line-2">{{ content.heroLine2 }}</span>
      </h1>
      <hr class="hero-rule" />
      <p class="hero-sub">{{ content.heroSub }}</p>
      <div class="hero-actions">
        <button
          class="hero-cta hero-cta--work"
          @click="scrollTo('#client-work')"
        >
          See the work
        </button>
        <button class="hero-cta hero-cta--contact" @click="openBooking">
          Book a consultation
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  display: flex;
  align-items: center;
  min-height: 85vh;
  padding: 6rem 2rem 4rem;

  @media screen and (min-width: 800px) {
    padding: 6rem 4rem 4rem;
  }
}

.hero-content {
  max-width: 720px;
}

.hero-headline {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 0;
}

.hero-line-1 {
  font-size: clamp(2.2rem, 6vw, 4.5rem);
  font-weight: 500;
  line-height: 1.1;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.hero-word {
  display: inline-block;
  color: var(--blue);
  will-change: transform, opacity;
}

.hero-line-2 {
  font-size: clamp(2.2rem, 6vw, 4.5rem);
  font-weight: 500;
  line-height: 1.1;
  color: var(--blue);
  letter-spacing: -0.02em;
}

.hero-rule {
  border: none;
  height: 2px;
  background: var(--blue);
  width: 80px;
  margin: 2rem 0;
  transform-origin: left;
  opacity: 0.6;
}

.hero-sub {
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.6;
  color: var(--color-text);
  opacity: 0.7;
  max-width: 480px;
  margin: 0;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;
}

.hero-cta {
  padding: 0.8rem 1.8rem;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  &--work {
    background: var(--blue);
    color: var(--black);
    border-radius: 2px;

    &:hover {
      background: var(--white);
      transform: translateY(-1px);
    }
  }

  &--contact {
    background: transparent;
    color: var(--color-text);
    border-bottom: 1px solid currentColor;
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;

    &:hover {
      color: var(--blue);
    }
  }

  &:active {
    transform: translateY(0);
  }
}
</style>
