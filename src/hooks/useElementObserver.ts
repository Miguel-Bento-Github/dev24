import { onMounted, onUnmounted, ref } from "vue";

export const useElementObserver = () => {
  const ratio = ref(0);
  const elementRef = ref<HTMLElement>(document.createElement("div"));

  const options = {
    root: document.getElementById("#app"),
    rootMargin: "0px",
    threshold: 1.0,
  };

  const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      ratio.value = entry.intersectionRatio;
    });
  }, options);

  onMounted(() => {
    if (elementRef.value) {
      elementObserver.observe(elementRef.value);
    }
  });

  onUnmounted(() => {
    if (elementRef.value) {
      elementObserver.unobserve(elementRef.value);
    }
  });

  return { ratio, elementRef };
};
