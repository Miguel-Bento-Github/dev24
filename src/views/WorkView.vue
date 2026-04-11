<script setup lang="ts">
import { useMonkeyAnimation } from "@/animation/useMonkeyAnimation";
import HeroSection from "@/components/medium/HeroSection.vue";
import MonkeySection from "@/components/medium/MonkeySection.vue";
import ContactButton from "@/components/small/ContactButton.vue";
import content from "@/locales/en.json";
import { onMounted, onUnmounted } from "vue";

const totalSections = content.clientWork.length + content.experiments.length;

useMonkeyAnimation();

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.target.id) {
          const hash = `#${entry.target.id}`;
          if (window.location.hash !== hash) {
            history.replaceState(null, "", hash);
          }
        }
      }
    },
    { rootMargin: "-40% 0px -40% 0px" }
  );

  const sections = document.querySelectorAll(
    ".monkey[id], #client-work, #experiments, #contact"
  );
  sections.forEach((el) => observer!.observe(el));
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <HeroSection />

  <div id="client-work" class="section-divider">
    <span class="section-label">Client Work</span>
    <hr class="section-rule" />
  </div>
  <div class="work-group">
    <MonkeySection
      v-for="({ header, link, caption, meta, image }, index) in content.clientWork"
      :header="header"
      :link="link"
      :caption="caption"
      :meta="meta"
      :image="image"
      :key="caption"
      :i="index"
      :total="totalSections"
    />
  </div>

  <div id="experiments" class="section-divider">
    <span class="section-label">Experiments</span>
    <hr class="section-rule" />
  </div>
  <div class="work-group">
    <MonkeySection
      v-for="({ header, link, caption, meta, image }, index) in content.experiments"
      :header="header"
      :link="link"
      :caption="caption"
      :meta="meta"
      :image="image"
      :key="caption"
      :i="content.clientWork.length + index"
      :total="totalSections"
    />
  </div>

  <section id="contact" class="contact-section">
    <span class="contact-label">Contact</span>
    <h2 class="contact-heading">{{ content.contact.heading }}</h2>
    <p class="contact-body">{{ content.contact.body }}</p>
    <ContactButton />
  </section>
</template>

<style lang="scss" scoped>
.section-divider {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 6rem 2rem 0;

  @media screen and (min-width: 800px) {
    padding: 6rem 4rem 0;
  }
}

.section-label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--blue);
  white-space: nowrap;
}

.section-rule {
  flex: 1;
  border: none;
  height: 1px;
  background: var(--color-text);
  opacity: 0.15;
}

.contact-section {
  padding: 12vh 2rem 6vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (min-width: 800px) {
    padding: 12vh 4rem 6vh;
  }
}

.contact-label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--blue);
}

.contact-heading {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 1rem 0 0;
}

.contact-body {
  margin-top: 1rem;
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.6;
  color: var(--color-text);
  opacity: 0.6;
  max-width: 480px;
}
</style>
