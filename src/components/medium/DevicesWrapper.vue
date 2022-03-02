<script setup lang="ts">
import IconMonitor from "@/components/icons/IconMonitor.vue";
import IconPhone from "@/components/icons/IconPhone.vue";
import IconTablet from "@/components/icons/IconTablet.vue";
</script>

<template>
  <section class="device-section">
    <h3 class="hidden">Devices</h3>
    <div class="devices">
      <IconPhone />
      <IconTablet />
      <IconMonitor />
    </div>
    <div class="content">
      <p>
        <slot name="support" />
      </p>
      <p>
        <slot name="content" />
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.device-section {
  margin-top: 15vh;
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

.content {
  display: grid;

  @media screen and (min-width: 800px) {
    grid-template-columns: 1fr 1fr;

    & > p {
      padding-left: 6rem;
      padding-right: 6rem;
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
