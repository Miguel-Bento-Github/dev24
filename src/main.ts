import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { buildApp } from "./app";
import { createAppRouter } from "./router";

gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector<HTMLElement>("#app")!;
const router = createAppRouter();

// Only hydrate markup that was prerendered for this route. Anything else, such
// as the dev server's empty shell or a cached home page answering for another
// URL, is rendered from scratch instead.
const { name } = router.resolve(location.pathname);
const hydrate = container.dataset.prerendered === String(name);

const app = buildApp(router, hydrate);

// the route components are lazy, so wait for the first one before mounting
router.isReady().then(() => app.mount(container));
