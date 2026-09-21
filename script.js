const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const countdown = document.querySelector('#countdown');
const weddingDate = new Date(countdown?.dataset.date ?? '2026-11-14T11:00:00+05:30');

function updateCountdown() {
  const difference = weddingDate.getTime() - Date.now();
  const remaining = Math.max(0, difference);
  const units = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining / 3600000) % 24),
    minutes: Math.floor((remaining / 60000) % 60),
    seconds: Math.floor((remaining / 1000) % 60),
  };

  Object.entries(units).forEach(([unit, value]) => {
    const element = countdown?.querySelector(`[data-unit="${unit}"]`);
    if (element) element.textContent = String(value).padStart(2, '0');
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);
