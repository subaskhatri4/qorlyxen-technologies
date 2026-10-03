// Only published projects are read here. Owner login and editing happen in Project Studio.
const PROJECT_STUDIO = ''; // Filled with the verified live Studio address after publication.

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav-links');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('open', open); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
document.querySelector('#year').textContent = new Date().getFullYear();
function projectUrl(value, image = false, base = window.location.href) {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const result = new URL(value, base);
    if (['http:', 'https:'].includes(result.protocol) && !result.username && !result.password) return result.href;
    if (image && window.location.protocol === 'file:' && !value.includes(':') && !value.startsWith('//')) return result.href;
  } catch { /* Invalid destinations are not shown as links. */ }
  return null;
}

function renderProjects(projects) {
  const grid = document.querySelector('#projects-grid');
  const empty = document.querySelector('#projects-empty');
  if (!grid || !empty) return;
  const entries = Array.isArray(projects) ? projects.filter(project => project && typeof project.title === 'string' && project.title.trim()) : [];
  grid.replaceChildren();
  empty.hidden = entries.length > 0;
  grid.hidden = entries.length === 0;
  entries.forEach(project => {
    const card = document.createElement('article');
    card.className = 'project-card';
    const preview = document.createElement('div');
    preview.className = 'project-preview';
    const label = document.createElement('span');
    label.className = 'project-preview-label';
    label.textContent = project.category || 'Project';
    preview.append(label);
    const image = projectUrl(project.image, true, PROJECT_STUDIO || window.location.href);
    if (image) {
      const picture = document.createElement('img');
      picture.alt = project.title + ' project preview';
      picture.loading = 'lazy';
      picture.addEventListener('error', () => picture.remove(), { once: true });
      picture.src = image;
      preview.append(picture);
    }
    const details = document.createElement('div');
    details.className = 'project-details';
    const category = document.createElement('p');
    category.className = 'eyebrow';
    category.textContent = project.category || 'Project';
    const title = document.createElement('h3');
    title.textContent = project.title;
    details.append(category, title);
    if (project.description) {
      const description = document.createElement('p');
      description.textContent = project.description;
      details.append(description);
    }
    const destination = projectUrl(project.url);
    if (destination) {
      const link = document.createElement('a');
      link.className = 'text-link';
      link.textContent = 'View project';
      link.href = destination;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      details.append(link);
    }
    card.append(preview, details);
    grid.append(card);
  });
}
const projectsStatus = document.createElement('p');
projectsStatus.className = 'projects-status';
projectsStatus.setAttribute('role', 'status');
const projectsRetry = document.createElement('button');
projectsRetry.className = 'button secondary';
projectsRetry.textContent = 'Try again';
projectsRetry.hidden = true;
document.querySelector('#projects-grid').before(projectsStatus, projectsRetry);
projectsRetry.addEventListener('click', loadProjects);
async function loadProjects() {
  if (!PROJECT_STUDIO) { renderProjects([]); projectsStatus.textContent = ''; return; }
  document.querySelector('#projects-empty').hidden = true;
  projectsRetry.hidden = true;
  projectsStatus.textContent = 'Loading projects…';
  try {
    const response = await fetch(PROJECT_STUDIO + '/_api/public/content', { credentials: 'omit', cache: 'no-store', signal: AbortSignal.timeout(12000) });
    if (!response.ok) throw new Error('Project service is unavailable');
    const data = await response.json();
    if (!Array.isArray(data.projects)) throw new Error('Invalid project response');
    applyWebsiteContent(data);
    renderProjects(data.projects);
    projectsStatus.textContent = '';
  } catch {
    projectsStatus.textContent = 'Projects are temporarily unavailable. Please try again.';
    projectsRetry.hidden = false;
  }
}
function websiteLink(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  const link = value.trim();
  if (/^#[a-zA-Z0-9_-]*$/.test(link) || /^tel:\+?[0-9 -]{5,20}$/.test(link) || /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/.test(link)) return link;
  try { const url = new URL(link); if (url.protocol === 'https:' && !url.username && !url.password) return url.href; } catch {}
  return null;
}
function applyWebsiteContent(data) {
  if (!data.values || typeof data.values !== 'object') return;
  document.querySelectorAll('[data-copy]').forEach(element => {
    const value = data.values[element.dataset.copy];
    if (typeof value === 'string') element.textContent = (element.dataset.before || '') + value + (element.dataset.after || '');
  });
  document.querySelectorAll('[data-link]').forEach(element => {
    const value = data.values[element.dataset.link];
    if (typeof value !== 'string') return;
    const link = websiteLink(value);
    if (link) { element.href = link; element.removeAttribute('aria-disabled'); }
    else { element.removeAttribute('href'); element.setAttribute('aria-disabled', 'true'); }
  });
  if (typeof data.values['page-title'] === 'string') document.title = data.values['page-title'];
  if (typeof data.values['page-description'] === 'string') document.querySelector('meta[name="description"]').content = data.values['page-description'];
  const photo = document.querySelector('#founder-photo');
  const monogram = document.querySelector('.founder-monogram');
  const photoUrl = projectUrl(data.founderImage, true, PROJECT_STUDIO || window.location.href);
  if (photo) {
    const name = document.querySelector('[data-copy="about-and-founder-text-002"]')?.textContent.trim() || '';
    const role = document.querySelector('[data-copy="about-and-founder-text-003"]')?.textContent.trim() || '';
    photo.alt = [name, role].filter(Boolean).join(', ') || 'Founder portrait';
    if (monogram && name && monogram.firstChild?.nodeType === Node.TEXT_NODE) {
      monogram.firstChild.textContent = name.split(/\s+/).slice(0, 2).map(word => [...word][0]).join('').toLocaleUpperCase();
    }
    photo.onerror = null;
    if (photoUrl) {
      photo.onerror = () => { photo.hidden = true; if (monogram) monogram.hidden = false; };
      photo.src = photoUrl; photo.hidden = false; if (monogram) monogram.hidden = true;
    } else {
      photo.hidden = true; photo.removeAttribute('src'); if (monogram) monogram.hidden = false;
    }
  }
}
if (PROJECT_STUDIO) document.querySelectorAll('[data-owner-login]').forEach(link => { link.href = PROJECT_STUDIO + '/admin'; link.hidden = false; });
loadProjects();
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.08 });
  document.querySelectorAll('.section-heading, .service-card, .project-card, .principles article, .process-grid article, .about-copy').forEach(element => { element.classList.add('reveal'); observer.observe(element); });
}
