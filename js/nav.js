const $ = selector => document.querySelector(selector);

const navToggle = $(".navToggle");
const menu = $(".pageNav > .container");

navToggle.onclick = () => {
  const menuToggled = menu.classList.contains("opened");

  if (menuToggled) {
    menu.classList.remove("opened");
  } else {
    menu.classList.add("opened");
  }

  navToggle.innerHTML = menuToggled ? "Menu" : "Close";
}

window.addEventListener("transitionBuffering", () => menu.classList.remove("opened"));