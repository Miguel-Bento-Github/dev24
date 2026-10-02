import { onMounted, onUnmounted, ref } from "vue";

export const useElementObserver = (threshold = 0) => {
  const ratio = ref(0);
  const elementRef = ref<HTMLElement | null>(null);
  let elementObserver: IntersectionObserver | null = null;

  // the observer only exists in the browser, so set it up once mounted
  onMounted(() => {
    if (!elementRef.value) return;

    const options = {
      root: document.getElementById("#app"),
      rootMargin: "25%",
      threshold,
    };

    elementObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        ratio.value = entry.intersectionRatio;
      });
    }, options);

    elementObserver.observe(elementRef.value);
  });

  onUnmounted(() => {
    if (elementRef.value) {
      elementObserver?.unobserve(elementRef.value);
    }
  });

  return { ratio, elementRef };
};
