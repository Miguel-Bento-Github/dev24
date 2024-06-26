<script setup lang="ts">
import { useElementObserver } from "@/hooks/useElementObserver";
import { useScreenQuery } from "@/hooks/useScreenQuery";
import { ref, watch } from "vue";
import LoadingSpinner from "../small/LoadingSpinner.vue";

const props = defineProps<{
  header: string;
  link: string;
  caption: string;
  meta: string;
  i: number;
}>();

const { isMatch } = useScreenQuery("(min-width: 550px)");

const src = ref(!isMatch.value || !props.i ? props.link : "");

const { elementRef, ratio } = useElementObserver(0.5);
const isLoading = ref(true);

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
    <p class="monkey-header">{{ header }}</p>
    <div class="monkey-wrapper">
      <div class="monkey-iframe-container">
        <iframe
          :title="meta"
          v-if="src"
          loading="lazy"
          scrolling="no"
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
      </div>
    </div>
    <a
      :id="`${caption}-${i}`"
      class="monkey-link"
      target="_blank"
      rel="noopener"
      :href="link"
    >
      {{ caption }}
    </a>
    <div class="load-trigger"></div>
  </section>
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
  padding: 30vh 1rem;
  text-align: center;
  min-height: 50vh;
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

.monkey-header {
  grid-area: description;
}

.monkey-link {
  width: max-content;
  grid-area: link;
  padding: 8px;
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
</style>
