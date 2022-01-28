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
        <iframe frameborder="0" :src="link"></iframe>
      </div>
    </div>
    <a class="monkey-link" target="_blank" rel="noopener" :href="href">
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
  margin-top: 15rem;
  margin-bottom: 15rem;
  text-align: center;

  @media screen and (min-width: 800px) {
    margin-top: 5vh;
    margin-bottom: 5vh;
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
  height: 40vh;
  aspect-ratio: 10 / 16;

  @media screen and (min-width: 450px) {
    height: 30vh;
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
</style>
