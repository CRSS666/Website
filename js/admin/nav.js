const pageContainer = document.querySelector('.pageContainer');

window.history.pushState({}, '', '#/');

window.addEventListener('hashchange', () => {
  let uri = window.location.href.split('#')[1];

  if (!window.location.href.includes('#'))
    uri = '/admin#/'

  const allActiveLinks = document.querySelectorAll('.nav a.active');
  const allLinksWithThisUrl = document.querySelectorAll(`.nav a[href="#${uri}"]`);

  allActiveLinks.forEach(activeLink => {
    activeLink.classList.remove('active');
    activeLink.classList.add('link-body-emphasis');
  });

  allLinksWithThisUrl.forEach(link => {
    link.classList.add('active');
    link.classList.remove('link-body-emphasis');
  });

  changePage(window.location.href.split('#')[1].replace('/', ''));
});

const changePage = (url) => {
  if (!url)
    url = 'dashboard';

  pageContainer.innerHTML = `<i class="loader" data-lucide="loader-circle"></i>`;

  pageContainer.classList.add('d-flex');
  pageContainer.classList.add('align-items-center');
  pageContainer.classList.add('justify-content-center');

  lucide.createIcons();

  fetch(`/admin/__data/page/${url}`)
    .then(res => res.text())
    .then(html => {
      pageContainer.innerHTML = html;

      pageContainer.classList.remove('d-flex');
      pageContainer.classList.remove('align-items-center');
      pageContainer.classList.remove('justify-content-center');

      lucide.createIcons();
    });
};