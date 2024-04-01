/*
 *  Myadeleines' Simple Page Transition Script. "Trans" for short. :trol:
 *  Making CSS-powered animated transitions between pages possible.
 *
 *  Licensed under the Apache License. Please refer to the LICENSE file.
 */

const transitionBufferingEvent = new Event("transitionBuffering");
const transitionStartEvent = new Event("transitionStart");
const transitionEndEvent = new Event("transitionEnd");
const $ = selector => document.querySelector(selector);
const parser = new DOMParser();
const mainElement = $("main");

export function enableTransition( hyperlinkElement ) {
  hyperlinkElement.addEventListener("click", event => {
    event.preventDefault(); // Browser won't load the page when the hyperlink is pressed.

    loadURL(hyperlinkElement.href, true, hyperlinkElement);
  });
}

function loadURL( targetedURL, updateURL, hyperlinkElement ) {
  const activeHyperlink = $(".pageNav .active");

  mainElement.classList.add("buffering");
  window.dispatchEvent(transitionBufferingEvent);

  fetch(targetedURL + "?reduced")
    .catch(error => {
      console.log(error);
      alert(error);
      mainElement.classList.remove("buffering");
    })
    .then(response => response.text().then( fetchedPage => {
      fetchedPage = parser.parseFromString(fetchedPage, "text/html");
      fetchedPage = {
        content: fetchedPage.querySelector("main").innerHTML,
        title: fetchedPage.querySelector("title").innerHTML,
      }

      if (activeHyperlink) activeHyperlink.classList.remove("active");
      if (hyperlinkElement) hyperlinkElement.classList.add("active");

      if (updateURL) history.pushState({}, fetchedPage.title, targetedURL);
      $("title").innerHTML = fetchedPage.title;

      mainElement.classList.remove("buffering");
      mainElement.classList.add("transition");

      let transitionDuration = getComputedStyle(mainElement).transitionDuration;
      transitionDuration = parseFloat(transitionDuration) * 1000;
      
      window.dispatchEvent(transitionStartEvent);

      setTimeout(() => {
        mainElement.innerHTML = fetchedPage.content;
        mainElement.classList.remove("transition");
        window.dispatchEvent(transitionEndEvent);
      }, transitionDuration);
    }));
}

window.addEventListener("popstate", Event => {
  loadURL(window.location.href, false)
});