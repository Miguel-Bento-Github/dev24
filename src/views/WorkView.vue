<script setup lang="ts">
import { useMonkeyAnimation } from "@/animation/useMonkeyAnimation";
import MonkeySection from "@/components/medium/MonkeySection.vue";
import content from "@/locales/en.json";

useMonkeyAnimation();
</script>

<template>
  <MonkeySection
    ref="elementRef"
    v-for="({ header, link, caption }, index) in content.sections"
    :header="header"
    :link="link"
    :caption="caption"
    :key="caption"
    :i="index"
  />
</template>
