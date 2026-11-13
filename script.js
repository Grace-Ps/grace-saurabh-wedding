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

const GUESTBOOK_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzG-vf7m195v6-cRtMKOKZgr-oJxvUjeP9a7JRZBXt7VP4UnSJ5Xd7-N9ayVvbm6PC_/exec';

const guestbookModal = document.getElementById('guestbook-modal');
const guestbookForm = document.getElementById('guestbook-form');
const guestbookClose = document.querySelector('.guestbook-close');
const guestbookFeedback = document.getElementById('guestbook-feedback');
const wishesLink = document.querySelector('.footer-wishes-link');
const guestbookResponseFrame = document.querySelector('iframe[name="guestbook-response-frame"]');
let guestbookTimeout;

if (wishesLink && guestbookModal) {
  wishesLink.addEventListener('click', (event) => {
    event.preventDefault();
    guestbookModal.classList.add('is-open');
    guestbookModal.setAttribute('aria-hidden', 'false');
    guestbookForm.hidden = false;
    guestbookClose.hidden = false;
    guestbookFeedback.hidden = true;
    const firstField = document.getElementById('guest-name');
    firstField?.focus();
  });
}

const closeGuestbook = () => {
  guestbookModal?.classList.remove('is-open');
  guestbookModal?.setAttribute('aria-hidden', 'true');
};

guestbookClose?.addEventListener('click', closeGuestbook);

guestbookModal?.addEventListener('click', (event) => {
  if (event.target === guestbookModal) {
    closeGuestbook();
  }
});

window.addEventListener('message', (event) => {
  if (!/^https:\/\/(?:[a-z0-9-]+-)?script\.googleusercontent\.com$/.test(event.origin)
    || event.data?.source !== 'wedding-guestbook') {
    return;
  }

  window.clearTimeout(guestbookTimeout);
  const submitButton = guestbookForm.querySelector('button[type="submit"]');
  submitButton.disabled = false;

  if (event.data.status === 'saved') {
    guestbookForm.hidden = true;
    guestbookClose.hidden = true;
    guestbookFeedback.textContent = 'Thank you for your lovely wishes. Returning to the invitation...';
    guestbookFeedback.hidden = false;
    window.setTimeout(() => {
      closeGuestbook();
      guestbookForm.reset();
      guestbookForm.hidden = false;
      guestbookClose.hidden = false;
      guestbookFeedback.hidden = true;
      window.location.assign('index.html#top');
    }, 2500);
  } else {
    guestbookFeedback.textContent = 'We could not save your wish. Please check the Sheet connection and try again.';
    guestbookFeedback.hidden = false;
  }
});

guestbookForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const name = String(formData.get('name') || '').trim();
  const message = String(formData.get('message') || '').trim();
  const website = String(formData.get('website') || '').trim();

  if (!message || website) {
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  if (!GUESTBOOK_ENDPOINT) {
    guestbookFeedback.textContent = 'The guestbook is not connected yet. Please try again later.';
    guestbookFeedback.hidden = false;
    submitButton.disabled = false;
    return;
  }

  guestbookFeedback.hidden = true;
  form.action = GUESTBOOK_ENDPOINT;
  form.method = 'post';
  form.target = 'guestbook-response-frame';
  form.submit();

  guestbookTimeout = window.setTimeout(() => {
    guestbookFeedback.textContent = 'We could not confirm that your wish was saved. Please try again later.';
    guestbookFeedback.hidden = false;
    submitButton.disabled = false;
  }, 20000);
});

const countdown = document.querySelector('#countdown');
const weddingDate = new Date(countdown?.dataset.date ?? '2026-11-14T11:30:00+05:30');

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
