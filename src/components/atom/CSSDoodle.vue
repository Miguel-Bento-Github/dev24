<script setup lang="ts">
import "css-doodle";
import { onMounted, ref } from "vue";

class Doodle extends HTMLElement {
  constructor() {
    super();
  }

  update() {
    return;
  }
}

const doodle = ref(document.createElement("css-doodle") as Doodle);

onMounted(() => {
  setInterval(() => doodle.value.update(), 5000);
});
</script>

<template>
  <css-doodle @mouseenter="doodle?.update()" ref="doodle" click-to-update>
    <pre>
      :doodle {
        @grid: 5 / 40vh;
        --r: calc(@rand(90) * 1deg);
        zIndex: 0;
      }
      :doodle(:hover) {
        --r: calc(@rand(190) * 1deg);
      }

      @nth(8n + 3) {
        @shape: windmill;
      }

      @nth(2n + 3) {
        @shape: bud, 5;
      }

      filter: @svg-filter(
        feTurbulence {
          type: fractalNoise;
          baseFrequency: .01 .2;
        }
        feDisplacementMap {
          in: SourceGraphic;
          scale: 50;
        }
      );

      background: hsl(@rand(360), 60%, 70%);
      transform: scale(@rand(.2, .9)) rotateZ(calc(@rand(90) * 1deg));
      transition: .5s cubic-bezier(.175, .885, .32, 1.275);
      transition-delay: @rand(500ms);
      backdrop-filter: blur(1px);
      </pre
    >
  </css-doodle>
</template>

<style lang="scss" scoped>
css-doodle {
  border: 1px solid currentColor;
  filter: drop-shadow(0 0 2px currentColor);
  border-radius: 50%;
}
</style>
