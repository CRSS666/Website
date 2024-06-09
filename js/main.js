const $  = _ => document.querySelector(_);
const $$ = _ => document.querySelectorAll(_);

const dropDowns = $$('.dropDown');

dropDowns.forEach(dropDown => {
  dropDown.children[0].addEventListener('click', () => {
    dropDown.classList.toggle('open');
  });
});

// ------------ //

const navBar      = $('.navBar');
const navToggle   = $('.navToggle');
const navCollapse = $('.navCollapse');

navToggle.addEventListener('click', () => {
  navBar.classList.toggle('navOpen');

  navToggle.innerHTML = navBar.classList.contains('navOpen') ?
    '<svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-x icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>' :
    '<svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-menu icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>';
});