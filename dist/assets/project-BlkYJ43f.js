import{a as g,b as p,s as b,c as y,d as v,e as h,f}from"./supabase-BHHwPRoP.js";/* empty css              */function E(e){return new URLSearchParams(window.location.search).get(e)}function x(e,i){let t=document.getElementById("lightbox");t&&t.remove();let r=i;t=document.createElement("div"),t.id="lightbox",t.className="lightbox",t.innerHTML=`
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
        <span id="lb-current">1</span> / <span id="lb-total">${e.length}</span>
      </div>
    </div>
  `,document.body.appendChild(t);const c=t.querySelector("#lb-img"),n=t.querySelector("#lb-current");function o(d){r=(d+e.length)%e.length,c.style.opacity="0",c.style.transform="scale(0.95)",setTimeout(()=>{c.src=e[r],c.alt=`Imagen ${r+1}`,n.textContent=r+1,c.style.opacity="1",c.style.transform="scale(1)"},150),t.querySelector(".lb-prev").style.display=e.length<=1?"none":"",t.querySelector(".lb-next").style.display=e.length<=1?"none":""}function a(){t.style.opacity="0",setTimeout(()=>t.remove(),250)}o(r),requestAnimationFrame(()=>{t.style.opacity="1"}),t.querySelector(".lightbox-overlay").addEventListener("click",a),t.querySelector(".lightbox-close").addEventListener("click",a),t.querySelector(".lb-prev").addEventListener("click",()=>o(r-1)),t.querySelector(".lb-next").addEventListener("click",()=>o(r+1));function l(d){d.key==="Escape"&&a(),d.key==="ArrowLeft"&&o(r-1),d.key==="ArrowRight"&&o(r+1)}document.addEventListener("keydown",l),t.addEventListener("remove",()=>document.removeEventListener("keydown",l));let s=0;t.addEventListener("touchstart",d=>{s=d.touches[0].clientX},{passive:!0}),t.addEventListener("touchend",d=>{const m=s-d.changedTouches[0].clientX;Math.abs(m)>50&&o(m>0?r+1:r-1)})}function L(e){const i=document.getElementById("carousel-track"),t=document.getElementById("carousel-prev"),r=document.getElementById("carousel-next"),c=document.getElementById("carousel-dots");if(i.innerHTML="",c.innerHTML="",!e||e.length===0){document.getElementById("project-carousel").style.display="none";return}e.forEach((l,s)=>{const d=document.createElement("div");d.className="carousel-slide",d.innerHTML=`<img src="${l}" alt="Imagen ${s+1}" loading="lazy" />`,i.appendChild(d);const m=document.createElement("button");m.className="carousel-dot"+(s===0?" active":""),m.setAttribute("aria-label",`Imagen ${s+1}`),m.addEventListener("click",()=>a(s)),c.appendChild(m)});let n=0;const o=c.querySelectorAll(".carousel-dot");function a(l){n=Math.max(0,Math.min(l,e.length-1));const s=i.parentElement.offsetWidth;i.scrollTo({left:n*s,behavior:"smooth"}),o.forEach((d,m)=>d.classList.toggle("active",m===n)),t.disabled=n===0,r.disabled=n===e.length-1}t.addEventListener("click",()=>a(n-1)),r.addEventListener("click",()=>a(n+1)),a(0),i.querySelectorAll("img").forEach((l,s)=>{l.style.cursor="zoom-in",l.addEventListener("click",()=>x(e,s))})}function C(e){document.title=`${e.title} – GamingNET`,document.getElementById("project-title").textContent=e.title;const i=document.getElementById("project-date"),t=e.created_at?new Date(e.created_at).toLocaleDateString("es-ES",{year:"numeric",month:"long",day:"numeric"}):"";i.textContent=t;const r=document.getElementById("project-tags");r.innerHTML="",Array.isArray(e.tags)&&e.tags.forEach(l=>{const s=document.createElement("span");s.className="tag",s.textContent=l,r.appendChild(s)});const c=document.getElementById("project-description");c.innerHTML=e.description?`<p>${e.description.replace(/\n/g,"<br>")}</p>`:'<p style="color:var(--text-secondary)">Sin descripción.</p>',L(e.image_urls);const n=document.getElementById("link-drive"),o=document.getElementById("link-mediafire"),a=e.download_provider||"both";n.classList.remove("disabled"),o.classList.remove("disabled"),n.querySelector(".btn-text").textContent="Google Drive",o.querySelector(".btn-text").textContent="MediaFire",a==="drive"?(n.href=e.drive_url||"#",o.classList.add("disabled"),o.querySelector(".btn-text").textContent="No disponible",o.removeAttribute("href")):a==="mediafire"?(o.href=e.mediafire_url||"#",n.classList.add("disabled"),n.querySelector(".btn-text").textContent="No disponible",n.removeAttribute("href")):(n.href=e.drive_url||"#",o.href=e.mediafire_url||"#")}async function u(e){const i=document.getElementById("comments-list");i.innerHTML='<p class="loading-comments">Cargando comentarios...</p>';try{const t=await f(e);if(i.innerHTML="",t.length===0){i.innerHTML='<p class="no-comments">Sé el primero en comentar 💬</p>';return}t.forEach(r=>{const c=(r.user_name||"?").split(" ").map(o=>o[0]).join("").toUpperCase().slice(0,2),n=document.createElement("div");n.className="comment",n.innerHTML=`
        <div class="avatar">${c}</div>
        <div class="comment-body">
          <div class="comment-header">
            <strong class="comment-author">${r.user_name}</strong>
            <small class="comment-date">${new Date(r.created_at).toLocaleString("es-ES")}</small>
          </div>
          <p class="comment-text">${r.content}</p>
        </div>
      `,i.appendChild(n)})}catch(t){console.error(t),i.innerHTML='<p style="color:var(--neon-orange)">Error al cargar comentarios.</p>'}}function w(e,i){var r,c;const t=document.getElementById("auth-section");if(e){const n=(((r=e.user_metadata)==null?void 0:r.full_name)||e.email||"?").split(" ").map(a=>a[0]).join("").toUpperCase().slice(0,2),o=((c=e.user_metadata)==null?void 0:c.full_name)||e.email.split("@")[0];t.innerHTML=`
      <div class="auth-user-bar">
        <div class="avatar avatar-sm">${n}</div>
        <span class="auth-username">Comentando como <strong>${o}</strong></span>
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
    `,document.getElementById("signout-btn").addEventListener("click",async()=>{await b(),location.reload()}),document.getElementById("comment-form").addEventListener("submit",async a=>{a.preventDefault();const l=document.getElementById("comment-content").value.trim();if(!l)return;const s=a.target.querySelector('button[type="submit"]');s.disabled=!0,s.textContent="Publicando...";try{await y(i,l),document.getElementById("comment-content").value="",await u(i)}catch(d){alert("Error al publicar el comentario: "+d.message)}finally{s.disabled=!1,s.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Publicar comentario'}})}else t.innerHTML=`
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
    `,document.querySelectorAll(".auth-tab").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll(".auth-tab").forEach(o=>o.classList.remove("active")),document.querySelectorAll(".auth-form").forEach(o=>o.classList.remove("active")),n.classList.add("active"),document.getElementById(`${n.dataset.tab}-form`).classList.add("active")})}),document.getElementById("login-form").addEventListener("submit",async n=>{n.preventDefault();const o=document.getElementById("login-error");o.classList.add("hidden");const a=n.target.querySelector('button[type="submit"]');a.disabled=!0,a.textContent="Entrando...";try{await v(document.getElementById("login-email").value.trim(),document.getElementById("login-pass").value),location.reload()}catch{o.textContent="Correo o contraseña incorrectos.",o.classList.remove("hidden"),a.disabled=!1,a.textContent="Entrar"}}),document.getElementById("register-form").addEventListener("submit",async n=>{n.preventDefault();const o=document.getElementById("register-error"),a=document.getElementById("register-success");o.classList.add("hidden"),a.classList.add("hidden");const l=n.target.querySelector('button[type="submit"]');l.disabled=!0,l.textContent="Creando cuenta...";try{await h(document.getElementById("reg-name").value.trim(),document.getElementById("reg-email").value.trim(),document.getElementById("reg-pass").value),a.textContent="✅ Cuenta creada. Ahora inicia sesión.",a.classList.remove("hidden"),setTimeout(()=>{document.querySelector('[data-tab="login"]').click()},1500)}catch(s){o.textContent=s.message||"Error al crear la cuenta.",o.classList.remove("hidden")}finally{l.disabled=!1,l.textContent="Crear cuenta"}})}(async function(){const i=E("id");if(!i){document.body.innerHTML='<p style="color:white;padding:4rem;text-align:center">No se especificó ningún proyecto.</p>';return}try{const t=await g(i);C(t);const r=await p();w(r,Number(i)),await u(Number(i))}catch(t){console.error(t),document.getElementById("project-title").textContent="Error al cargar el proyecto"}})();
