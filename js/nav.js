const $ = selector => document.querySelector(selector);

const navToggle = $(".Nav-Toggle");
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