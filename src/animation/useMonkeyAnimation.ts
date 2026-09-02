import { useScreenQuery } from "@/hooks/useScreenQuery";
import gsap from "gsap";
import { onMounted, onUnmounted } from "vue";

/**
 * `scrub` ramps up per section so later frames trail the scroll a little more.
 * Past ~1s the catch-up reads as lag rather than smoothing, so cap it. With 12
 * sections the raw ramp would reach 2.2s on the last one.
 */
const MAX_SCRUB = 1;

export const useMonkeyAnimation = () => {
  const timelines: gsap.core.Timeline[] = [];

  onMounted(() => {
    // useScreenQuery returns refs, so always read `.value`. A ref object is
    // truthy even when its query does not match.
    const { isMatch: prefersReduced } = useScreenQuery(
      "(prefers-reduced-motion)"
    );

    if (prefersReduced.value) return;

    const frames: HTMLElement[] = gsap.utils.toArray(".monkey-wrapper");
    const texts: HTMLElement[] = gsap.utils.toArray(".monkey-header");

    if (!frames.length) return;

    const { isMatch } = useScreenQuery("(min-width: 550px)");
    const isWide = isMatch.value;

    // create some space between the frames and the footer
    gsap.set(frames[frames.length - 1].parentElement, { marginBottom: "15vh" });

    frames.forEach((ref, i) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          // start "-=300 center": 300px before the frame's top reaches the
          // middle of the viewport. end "-=100 +=200": 300px before the
          // frame's top reaches the top of the viewport, so each timeline
          // completes half a viewport after it starts, well before the
          // section scrolls away.
          start: i ? "-=300 center" : "top center",
          end: i ? "-=100 +=200" : "bottom +=100",
          trigger: ref,
          scrub: Math.min(i * 0.2, MAX_SCRUB),
        },
      });

      timelines.push(timeline);

      // Lift the section's children rather than the section itself. The
      // section is what the nav buttons scroll to and what ScrollTrigger
      // measures, so translating it makes it overlap the controls below and
      // sends scrollIntoView to a position it no longer occupies. Moving the
      // contents looks identical and leaves the section's box where it is.
      const contents = ref.parentElement
        ? [...ref.parentElement.children].filter(
            (child): child is HTMLElement =>
              child instanceof HTMLElement && !child.classList.contains("load-trigger")
          )
        : [];

      if (!i) {
        // the lead-in frame only gets the parallax lift, being the first
        // thing below the hero, so it should not fade in as well
        timeline.from(contents, {
          y: isWide ? "150px" : "50px",
        });
        return;
      }

      timeline
        .from(contents, {
          y: isWide ? "300px" : "50px",
        })
        .from(
          ref,
          // no horizontal drift on narrow screens, where there is no room
          isWide ? { autoAlpha: 0.4, x: "30px" } : { autoAlpha: 0.4 },
          "<"
        );

      if (isWide && texts[i]) {
        timeline.from(texts[i], { x: "-15px" }, "<");
      }
    });
  });

  onUnmounted(() => {
    // killing the timeline also kills its ScrollTrigger, so revisiting the
    // route does not stack a second set of triggers on detached elements
    timelines.forEach((timeline) => timeline.kill());
    timelines.length = 0;
  });
};
