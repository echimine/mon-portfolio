function toggleMenu() {
  const menu = document.querySelector('.mobile-menu');
  const burger = document.querySelector('.burger');

  menu.classList.toggle('active');
  burger.classList.toggle('active');
}

document.addEventListener('click', function (e) {
  const menu = document.querySelector('.mobile-menu');
  const burger = document.querySelector('.burger');

  const isClickInsideMenu = menu.contains(e.target);
  const isClickOnBurger = burger.contains(e.target);

  // Si le menu est ouvert ET que le clic est en dehors => on ferme
  if (
    menu.classList.contains('active') &&
    !isClickInsideMenu &&
    !isClickOnBurger
  ) {
    menu.classList.remove('active');
    burger.classList.remove('active');
  }
});
