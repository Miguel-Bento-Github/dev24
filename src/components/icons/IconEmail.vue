<script setup lang="ts">
defineProps<{ isDrawing: boolean }>();
</script>

<template>
  <!--
    Stroke-authored envelope: every path is a single open/closed outline so it
    can be drawn with a dash offset without doubling back on itself. The motion
    lines live in the left third of the viewBox and stay hidden until the draw
    animation runs.
  -->
  <svg
    class="email"
    :class="{ active: isDrawing }"
    viewBox="0 0 30 20"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <g class="envelope">
      <path
        pathLength="100"
        d="M11.1 3H27.1A1.6 1.6 0 0 1 28.7 4.6V15.4A1.6 1.6 0 0 1 27.1 17H11.1A1.6 1.6 0 0 1 9.5 15.4V4.6A1.6 1.6 0 0 1 11.1 3Z"
      />
      <path class="flap" pathLength="100" d="M10.2 3.8 19.1 10.2 28 3.8" />
    </g>

    <g class="strokeless">
      <path
        pathLength="100"
        d="M11.1 3H27.1A1.6 1.6 0 0 1 28.7 4.6V15.4A1.6 1.6 0 0 1 27.1 17H11.1A1.6 1.6 0 0 1 9.5 15.4V4.6A1.6 1.6 0 0 1 11.1 3Z"
      />
      <path class="flap" pathLength="100" d="M10.2 3.8 19.1 10.2 28 3.8" />
    </g>

    <g class="lines">
      <path pathLength="100" d="M6.6 6.2H2.6" />
      <path pathLength="100" d="M6.6 10H1" />
      <path pathLength="100" d="M6.6 13.8H3.6" />
    </g>
  </svg>
</template>

<style lang="scss" scoped>
.email {
  flex: none;
  /* sized against the label: viewBox is 30x20, so width is height * 1.5 */
  height: 1.25em;
  width: 1.875em;
  /* the motion lines occupy the left third of the viewBox and are invisible
     until they draw, so pull the envelope flush with the start of the row */
  margin-left: -0.6em;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7px;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 100;
  stroke-dashoffset: 0;
}

/* hidden until drawn */
.strokeless,
.lines path {
  stroke-dashoffset: 100;
}

/* the overdraw that thickens the envelope while the link is hovered */
.strokeless {
  stroke-width: 2.5px;
}

.email:hover .strokeless,
.email.active .strokeless {
  animation: draw 0.4s ease-in-out alternate forwards;
}

.email:hover .lines path,
.email.active .lines path {
  animation: draw 0.15s ease-in-out forwards;
}

@for $i from 1 through 3 {
  .email:hover .lines path:nth-child(#{$i}),
  .email.active .lines path:nth-child(#{$i}) {
    animation-delay: 0.2s + (0.1s * $i);
  }
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .email:hover .strokeless,
  .email.active .strokeless,
  .email:hover .lines path,
  .email.active .lines path {
    animation: none;
    stroke-dashoffset: 0;
  }
}
</style>
