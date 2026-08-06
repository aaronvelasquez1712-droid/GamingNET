import{o as p,g as v,j as y}from"./supabase-L-0F_XPF.js";let n=[],g=[],d=[];document.addEventListener("DOMContentLoaded",async()=>{const e=document.getElementById("projects-grid"),a=document.getElementById("index-games-grid"),s=document.getElementById("index-fixhub-grid"),t=document.getElementById("loading-state"),i=document.getElementById("empty-state"),r=document.getElementById("games-empty"),h=document.getElementById("fixhub-empty"),o=document.querySelector(".navbar");window.addEventListener("scroll",()=>{window.scrollY>50?(o.style.padding="1rem 0",o.style.background="rgba(10, 10, 15, 0.95)"):(o.style.padding="1.5rem 0",o.style.background="rgba(10, 10, 15, 0.8)")});try{if(n=await p(),t==null||t.classList.add("hidden"),!n||n.length===0)i==null||i.classList.remove("hidden");else{const c=window.location.pathname.includes("projects.html")?n:n.slice(0,3);e&&c.forEach(m=>e.appendChild(f(m)))}a&&(g=await v(),!g||g.length===0?r==null||r.classList.remove("hidden"):g.slice(0,3).forEach(c=>a.appendChild(x(c)))),s&&(d=await y(),!d||d.length===0?h==null||h.classList.remove("hidden"):u(d,"all"),document.querySelectorAll(".fixhub-filters .filter-btn").forEach(l=>{l.addEventListener("click",c=>{document.querySelectorAll(".fixhub-filters .filter-btn").forEach(m=>m.classList.remove("active")),c.target.classList.add("active"),u(d,c.target.getAttribute("data-filter"))})}))}catch(l){console.error("Error cargando datos:",l),t&&(t.innerHTML='<p style="color: #ff5e00;">Error al cargar datos. Recarga la página.</p>')}});function u(e,a){const s=document.getElementById("index-fixhub-grid"),t=document.getElementById("fixhub-empty");if(!s)return;s.innerHTML="";const i=a==="all"?e:e.filter(r=>r.category===a);i.length===0?t==null||t.classList.remove("hidden"):(t==null||t.classList.add("hidden"),i.forEach(r=>s.appendChild(w(r))))}function f(e){const a=document.createElement("article");a.className="project-card";let s=e.tags&&Array.isArray(e.tags)?`<div class="project-tags">${e.tags.map(i=>`<span class="tag">${i}</span>`).join("")}</div>`:"";const t=e.created_at?new Date(e.created_at).toLocaleDateString("es-ES",{year:"numeric",month:"long",day:"numeric"}):"";return a.innerHTML=`
    <div class="project-date">${t||"Reciente"}</div>
    <h3 class="project-title">${e.title}</h3>
    ${s}
    <p class="project-excerpt">${e.excerpt||e.description||""}</p>
    <a href="project.html?id=${e.id}" class="read-more">Ver más</a>
  `,a}function x(e){const a=document.createElement("div");a.className="game-card-dl";let s=e.tags&&Array.isArray(e.tags)?e.tags.map(t=>`<span class="dl-tag">${t}</span>`).join(""):"";return a.innerHTML=`
    <div class="game-cover">
      ${e.image_urls&&e.image_urls[0]?`<img src="${e.image_urls[0]}" style="width:100%;height:100%;object-fit:cover;border-radius:12px;opacity:0.8;"/>`:'<div class="game-cover-placeholder"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="6" ry="6"/><circle cx="16" cy="12" r="1"/><circle cx="18" cy="12" r="1"/><path d="M6 12h4"/><path d="M8 10v4"/></svg></div>'}
      <span class="game-size-badge">${e.size||"— GB"}</span>
    </div>
    <div class="game-dl-info">
      <h3 class="game-dl-title">${e.title}</h3>
      <p class="game-dl-desc">${e.excerpt||e.description||""}</p>
      <div class="game-dl-tags">${s}</div>
      <div class="game-dl-actions" style="margin-top:auto; padding-top: 1rem;">
        <a href="game.html?id=${e.id}" class="btn-primary" style="width:100%; text-align:center; padding: 0.6rem;">Ver Detalles</a>
      </div>
    </div>
  `,a}function w(e){const a=document.createElement("div");a.className="fix-card",a.setAttribute("data-category",e.category);let s="",t="";return e.category==="windows"?(s='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',t="Windows"):e.category==="games"?(s='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="6" ry="6"/><circle cx="16" cy="12" r="1"/><circle cx="18" cy="12" r="1"/><path d="M6 12h4"/><path d="M8 10v4"/></svg>',t="Juegos"):e.category==="dev"&&(s='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',t="Programación"),a.innerHTML=`
    <div class="fix-card-top ${e.category}">
      <span class="fix-cat-icon">${s}</span>
      <span class="fix-cat-label">${t}</span>
    </div>
    <div class="fix-card-body">
      <h3 class="fix-title">${e.title}</h3>
      <p class="fix-desc">${e.excerpt||e.description||""}</p>
    </div>
    <div class="fix-card-footer">
      <span class="fix-pages">${e.pages||"—"} págs.</span>
      <a href="pdf.html?id=${e.id}" class="btn-pdf">Ver Documento</a>
    </div>
  `,a}
