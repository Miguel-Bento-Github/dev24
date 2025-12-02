<script setup lang="ts">
defineProps<{ expanded?: boolean }>();
</script>

<template>
  <svg
    class="icon"
    :class="{ expanded }"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ expanded ? 'Collapse' : 'Expand' }}</title>
    <template v-if="!expanded">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </template>
    <template v-else>
      <path d="M4 14h6v6M14 4h6v6M10 14l-7 7M21 3l-7 7" />
    </template>
  </svg>
</template>

<style lang="scss" scoped>
.icon {
  height: 24px;
  width: 24px;
  transition: transform 0.15s ease-in-out;
}
</style>
