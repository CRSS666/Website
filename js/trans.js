/*
 *  Myadeleines' Simple Page Transition Script. "Trans" for short. :trol:
 *  Making CSS-powered animated transitions between pages possible.
 *
 *  Licensed under the Apache License. Please refer to the LICENSE file.
 */

const $ = selector => document.querySelector(selector);
const Parser = new DOMParser();
const MainElement = $("main");

export function EnableTransition( HyperlinkElement ) {
	HyperlinkElement.addEventListener("click", Event => {
		Event.preventDefault(); // Browser won't load the page when the hyperlink is pressed.

		const TargettedURL = HyperlinkElement.href;
		const ActiveHyperlink = $(".pageNav .active");

		MainElement.classList.add("Loading");

		fetch(TargettedURL)
			.catch(Error => {
				console.log(Error);
				MainElement.classList.remove("Loading");
			})
			.then(Response => Response.text().then( FetchedPage => {
				FetchedPage = Parser.parseFromString(FetchedPage, "text/html");
				FetchedPage = {
					Content: FetchedPage.querySelector("main").innerHTML,
					Title: FetchedPage.querySelector("title").innerHTML,
				}


				if (ActiveHyperlink) ActiveHyperlink.classList.remove("active");
				HyperlinkElement.classList.add("active");

				history.pushState({}, FetchedPage.Title, TargettedURL);
				$("title").innerHTML = FetchedPage.Title;

				MainElement.classList.remove("Loading");
				MainElement.classList.add("InTransition");

				let TransitionDuration = getComputedStyle(MainElement).transitionDuration;
				TransitionDuration = parseFloat(TransitionDuration) * 1000;

				console.log(TransitionDuration);

				setTimeout(() => {
					MainElement.innerHTML = FetchedPage.Content;
					MainElement.classList.remove("InTransition");
				}, TransitionDuration);

			}));
	});
}

window.addEventListener("popstate", Event => {
	window.location.href = window.location.href; // Lazy.
});