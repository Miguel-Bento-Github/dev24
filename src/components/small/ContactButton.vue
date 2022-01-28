<script setup lang="ts">
import { ref } from "vue";
import IconEmail from "@/components/icons/IconEmail.vue";
const isDrawing = ref(false);
</script>

<template>
  <a
    @mouseenter="isDrawing = true"
    href="mailto:bento-miguel@outlook.com"
    type="button"
    class="contact"
  >
    <IconEmail :is-drawing="isDrawing" />
    <span>Email me</span>
  </a>
</template>

<style lang="scss" scoped>
.contact {
  margin-top: 4rem;
  height: max-content;
  width: max-content;
  display: flex;
  align-items: center;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  color: var(--color-text);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  transition: all 0.15s ease-in-out;
  box-shadow: inset 0 -2px 2px 2px var(--color-text-invert),
    2px 2px 8px var(--color-text-invert);

  @media screen and (min-width: 800px) {
    left: 2rem;
    bottom: 2rem;
  }

  &:hover {
    filter: invert(100%);
    background: #000;
  }

  &:active {
    transform: translateY(1px);
    box-shadow: inset 0 -2px 2px 2px var(--color-text-invert),
      1px 1px 0 var(--color-text-invert);
  }
}
</style>
