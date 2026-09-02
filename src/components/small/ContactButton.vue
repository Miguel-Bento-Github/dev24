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
      href="mailto:hello@dev24.net?subject=Contact%20from%20website&body=Hi%20dev24"
      type="button"
      class="contact"
    >
      <IconEmail :isDrawing="isDrawing" />
      <span class="email-text">Email me</span>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.contact-actions {
  margin-top: 4rem;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
}

/* mirrors .router-link in NavBar.vue */
.contact {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: max-content;
  padding: 0.6rem 0;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-text);
  background: none;
  border: none;
  border-bottom: 1px solid currentColor;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: var(--blue);
    border-bottom-color: currentColor;
  }

  /* mirrors .book-link in NavBar.vue */
  &--book {
    padding: 0.6rem 1.4rem;
    color: var(--black);
    background: var(--blue);
    border: none;
    border-radius: 2px;

    &:hover {
      color: var(--black);
      background: var(--white);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }
}
</style>
