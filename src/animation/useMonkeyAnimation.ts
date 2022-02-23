import gsap from "gsap";
import { onMounted } from "vue";

export const useMonkeyAnimation = () => {
  onMounted(() => {
    const frames: HTMLElement[] = gsap.utils.toArray(".monkey-wrapper");
    const texts: HTMLElement[] = gsap.utils.toArray(".monkey-header");

    frames.forEach((ref, i) => {
      if (!i) {
        const timeline = gsap.timeline({
          scrollTrigger: {
            start: "top center",
            end: "bottom +=100",
            trigger: ref,
            scrub: i * 0.2,
          },
        });

        timeline.from(ref.parentElement, {
          y: "150px",
        });
        return;
      }
      const timeline = gsap.timeline({
        scrollTrigger: {
          start: "-=300 center",
          end: "bottom +=100",
          trigger: ref,
          scrub: i * 0.2,
        },
      });

      timeline
        .from(ref.parentElement, {
          y: "300px",
        })
        .from(
          ref,
          {
            autoAlpha: 0.4,
            x: "30px",
          },
          "<"
        )
        .from(
          texts[i],
          {
            x: "-15px",
          },
          "<"
        );
    });
  });
};
