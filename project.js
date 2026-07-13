import { supabase, getProjectById, getComments, addComment, signUp, signIn, signOut, getCurrentUser } from './supabase.js';

// ---- Parámetro URL ----
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// ---- Lightbox ----
function openLightbox(images, startIndex) {
  let lb = document.getElementById('lightbox');
  if (lb) lb.remove();

  let current = startIndex;

  lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.className = 'lightbox';
  lb.innerHTML = `
    <div class="lightbox-overlay"></div>
    <div class="lightbox-inner">
      <button class="lightbox-close" aria-label="Cerrar">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <button class="lightbox-nav lb-prev" aria-label="Anterior">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div class="lightbox-img-wrap">
        <img id="lb-img" class="lightbox-img" src="" alt="" />
      </div>
      <button class="lightbox-nav lb-next" aria-label="Siguiente">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <div class="lightbox-counter">
        <span id="lb-current">1</span> / <span id="lb-total">${images.length}</span>
      </div>
    </div>
  `;
  document.body.appendChild(lb);

  const img = lb.querySelector('#lb-img');
  const counter = lb.querySelector('#lb-current');

  function showImage(idx) {
    current = (idx + images.length) % images.length;
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95)';
    setTimeout(() => {
      img.src = images[current];
      img.alt = `Imagen ${current + 1}`;
      counter.textContent = current + 1;
      img.style.opacity = '1';
      img.style.transform = 'scale(1)';
    }, 150);
    lb.querySelector('.lb-prev').style.display = images.length <= 1 ? 'none' : '';
    lb.querySelector('.lb-next').style.display = images.length <= 1 ? 'none' : '';
  }

  function closeLightbox() {
    lb.style.opacity = '0';
    setTimeout(() => lb.remove(), 250);
  }

  showImage(current);
  requestAnimationFrame(() => { lb.style.opacity = '1'; });

  lb.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
  lb.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lb.querySelector('.lb-prev').addEventListener('click', () => showImage(current - 1));
  lb.querySelector('.lb-next').addEventListener('click', () => showImage(current + 1));

  // Teclado: ← → Esc
  function onKey(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(current - 1);
    if (e.key === 'ArrowRight') showImage(current + 1);
  }
  document.addEventListener('keydown', onKey);
  lb.addEventListener('remove', () => document.removeEventListener('keydown', onKey));

  // Swipe táctil
  let touchStartX = 0;
  lb.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) showImage(diff > 0 ? current + 1 : current - 1);
  });
}

// ---- Carousel ----
function initCarousel(images) {
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');
  track.innerHTML = '';
  dotsContainer.innerHTML = '';

  if (!images || images.length === 0) {
    document.getElementById('project-carousel').style.display = 'none';
    return;
  }

  images.forEach((url, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.innerHTML = `<img src="${url}" alt="Imagen ${i + 1}" loading="lazy" />`;
    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Imagen ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  let current = 0;
  const dots = dotsContainer.querySelectorAll('.carousel-dot');

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, images.length - 1));
    const slideWidth = track.parentElement.offsetWidth;
    track.scrollTo({ left: current * slideWidth, behavior: 'smooth' });
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === images.length - 1;
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  goTo(0);

  // Clic en imagen → abrir lightbox
  track.querySelectorAll('img').forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(images, i));
  });
}

// ---- Render proyecto ----
function renderProject(project) {
  document.title = `${project.title} – GamingNET`;
  document.getElementById('project-title').textContent = project.title;

  const dateEl = document.getElementById('project-date');
  const dateStr = project.created_at
    ? new Date(project.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';
  dateEl.textContent = dateStr;

  const tagsContainer = document.getElementById('project-tags');
  tagsContainer.innerHTML = '';
  if (Array.isArray(project.tags)) {
    project.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = tag;
      tagsContainer.appendChild(span);
    });
  }

  const descEl = document.getElementById('project-description');
  descEl.innerHTML = project.description
    ? `<p>${project.description.replace(/\n/g, '<br>')}</p>`
    : '<p style="color:var(--text-secondary)">Sin descripción.</p>';

  initCarousel(project.image_urls);

  // Botones de descarga
  const driveBtn = document.getElementById('link-drive');
  const mediaBtn = document.getElementById('link-mediafire');
  const provider = project.download_provider || 'both';

  driveBtn.classList.remove('disabled');
  mediaBtn.classList.remove('disabled');
  driveBtn.querySelector('.btn-text').textContent = 'Google Drive';
  mediaBtn.querySelector('.btn-text').textContent = 'MediaFire';

  if (provider === 'drive') {
    driveBtn.href = project.drive_url || '#';
    mediaBtn.classList.add('disabled');
    mediaBtn.querySelector('.btn-text').textContent = 'No disponible';
    mediaBtn.removeAttribute('href');
  } else if (provider === 'mediafire') {
    mediaBtn.href = project.mediafire_url || '#';
    driveBtn.classList.add('disabled');
    driveBtn.querySelector('.btn-text').textContent = 'No disponible';
    driveBtn.removeAttribute('href');
  } else {
    driveBtn.href = project.drive_url || '#';
    mediaBtn.href = project.mediafire_url || '#';
  }
}

// ---- Comentarios ----
async function loadComments(projectId) {
  const list = document.getElementById('comments-list');
  list.innerHTML = '<p class="loading-comments">Cargando comentarios...</p>';
  try {
    const comments = await getComments(projectId);
    list.innerHTML = '';
    if (comments.length === 0) {
      list.innerHTML = '<p class="no-comments">Sé el primero en comentar 💬</p>';
      return;
    }
    comments.forEach(c => {
      const initials = (c.user_name || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
      const div = document.createElement('div');
      div.className = 'comment';
      div.innerHTML = `
        <div class="avatar">${initials}</div>
        <div class="comment-body">
          <div class="comment-header">
            <strong class="comment-author">${c.user_name}</strong>
            <small class="comment-date">${new Date(c.created_at).toLocaleString('es-ES')}</small>
          </div>
          <p class="comment-text">${c.content}</p>
        </div>
      `;
      list.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    list.innerHTML = '<p style="color:var(--neon-orange)">Error al cargar comentarios.</p>';
  }
}

// ---- Auth UI ----
function renderAuthSection(user, projectId) {
  const authDiv = document.getElementById('auth-section');

  if (user) {
    const initials = ((user.user_metadata?.full_name || user.email) || '?')
      .split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const displayName = user.user_metadata?.full_name || user.email.split('@')[0];

    authDiv.innerHTML = `
      <div class="auth-user-bar">
        <div class="avatar avatar-sm">${initials}</div>
        <span class="auth-username">Comentando como <strong>${displayName}</strong></span>
        <button id="signout-btn" class="btn-signout">Cerrar sesión</button>
      </div>
      <form id="comment-form" class="comment-form">
        <textarea id="comment-content" rows="3" placeholder="Escribe tu comentario aquí..." required></textarea>
        <div class="comment-form-actions">
          <button type="submit" class="btn-submit-comment">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Publicar comentario
          </button>
        </div>
      </form>
    `;

    document.getElementById('signout-btn').addEventListener('click', async () => {
      await signOut();
      location.reload();
    });

    document.getElementById('comment-form').addEventListener('submit', async e => {
      e.preventDefault();
      const content = document.getElementById('comment-content').value.trim();
      if (!content) return;
      const btn = e.target.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Publicando...';
      try {
        await addComment(projectId, content);
        document.getElementById('comment-content').value = '';
        await loadComments(projectId);
      } catch (err) {
        alert('Error al publicar el comentario: ' + err.message);
      } finally {
        btn.disabled = false;
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Publicar comentario`;
      }
    });

  } else {
    authDiv.innerHTML = `
      <div class="auth-panel">
        <div class="auth-tabs">
          <button class="auth-tab active" data-tab="login">Iniciar sesión</button>
          <button class="auth-tab" data-tab="register">Crear cuenta</button>
        </div>

        <!-- Login -->
        <form id="login-form" class="auth-form active">
          <div class="form-group">
            <label for="login-email">Correo electrónico</label>
            <input type="email" id="login-email" placeholder="tu@correo.com" required autocomplete="email" />
          </div>
          <div class="form-group">
            <label for="login-pass">Contraseña</label>
            <input type="password" id="login-pass" placeholder="••••••••" required autocomplete="current-password" />
          </div>
          <p id="login-error" class="form-error hidden"></p>
          <button type="submit" class="btn-auth-submit">
            Entrar
          </button>
        </form>

        <!-- Registro -->
        <form id="register-form" class="auth-form">
          <div class="form-group">
            <label for="reg-name">Nombre</label>
            <input type="text" id="reg-name" placeholder="Tu nombre" required autocomplete="name" />
          </div>
          <div class="form-group">
            <label for="reg-email">Correo electrónico</label>
            <input type="email" id="reg-email" placeholder="tu@correo.com" required autocomplete="email" />
          </div>
          <div class="form-group">
            <label for="reg-pass">Contraseña</label>
            <input type="password" id="reg-pass" placeholder="Mínimo 6 caracteres" required autocomplete="new-password" minlength="6" />
          </div>
          <p id="register-error" class="form-error hidden"></p>
          <p id="register-success" class="form-success hidden"></p>
          <button type="submit" class="btn-auth-submit">
            Crear cuenta
          </button>
        </form>
      </div>
    `;

    // Tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`${tab.dataset.tab}-form`).classList.add('active');
      });
    });

    // Login submit
    document.getElementById('login-form').addEventListener('submit', async e => {
      e.preventDefault();
      const errEl = document.getElementById('login-error');
      errEl.classList.add('hidden');
      const btn = e.target.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Entrando...';
      try {
        await signIn(
          document.getElementById('login-email').value.trim(),
          document.getElementById('login-pass').value
        );
        location.reload();
      } catch (err) {
        errEl.textContent = 'Correo o contraseña incorrectos.';
        errEl.classList.remove('hidden');
        btn.disabled = false;
        btn.textContent = 'Entrar';
      }
    });

    // Register submit
    document.getElementById('register-form').addEventListener('submit', async e => {
      e.preventDefault();
      const errEl = document.getElementById('register-error');
      const successEl = document.getElementById('register-success');
      errEl.classList.add('hidden');
      successEl.classList.add('hidden');
      const btn = e.target.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Creando cuenta...';
      try {
        await signUp(
          document.getElementById('reg-name').value.trim(),
          document.getElementById('reg-email').value.trim(),
          document.getElementById('reg-pass').value
        );
        successEl.textContent = '✅ Cuenta creada. Ahora inicia sesión.';
        successEl.classList.remove('hidden');
        // Cambiar a pestaña login
        setTimeout(() => {
          document.querySelector('[data-tab="login"]').click();
        }, 1500);
      } catch (err) {
        errEl.textContent = err.message || 'Error al crear la cuenta.';
        errEl.classList.remove('hidden');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Crear cuenta';
      }
    });
  }
}

// ---- Init ----
(async function init() {
  const projectId = getParam('id');
  if (!projectId) {
    document.body.innerHTML = '<p style="color:white;padding:4rem;text-align:center">No se especificó ningún proyecto.</p>';
    return;
  }

  try {
    const project = await getProjectById(projectId);
    renderProject(project);
    const user = await getCurrentUser();
    renderAuthSection(user, Number(projectId));
    await loadComments(Number(projectId));
  } catch (err) {
    console.error(err);
    document.getElementById('project-title').textContent = 'Error al cargar el proyecto';
  }
})();
