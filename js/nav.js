const $ = selector => document.querySelector(selector);

const navToggle = $(".navToggle");
const menu = $(".pageNav > .container");

navToggle.onclick = () => {
  const menuToggled = menu.classList.contains("openned");

  if (menuToggled) {
    menu.classList.remove("openned");
  } else {
    menu.classList.add("openned");
  }

  navToggle.innerHTML = menuToggled ? "Menu" : "Close";
}

window.addEventListener("transitionBuffering", () => menu.classList.remove("openned"));