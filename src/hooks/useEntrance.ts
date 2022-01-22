import { reactive } from "vue";

export const useEntrance = () => {
  if (sessionStorage.entrance) return;
  sessionStorage.entrance = "played";
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const pos = reactive({ x: 0, y: 0 });

  const theme = {
    dark: "#0c001a,#1b0d22,#291429,#381a2f,#472134,#562838,#65303a,#72393c,#7f443d,#89503d,#925c3e,#996a3f",
    light:
      "#a8b2e6,#afb2e6,#c0b3e4,#d5b6e0,#e9bbd9,#f8c4d1,#ffcfcd,#ffdbce,#ffe7d3,#fef0db,#fdf6e1,#fdf8e4",
  };

  const conic = (colors: string, x: number, y: number) =>
    `conic-gradient(from 90deg at ${x}% ${y}%,${colors}) no-repeat`;

  const interval: NodeJS.Timer = setInterval(() => {
    const root = document.documentElement;

    if (pos.x > 100) {
      root.style.removeProperty("--color-background");
      return clearInterval(interval);
    }
    root.style.setProperty(
      "--color-background",
      conic(isDark ? theme.dark : theme.light, pos.x++, pos.y)
    );
  }, 30);

  return pos;
};
