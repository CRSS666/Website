import { enableTransition } from "/js/trans.js";

function enableLinks() {
	document.querySelectorAll(".transitionEnabled").forEach( hyperlinkElement => {
		enableTransition(hyperlinkElement);
		hyperlinkElement.classList.remove("transitionEnabled");
	});
}

enableLinks();

window.addEventListener("transitionEnd", enableLinks);

