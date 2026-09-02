import { useScreenQuery } from "@/hooks/useScreenQuery";
import { gsap } from "gsap";
import { onMounted, onUnmounted, ref, type Ref } from "vue";

type WordCycleOptions = {
  /** seconds each word stays fully visible */
  hold?: number;
  /** seconds to wait before the first swap, so the entrance can finish */
  delay?: number;
};

/**
 * Cycles through `words` inside `elementRef`, fading each one out upward and
 * the next one in from below. Holds on the first word when the visitor
 * prefers reduced motion.
 */
export const useWordCycle = (
  words: string[],
  elementRef: Ref<HTMLElement | null>,
  { hold = 2.4, delay = 2 }: WordCycleOptions = {}
) => {
  const word = ref(words[0]);
  let timeline: gsap.core.Timeline | null = null;

  onMounted(() => {
    const { isMatch: prefersReduced } = useScreenQuery(
      "(prefers-reduced-motion)"
    );

    if (prefersReduced.value || words.length < 2 || !elementRef.value) return;

    let index = 0;
    timeline = gsap.timeline({ repeat: -1, delay });

    // one out/in pair per word, so the loop lands back on words[0]
    words.forEach(() => {
      timeline
        ?.to(elementRef.value, {
          y: -14,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        })
        .add(() => {
          index = (index + 1) % words.length;
          word.value = words[index];
        })
        .fromTo(
          elementRef.value,
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            // without this the timeline paints the from-state on creation,
            // hiding the first word until the loop reaches this tween
            immediateRender: false,
          }
        )
        .to({}, { duration: hold });
    });
  });

  onUnmounted(() => {
    timeline?.kill();
    timeline = null;
  });

  return { word };
};
