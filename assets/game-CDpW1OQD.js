import{g as E,a as x,b as L,s as w,c as b,d as C,e as k,f as B,h as S,i as I}from"./supabase-L-0F_XPF.js";/* empty css              */function q(e){return new URLSearchParams(window.location.search).get(e)}function $(e,s){let t=document.getElementById("lightbox");t&&t.remove();let a=s;t=document.createElement("div"),t.id="lightbox",t.className="lightbox",t.innerHTML=`
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
  `,document.body.appendChild(t);const c=t.querySelector("#lb-img"),o=t.querySelector("#lb-current");function n(l){a=(l+e.length)%e.length,c.style.opacity="0",c.style.transform="scale(0.95)",setTimeout(()=>{c.src=e[a],c.alt=`Imagen ${a+1}`,o.textContent=a+1,c.style.opacity="1",c.style.transform="scale(1)"},150),t.querySelector(".lb-prev").style.display=e.length<=1?"none":"",t.querySelector(".lb-next").style.display=e.length<=1?"none":""}function r(){t.style.opacity="0",setTimeout(()=>t.remove(),250)}n(a),requestAnimationFrame(()=>{t.style.opacity="1"}),t.querySelector(".lightbox-overlay").addEventListener("click",r),t.querySelector(".lightbox-close").addEventListener("click",r),t.querySelector(".lb-prev").addEventListener("click",()=>n(a-1)),t.querySelector(".lb-next").addEventListener("click",()=>n(a+1));function i(l){l.key==="Escape"&&r(),l.key==="ArrowLeft"&&n(a-1),l.key==="ArrowRight"&&n(a+1)}document.addEventListener("keydown",i),t.addEventListener("remove",()=>document.removeEventListener("keydown",i));let d=0;t.addEventListener("touchstart",l=>{d=l.touches[0].clientX},{passive:!0}),t.addEventListener("touchend",l=>{const m=d-l.changedTouches[0].clientX;Math.abs(m)>50&&n(m>0?a+1:a-1)})}function M(e){const s=document.getElementById("carousel-track"),t=document.getElementById("carousel-prev"),a=document.getElementById("carousel-next"),c=document.getElementById("carousel-dots");if(s.innerHTML="",c.innerHTML="",!e||e.length===0){document.getElementById("game-carousel").style.display="none";return}e.forEach((i,d)=>{const l=document.createElement("div");l.className="carousel-slide",l.innerHTML=`<img src="${i}" alt="Imagen ${d+1}" loading="lazy" />`,s.appendChild(l);const m=document.createElement("button");m.className="carousel-dot"+(d===0?" active":""),m.setAttribute("aria-label",`Imagen ${d+1}`),m.addEventListener("click",()=>r(d)),c.appendChild(m)});let o=0;const n=c.querySelectorAll(".carousel-dot");function r(i){o=Math.max(0,Math.min(i,e.length-1));const d=s.parentElement.offsetWidth;s.scrollTo({left:o*d,behavior:"smooth"}),n.forEach((l,m)=>l.classList.toggle("active",m===o)),t.disabled=o===0,a.disabled=o===e.length-1}t.addEventListener("click",()=>r(o-1)),a.addEventListener("click",()=>r(o+1)),r(0),s.querySelectorAll("img").forEach((i,d)=>{i.style.cursor="zoom-in",i.addEventListener("click",()=>$(e,d))})}function T(e){document.title=`${e.title} – GamingNET`,document.getElementById("game-title").textContent=e.title;const s=document.getElementById("game-date"),t=e.created_at?new Date(e.created_at).toLocaleDateString("es-ES",{year:"numeric",month:"long",day:"numeric"}):"";s.textContent=t;const a=document.getElementById("game-tags");a.innerHTML="",Array.isArray(e.tags)&&e.tags.forEach(i=>{const d=document.createElement("span");d.className="tag",d.textContent=i,a.appendChild(d)});const c=document.getElementById("game-description");c.innerHTML=e.description?`<p>${e.description.replace(/\n/g,"<br>")}</p>`:'<p style="color:var(--text-secondary)">Sin descripción.</p>',M(e.image_urls);const o=document.getElementById("link-drive"),n=document.getElementById("link-mediafire"),r=e.download_provider||"both";o.classList.remove("disabled"),n.classList.remove("disabled"),o.querySelector(".btn-text").textContent="Google Drive",n.querySelector(".btn-text").textContent="MediaFire",r==="drive"?(o.href=e.drive_url||"#",n.classList.add("disabled"),n.querySelector(".btn-text").textContent="No disponible",n.removeAttribute("href")):r==="mediafire"?(n.href=e.mediafire_url||"#",o.classList.add("disabled"),o.querySelector(".btn-text").textContent="No disponible",o.removeAttribute("href")):(o.href=e.drive_url||"#",n.href=e.mediafire_url||"#")}let p=null;async function h(e){const s=document.getElementById("comments-list");s.innerHTML='<p class="loading-comments">Cargando comentarios...</p>';try{const{data:{user:t}}=await B.auth.getUser();p=t;const a=await S(e);if(s.innerHTML="",a.length===0){s.innerHTML='<p class="no-comments">Sé el primero en comentar 💬</p>';return}const c=a.filter(n=>!n.parent_id),o=a.filter(n=>n.parent_id);c.forEach(n=>{const r=o.filter(d=>d.parent_id===n.id),i=_(n,r,e);s.appendChild(i)})}catch(t){console.error(t),s.innerHTML='<p style="color:var(--neon-orange)">Error al cargar comentarios.</p>'}}function _(e,s,t){const a=(e.user_name||"?").split(" ").map(u=>u[0]).join("").toUpperCase().slice(0,2),c=document.createElement("div");c.className="comment-thread";let n=p&&p.id===e.user_id?`<button class="btn-delete-comment" data-id="${e.id}" title="Eliminar"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button>`:"",r="",i="";s.length>0&&(i=`
      <button class="btn-toggle-replies" onclick="this.parentElement.nextElementSibling.classList.toggle('hidden'); this.classList.toggle('open')">
        <svg class="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        ${s.length} respuesta${s.length>1?"s":""}
      </button>
    `,r='<div class="replies-container hidden">',s.forEach(u=>{const y=(u.user_name||"?").split(" ").map(f=>f[0]).join("").toUpperCase().slice(0,2),v=p&&p.id===u.user_id?`<button class="btn-delete-comment" data-id="${u.id}" title="Eliminar"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>`:"";r+=`
        <div class="comment reply">
          <div class="avatar avatar-sm">${y}</div>
          <div class="comment-body">
            <div class="comment-header">
              <strong class="comment-author">${u.user_name}</strong>
              <small class="comment-date">${new Date(u.created_at).toLocaleString("es-ES")}</small>
            </div>
            <p class="comment-text">${u.content}</p>
            <div class="comment-actions">
              ${v}
            </div>
          </div>
        </div>
      `}),r+="</div>"),c.innerHTML=`
    <div class="comment">
      <div class="avatar">${a}</div>
      <div class="comment-body">
        <div class="comment-header">
          <strong class="comment-author">${e.user_name}</strong>
          <small class="comment-date">${new Date(e.created_at).toLocaleString("es-ES")}</small>
        </div>
        <p class="comment-text">${e.content}</p>
        <div class="comment-actions">
          <button class="btn-reply-comment" data-id="${e.id}">Responder</button>
          ${n}
          ${i}
        </div>
        <form class="reply-form hidden" id="reply-form-${e.id}">
          <textarea rows="2" placeholder="Escribe tu respuesta..." required></textarea>
          <div class="reply-actions">
            <button type="button" class="btn-cancel-reply">Cancelar</button>
            <button type="submit" class="btn-submit-reply">Enviar</button>
          </div>
        </form>
      </div>
    </div>
    ${r}
  `;const d=c.querySelector(".btn-reply-comment"),l=c.querySelector(`#reply-form-${e.id}`),m=c.querySelector(".btn-cancel-reply");return d&&d.addEventListener("click",()=>{if(!p)return alert("Debes iniciar sesión para responder.");l.classList.remove("hidden")}),m&&m.addEventListener("click",()=>l.classList.add("hidden")),l&&l.addEventListener("submit",async u=>{u.preventDefault();const y=l.querySelector("textarea").value.trim();if(!y)return;const g=l.querySelector(".btn-submit-reply");g.disabled=!0,g.textContent="...";try{await b(t,y,e.id),await h(t)}catch(v){alert("Error al responder: "+v.message)}}),c.querySelectorAll(".btn-delete-comment").forEach(u=>{u.addEventListener("click",async y=>{if(confirm("¿Estás seguro de que deseas eliminar este comentario?")){const g=u.getAttribute("data-id");try{await I(g),await h(t)}catch(v){alert("Error al eliminar: "+v.message)}}})}),c}function H(e,s){var a,c;const t=document.getElementById("auth-section");if(e){const o=(((a=e.user_metadata)==null?void 0:a.full_name)||e.email||"?").split(" ").map(r=>r[0]).join("").toUpperCase().slice(0,2),n=((c=e.user_metadata)==null?void 0:c.full_name)||e.email.split("@")[0];t.innerHTML=`
      <div class="auth-user-bar">
        <div class="avatar avatar-sm">${o}</div>
        <span class="auth-username">Comentando como <strong>${n}</strong></span>
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
    `,document.getElementById("signout-btn").addEventListener("click",async()=>{await w(),location.reload()}),document.getElementById("comment-form").addEventListener("submit",async r=>{r.preventDefault();const i=document.getElementById("comment-content").value.trim();if(!i)return;const d=r.target.querySelector('button[type="submit"]');d.disabled=!0,d.textContent="Publicando...";try{await b(s,i),document.getElementById("comment-content").value="",await h(s)}catch(l){alert("Error al publicar el comentario: "+l.message)}finally{d.disabled=!1,d.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Publicar comentario'}})}else t.innerHTML=`
      <div class="auth-panel">
        <div class="auth-tabs">
          <button class="auth-tab active" data-tab="login">Iniciar sesión</button>
          <button class="auth-tab" data-tab="register">Crear cuenta</button>
        </div>

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
          <button type="submit" class="btn-auth-submit">Entrar</button>
        </form>

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
          <button type="submit" class="btn-auth-submit">Crear cuenta</button>
        </form>
      </div>
    `,document.querySelectorAll(".auth-tab").forEach(o=>{o.addEventListener("click",()=>{document.querySelectorAll(".auth-tab").forEach(n=>n.classList.remove("active")),document.querySelectorAll(".auth-form").forEach(n=>n.classList.remove("active")),o.classList.add("active"),document.getElementById(`${o.dataset.tab}-form`).classList.add("active")})}),document.getElementById("login-form").addEventListener("submit",async o=>{o.preventDefault();const n=document.getElementById("login-error");n.classList.add("hidden");const r=o.target.querySelector('button[type="submit"]');r.disabled=!0,r.textContent="Entrando...";try{await C(document.getElementById("login-email").value.trim(),document.getElementById("login-pass").value),location.reload()}catch{n.textContent="Correo o contraseña incorrectos.",n.classList.remove("hidden"),r.disabled=!1,r.textContent="Entrar"}}),document.getElementById("register-form").addEventListener("submit",async o=>{o.preventDefault();const n=document.getElementById("register-error"),r=document.getElementById("register-success");n.classList.add("hidden"),r.classList.add("hidden");const i=o.target.querySelector('button[type="submit"]');i.disabled=!0,i.textContent="Creando cuenta...";try{await k(document.getElementById("reg-name").value.trim(),document.getElementById("reg-email").value.trim(),document.getElementById("reg-pass").value),r.textContent="✅ Cuenta creada. Ahora inicia sesión.",r.classList.remove("hidden"),setTimeout(()=>{document.querySelector('[data-tab="login"]').click()},1500)}catch(d){n.textContent=d.message||"Error al crear la cuenta.",n.classList.remove("hidden")}finally{i.disabled=!1,i.textContent="Crear cuenta"}})}function A(e){const s=document.createElement("article");s.className="project-card";let t="";e.tags&&Array.isArray(e.tags)&&(t=`<div class="project-tags">
      ${e.tags.map(c=>`<span class="tag">${c}</span>`).join("")}
    </div>`);const a=e.created_at?new Date(e.created_at).toLocaleDateString("es-ES",{year:"numeric",month:"long",day:"numeric"}):e.date;return s.innerHTML=`
    <div class="project-date">${a||"Reciente"}</div>
    <h3 class="project-title">${e.title}</h3>
    ${t}
    <p class="project-excerpt">${e.excerpt||e.description||""}</p>
    <a href="game.html?id=${e.id}" class="read-more">Ver más</a>
  `,s}(async function(){const s=q("id");if(!s){document.getElementById("library-view").style.display="block";const t=document.getElementById("library-grid"),a=document.getElementById("library-empty"),c=document.getElementById("library-search-input");try{const o=await E(),n=r=>{t.innerHTML="",!r||r.length===0?a.classList.remove("hidden"):(a.classList.add("hidden"),r.forEach(i=>t.appendChild(A(i))))};n(o),c.addEventListener("input",r=>{const i=r.target.value.toLowerCase(),d=o.filter(l=>l.title.toLowerCase().includes(i)||l.description&&l.description.toLowerCase().includes(i)||l.tags&&l.tags.some(m=>m.toLowerCase().includes(i)));n(d)})}catch(o){console.error(o),t.innerHTML='<p style="color:red">Error al cargar la biblioteca.</p>'}return}document.getElementById("game-detail").style.display="block";try{const t=await x(s);T(t);const a=await L();H(a,Number(s)),await h(Number(s))}catch(t){console.error(t),document.getElementById("game-title").textContent="Error al cargar el juego"}})();
