<script setup lang="ts">
import { ref } from "vue";
import IconEmail from "@/components/icons/IconEmail.vue";
import { analytics } from "@/firebase/firebaseConfig";
import { logEvent } from "firebase/analytics";

const isDrawing = ref(false);
const isActive = ref(false);

const CAL_URL = "https://cal.com/dev24";

const openBooking = () => {
  if (analytics) {
    logEvent(analytics, "schedule_click", { location: "contact" });
  }
  window.open(CAL_URL, "_blank", "noopener");
};
</script>

<template>
  <div class="contact-actions">
    <button class="contact contact--book" @click="openBooking">
      <span class="book-text">Book a consultation</span>
    </button>
    <a
      @mouseenter="isDrawing = true"
      @mouseleave="isDrawing = isActive ? true : false"
      @click="isActive = true"
      href="mailto:dev.24.contact@gmail.com?subject=Contact%20from%20website&body=Hi%20dev24"
      type="button"
      class="contact"
    >
      <IconEmail :isDrawing="isDrawing" :isActive="isActive" />
      <span class="email-text">Email me</span>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.contact-actions {
  margin-top: 4rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.contact {
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

  &:hover {
    filter: invert(100%);
    background: var(--color-background);
    color: var(--color-text);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: inset 0 -2px 2px 2px var(--color-text-invert),
      1px 1px 0 var(--color-text-invert);
  }

  &--book {
    background: var(--blue);
    color: var(--black);
    font-weight: 600;
    font-size: 0.9rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 0.8rem 1.8rem;
    border: none;
    cursor: pointer;
    filter: none;

    &:hover {
      filter: none;
      background: var(--white);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }
}
</style>
