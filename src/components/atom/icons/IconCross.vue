<script setup lang="ts">
defineProps<{ rotate: boolean }>();
</script>

<template>
  <svg
    class="icon"
    :class="{ rotated: rotate }"
    fill="currentColor"
    version="1.1"
    height="128pt"
    width="128pt"
    viewBox="0 0 128 128"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m104.19 17.406-37.504 37.504c-1.5352 1.5352-3.9688 1.5352-5.375 0l-37.504-37.504c-1.5352-1.5352-3.9688-1.5352-5.375 0-1.5352 1.5352-1.5352 3.9688 0 5.375l37.504 37.504c1.5352 1.5352 1.5352 3.9688 0 5.375l-37.633 37.637c-1.5352 1.5352-1.5352 3.9688 0 5.375 1.5352 1.5352 3.9688 1.5352 5.375 0l37.504-37.504c1.5352-1.5352 3.9688-1.5352 5.375 0l37.633 37.633c1.5352 1.5352 3.9688 1.5352 5.375 0 1.5352-1.5352 1.5352-3.9688 0-5.375l-37.375-37.633c-1.5352-1.5352-1.5352-3.9688 0-5.375l37.504-37.504c1.5352-1.5352 1.5352-3.9688 0-5.375-1.5352-1.5391-3.9688-1.5391-5.5039-0.13281z"
    />
  </svg>
</template>

<style lang="scss" scoped>
.icon {
  height: 24px;
  width: 24px;
  transition: transform 0.15s ease-in-out;
}

.rotated {
  fill: var(--color-link);
  transform: translateY(0) rotateZ(135deg);
}
</style>
