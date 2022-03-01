import { ref } from "vue";

export const useScreenQuery = (query: string) => {
  const screenQuery = window.matchMedia(query);
  const isMatch = ref(screenQuery.matches);

  screenQuery.onchange = ({ matches }) => {
    isMatch.value = matches;
  };
  return { isMatch };
};
