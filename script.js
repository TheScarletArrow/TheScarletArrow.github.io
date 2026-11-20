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

  const tabs = [...document.querySelectorAll('.case-tab')];
  const panels = [...document.querySelectorAll('.case-panel')];
  const activate = (tab, focus = false) => {
    const key = tab.dataset.target;
    tabs.forEach(t => {
      const active = t === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', String(active));
      t.tabIndex = active ? 0 : -1;
    });
    panels.forEach(panel => {
      const active = panel.dataset.panel === key;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      let target = null;
      if (['ArrowRight', 'ArrowDown'].includes(event.key)) target = tabs[(index + 1) % tabs.length];
      if (['ArrowLeft', 'ArrowUp'].includes(event.key)) target = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === 'Home') target = tabs[0];
      if (event.key === 'End') target = tabs[tabs.length - 1];
      if (target) { event.preventDefault(); activate(target, true); }
    });
  });
  panels.forEach(p => { if (!p.classList.contains('is-active')) p.hidden = true; });

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
