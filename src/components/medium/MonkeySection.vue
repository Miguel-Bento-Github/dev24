<script setup lang="ts">
import { useElementObserver } from "@/hooks/useElementObserver";
import { useScreenQuery } from "@/hooks/useScreenQuery";
import { ref, watch } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingSpinner from "../small/LoadingSpinner.vue";
import IconExpand from "../icons/IconExpand.vue";

const props = defineProps<{
  header: string;
  link: string;
  caption: string;
  meta: string;
  i: number;
  total: number;
  logo?: string;
  screenshot?: string;
}>();

const isFirst = props.i === 0;
const isLast = props.i === props.total - 1;

const scrollToSection = (direction: "up" | "down") => {
  const sections = document.querySelectorAll<HTMLElement>(".monkey");
  const targetIndex = direction === "down" ? props.i + 1 : props.i - 1;
  const target = sections[targetIndex];
  if (!target) return;

  // The scroll animations translate the section itself, so its live rect is
  // not where it ends up once the tween settles. scrollIntoView would aim at
  // the transformed position and overshoot by the full parallax distance.
  // Aim at the untransformed layout position, less the fixed header.
  const { m42: translateY } = new DOMMatrix(getComputedStyle(target).transform);
  const header = document.querySelector("header");
  const headerHeight = header ? header.getBoundingClientRect().height : 0;
  const top =
    target.getBoundingClientRect().top +
    window.scrollY -
    translateY -
    headerHeight;

  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const { isMatch } = useScreenQuery("(min-width: 550px)");

const src = ref(!isMatch.value || !props.i ? props.link : "");

const { elementRef, ratio } = useElementObserver(0.1);
const isLoading = ref(true);
const isExpanded = ref(false);
const wrapperRef = ref<HTMLElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const sectionRef = ref<HTMLElement | null>(null);

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;

  if (isExpanded.value) {
    gsap.set(headerRef.value, { display: "none" });
    gsap.set(wrapperRef.value, { gridColumn: "1 / -1", maxWidth: "none", width: "100%" });
    gsap.set(containerRef.value, { width: "100%", height: "70vh" });
    gsap.fromTo(
      wrapperRef.value,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.25,
        ease: "power1.out",
        // expanding changes the page height, so the scroll animations below
        // need to re-measure. Wait for the fade so the two do not fight over
        // this wrapper's opacity.
        onComplete: () => ScrollTrigger.refresh(),
      }
    );
  } else {
    gsap.to(wrapperRef.value, {
      opacity: 0,
      duration: 0.15,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(headerRef.value, { clearProps: "display" });
        gsap.set(wrapperRef.value, { clearProps: "gridColumn,maxWidth,width,opacity" });
        gsap.set(containerRef.value, { clearProps: "width,height" });
        ScrollTrigger.refresh();
      },
    });
  }
};

watch(ratio, (newValue: number) => {
  if (newValue > 0) src.value = props.link;

  setTimeout(() => {
    isLoading.value = false;
  }, 250);
});
</script>

<template>
  <section
    :aria-labelledby="`${caption}-${i}`"
    :id="caption"
    ref="elementRef"
    class="monkey"
  >
    <p ref="headerRef" class="monkey-header">{{ header }}</p>
    <div ref="wrapperRef" class="monkey-wrapper">
      <button
        v-if="!screenshot"
        class="expand-btn"
        @click="toggleExpand"
        :aria-label="isExpanded ? 'Collapse' : 'Expand'"
      >
        <IconExpand :expanded="isExpanded" />
      </button>
      <div ref="containerRef" class="monkey-iframe-container">
        <a v-if="screenshot" :href="link" target="_blank" rel="noopener" class="monkey-screenshot-link">
          <img
            :src="screenshot"
            :alt="meta"
            class="monkey-screenshot"
            loading="lazy"
          />
        </a>
        <template v-else>
          <iframe
            :title="meta"
            v-if="src"
            loading="lazy"
            frameborder="0"
            :src="isMatch ? src : link"
          ></iframe>
          <LoadingSpinner
            role="presentation"
            aria-label="loading spinner"
            v-if="isLoading || !src"
            :class="{ disappear: src }"
            class="loading"
          />
        </template>
      </div>
    </div>
    <a
      :id="`${caption}-${i}`"
      class="monkey-link"
      target="_blank"
      rel="noopener"
      :href="link"
    >
      <img v-if="logo" :src="logo" :alt="caption" class="monkey-logo" />
      {{ caption }}
    </a>
    <div class="load-trigger"></div>
  </section>
  <div class="nav-buttons">
    <button
      v-if="!isFirst"
      class="nav-btn"
      @click="scrollToSection('up')"
      aria-label="Go to previous section"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
    <button
      v-if="!isLast"
      class="nav-btn"
      @click="scrollToSection('down')"
      aria-label="Go to next section"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
    <button
      v-if="isLast"
      class="nav-btn nav-btn--top"
      @click="scrollToTop"
      aria-label="Back to top"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M12 20V7" />
        <path d="M5 14l7-7 7 7" />
        <path d="M5 4h14" />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use "@/scss/pseudo.scss" as *;

.monkey {
  position: relative;
  display: grid;
  grid-template-areas:
    "link"
    "frame"
    "description";
  align-items: flex-start;
  justify-items: center;
  padding: 8vh 1rem;
  text-align: center;
  min-height: auto;
  background: linear-gradient(
    transparent 5%,
    rgb(#000, 20%) 50%,
    transparent 100%
  );

  &:first-child {
    padding-top: 10vh;
  }

  @media screen and (min-width: 800px) {
    padding: 15vh 2rem;
    min-height: 50vh;
    display: grid;
    align-items: center;
    justify-items: flex-start;
    grid-template-areas:
      "frame description"
      "link .";
    grid-template-columns: minmax(auto, 60%) minmax(auto, 40%);
    gap: 0 32px;
    text-align: start;
    background: transparent;

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
  position: relative;
  grid-area: frame;
  overflow: hidden;
  border-radius: 32px;
  margin: auto auto 2rem;
  max-width: max-content;
  max-height: max-content;
  width: 100%;
  height: auto;
  padding: 0.5rem;
  box-shadow: inset 0 -2px 4px 1px var(--black), 2px 2px 2px 1px var(--black);

  @media screen and (min-width: 800px) {
    margin: auto 0 2rem;
  }

}

.expand-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  padding: 0.5rem;
  background: rgb(0 0 0 / 50%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: var(--white);
  transition: background 0.15s ease-in-out;

  &:hover {
    background: rgb(0 0 0 / 70%);
  }
}

.monkey-header {
  grid-area: description;
}

.monkey-link {
  width: max-content;
  grid-area: link;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.monkey-logo {
  height: 1.2em;
  width: auto;
}

.monkey-iframe-container {
  position: relative;
  height: auto;
  width: 80vw;
  overflow: hidden;
  aspect-ratio: 10 / 16;

  @media screen and (min-width: 450px) {
    width: 100%;
    height: 35vh;
    aspect-ratio: 4 / 3;
  }

  @media screen and (min-width: 1000px) {
    width: 40vw;
    height: auto;
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

.monkey-screenshot-link {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.monkey-screenshot {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
  transition: opacity 0.15s ease-in-out;

  &:hover {
    opacity: 0.85;
  }
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.45s ease-in-out;

  &.disappear {
    opacity: 0;
  }
}

.nav-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem 0;
  /* the scroll animations translate .monkey (position: relative) down over
     this row, and a positioned sibling would otherwise paint on top and
     swallow the clicks. Stack the controls above the sections. */
  position: relative;
  z-index: 1;
}

.nav-btn {
  width: 40px;
  height: 40px;
  padding: 0.5rem;
  background: rgb(0 0 0 / 30%);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: var(--white);
  transition: background 0.15s ease-in-out;

  &:hover {
    background: rgb(0 0 0 / 50%);
  }

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
