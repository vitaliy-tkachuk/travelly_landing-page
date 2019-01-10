/* eslint-disable no-alert */
/* eslint-disable func-names */

// Adding click event to hamburger button and menu items,
// that will open/close off-canvas menu.
const triggers = document.querySelectorAll('.main-nav__item>a, .hamburger');

Array.from(triggers).forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.hamburger').classList.toggle('active');
    document.querySelector('.main-nav__list').classList.toggle('open');
  });
});
