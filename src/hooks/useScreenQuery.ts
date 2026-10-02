import { ref } from "vue";

export const useScreenQuery = (query: string) => {
  const isMatch = ref(false);

  // there is no screen to query while prerendering
  if (import.meta.env.SSR) return { isMatch };

  const screenQuery = window.matchMedia(query);
  isMatch.value = screenQuery.matches;

  screenQuery.onchange = ({ matches }) => {
    isMatch.value = matches;
  };
  return { isMatch };
};
