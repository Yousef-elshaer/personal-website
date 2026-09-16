document.getElementById('year').textContent = new Date().getFullYear();
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('.motion-toggle');
const names = [...document.querySelectorAll('[data-name]')];
const role = document.getElementById('typed-role');
const roles = ['Computer Science Student', 'Cybersecurity Focused', 'Building Security Tools'];
const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
let userPaused = false;
try { userPaused = localStorage.getItem('portfolio-motion-paused') === 'true'; } catch {}
const timers = new Set();
let observer;
function later(callback, delay) {
  const timer = setTimeout(() => { timers.delete(timer); callback(); }, delay);
  timers.add(timer);
}
function typeText(element, text, next, speed = 65) {
  let index = 0;
  element.textContent = '';
  function tick() {
    element.textContent = text.slice(0, ++index);
    if (index < text.length) later(tick, speed);
    else if (next) next();
  }
  tick();
}
function rotateRole(index = 0) {
  typeText(role, roles[index], () => later(() => {
    function erase() {
      role.textContent = role.textContent.slice(0, -1);
      if (role.textContent) later(erase, 32);
      else later(() => rotateRole((index + 1) % roles.length), 250);
    }
    erase();
  }, 2200));
}
function updateMotion() {
  timers.forEach(clearTimeout);
  timers.clear();
  observer?.disconnect();
  const paused = userPaused || reducedMotion.matches;
  document.documentElement.classList.toggle('motion-paused', paused);
  document.querySelectorAll('.will-reveal').forEach(el => el.classList.remove('will-reveal'));
  names.forEach(el => { el.textContent = el.dataset.name; });
  role.textContent = 'Cybersecurity Focused';
  motionButton.hidden = reducedMotion.matches;
  motionButton.textContent = paused ? 'Play animations' : 'Pause animations';
  motionButton.setAttribute('aria-pressed', String(paused));
  if (paused) return;
  names.forEach(el => { el.textContent = ''; });
  later(() => typeText(names[0], names[0].dataset.name, () => {
    later(() => typeText(names[1], names[1].dataset.name, null, 105), 150);
  }, 105), 200);
  rotateRole();
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('will-reveal');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.section-heading, .about-intro, .facts, .project-card, .skill-group, .experience-row, .contact-actions').forEach(el => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('will-reveal');
        observer.observe(el);
      }
    });
  }
}
motionButton.addEventListener('click', () => {
  userPaused = !userPaused;
  try { localStorage.setItem('portfolio-motion-paused', String(userPaused)); } catch {}
  updateMotion();
});
reducedMotion.addEventListener?.('change', updateMotion);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { timers.forEach(clearTimeout); timers.clear(); }
  else updateMotion();
});

if ('IntersectionObserver' in window) {
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.removeAttribute('aria-current'));
      document.querySelector(`nav a[href="#${entry.target.id}"]`)?.setAttribute('aria-current', 'page');
    });
  }, { rootMargin: '-35% 0px -55%', threshold: 0 });
  sections.forEach(section => navObserver.observe(section));
}
updateMotion();
