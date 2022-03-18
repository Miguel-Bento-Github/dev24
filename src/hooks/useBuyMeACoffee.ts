import { onMounted } from "vue";

const addBuyMeCoffeeKeyboardShortcut = () => {
  const coffeeBtn = document.getElementById("bmc-wbtn");
  const frame = document.querySelector("[title='Buy Me a Coffee']");

  if (!coffeeBtn) return;

  frame?.parentElement?.setAttribute("aria-hidden", "true");
  coffeeBtn.setAttribute("aria-label", "Buy me a coffee button");
  coffeeBtn.setAttribute("role", "button");
  coffeeBtn.setAttribute("tabIndex", "0");
  coffeeBtn.classList.add("buy-coffee");

  coffeeBtn.addEventListener("keyup", ({ code }) => {
    if (code === "Space") coffeeBtn.click();
  });
};

export const useBuyMeACoffee = () => {
  onMounted(() => {
    setTimeout(addBuyMeCoffeeKeyboardShortcut, 50);
  });
};
