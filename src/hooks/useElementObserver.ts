import { onMounted, onUnmounted, ref } from "vue";

export const useElementObserver = () => {
  const isIntersecting = ref(false);
  const elementRef = ref<HTMLElement>(document.createElement("div"));

  const options = {
    root: document.getElementById("#app"),
    rootMargin: "0px",
    threshold: 1.0,
  };

  const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0.75) {
        isIntersecting.value = true;
      }
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

  return { isIntersecting, elementRef };
};
