<script setup lang="ts">
import "css-doodle";
import { ref } from "vue";

class Doodle extends HTMLElement {
  constructor() {
    super();
  }

  update() {
    return;
  }
}

const doodle = ref(document.createElement("css-doodle") as Doodle);
</script>

<template>
  <pre>
  <css-doodle @mouseenter="doodle?.update()" ref="doodle" click-to-update>
      :doodle {
        @grid: 5 / 40vh;
        zIndex: 0;
        background: @m100(
          radial-gradient(#996a3f 90%, #1b0d22 10%)
          @plot(r: @r(.8, 1)) / 5px 5px
          no-repeat
        );
        transition: .5s cubic-bezier(.175, .885, .32, 1.275);
      }

      @nth(3n + calc(@r(10))) {
        @shape: windmill;
      }

      @nth(3n + calc(@r(10))) {
        @shape: bud, 5;
      }

      @nth(3n + calc(@r(10))) {
        @shape: clover, 3;
      }

      @nth(4n + calc(@r(10))) {
        @shape: vase;
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

      background: hsl(@r(360), 60%, 70%);
      transform: scale(@r(.2, .9)) rotateZ(calc(@r(90) * 1deg));
      transition: .5s cubic-bezier(.175, .885, .32, 1.275);
      transition-delay: @r(500ms);
      backdrop-filter: blur(1px);
  </css-doodle>
  </pre>
</template>

<style lang="scss" scoped>
pre {
  all: unset;
}

css-doodle {
  filter: drop-shadow(0 0 2px currentColor);
  border-radius: 50%;
}
</style>
