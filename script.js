(() => {
  'use strict';
  document.getElementById('year').textContent = String(new Date().getFullYear());

  const menuButton = document.getElementById('menuButton');
  const mobileNav = document.getElementById('mobileNav');
  const closeMenu = () => {
    mobileNav.classList.remove('is-open');
    mobileNav.inert = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Открыть меню');
    document.body.classList.remove('menu-open');
  };
  menuButton.addEventListener('click', () => {
    if (menuButton.getAttribute('aria-expanded') === 'true') return closeMenu();
    mobileNav.inert = false;
    mobileNav.classList.add('is-open');
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Закрыть меню');
    document.body.classList.add('menu-open');
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); }
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 780) closeMenu(); });

  const toast = document.getElementById('toast');
  let timeout;
  document.getElementById('copyEmail').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('anton20001701@yandex.ru');
      toast.textContent = 'Email скопирован';
    } catch (_) {
      toast.textContent = 'Скопируйте адрес из ссылки рядом';
    }
    toast.classList.add('is-visible');
    clearTimeout(timeout);
    timeout = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  });
})();
