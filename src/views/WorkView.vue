<script setup lang="ts">
import { useMonkeyAnimation } from "@/animation/useMonkeyAnimation";
import MonkeySection from "@/components/medium/MonkeySection.vue";
import content from "@/locales/en.json";

useMonkeyAnimation();
</script>

<template>
  <MonkeySection
    ref="elementRef"
    v-for="({ header, link, caption, meta }, index) in content.sections"
    :header="header"
    :link="link"
    :caption="caption"
    :meta="meta"
    :key="caption"
    :i="index"
  />
</template>
