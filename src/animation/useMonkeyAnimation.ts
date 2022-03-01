import { useScreenQuery } from "@/hooks/useScreenQuery";
import gsap from "gsap";
import { onMounted } from "vue";

export const useMonkeyAnimation = () => {
  onMounted(() => {
    const frames: HTMLElement[] = gsap.utils.toArray(".monkey-wrapper");
    const texts: HTMLElement[] = gsap.utils.toArray(".monkey-header");
    const { isMatch } = useScreenQuery("(min-width: 550px)");

    // create some space between the frames and the footer
    gsap.set(frames[frames.length - 1].parentElement, { marginBottom: "15vh" });

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
          end: "-=100 +=200",
          trigger: ref,
          scrub: i * 0.2,
        },
      });

      timeline
        .from(ref.parentElement, {
          y: isMatch.value ? "300px" : "50px",
        })
        .from(
          ref,
          {
            autoAlpha: 0.4,
            x: isMatch.value ? "30px" : "",
          },
          "<"
        )
        .from(
          texts[i],
          {
            x: isMatch.value ? "-15px" : "",
          },
          "<"
        );
    });
  });
};
