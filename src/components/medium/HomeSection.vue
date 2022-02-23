<script setup lang="ts">
defineProps<{
  header: string;
  link: string;
  caption: string;
}>();
</script>

<template>
  <section class="monkey">
    <p class="monkey-header">{{ header }}</p>
    <div class="monkey-wrapper">
      <div class="monkey-iframe-container">
        <iframe loading="lazy" frameborder="0" :src="link"></iframe>
      </div>
    </div>
    <a class="monkey-link" target="_blank" rel="noopener" :href="link">
      {{ caption }}
    </a>
  </section>
</template>

<style lang="scss" scoped>
.monkey {
  display: grid;
  grid-template-areas:
    "link"
    "frame"
    "description";
  align-items: flex-start;
  justify-items: center;
  margin-top: 30vh;
  margin-bottom: 30vh;
  text-align: center;
  min-height: 50vh;

  @media screen and (min-width: 800px) {
    margin-top: 25vh;
    margin-bottom: 25vh;
    text-align: start;
    display: grid;
    align-items: center;
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
  padding: 0 8px;
}

.monkey-iframe-container {
  position: relative;
  height: auto;
  width: 40vw;
  overflow: hidden;
  aspect-ratio: 10 / 16;

  @media screen and (min-width: 450px) {
    width: auto;
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
</style>
