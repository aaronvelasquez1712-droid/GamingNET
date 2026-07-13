import{g as d}from"./style-CcIPIIB3.js";let s=[];document.addEventListener("DOMContentLoaded",async()=>{const e=document.getElementById("projects-grid"),t=document.getElementById("loading-state"),n=document.getElementById("empty-state"),a=document.querySelector(".navbar");window.addEventListener("scroll",()=>{window.scrollY>50?(a.style.padding="1rem 0",a.style.background="rgba(10, 10, 15, 0.95)"):(a.style.padding="1.5rem 0",a.style.background="rgba(10, 10, 15, 0.8)")});try{if(s=await d(),t.classList.add("hidden"),!s||s.length===0){n.classList.remove("hidden");return}s.forEach(r=>{const c=o(r);e.appendChild(c)})}catch(r){console.error("Error al cargar proyectos:",r),t.innerHTML='<p style="color: #ff5e00;">Error al cargar los proyectos. Intenta recargar la página.</p>'}});function o(e){const t=document.createElement("article");t.className="project-card";let n="";e.tags&&Array.isArray(e.tags)&&(n=`<div class="project-tags">
      ${e.tags.map(r=>`<span class="tag">${r}</span>`).join("")}
    </div>`);const a=e.created_at?new Date(e.created_at).toLocaleDateString("es-ES",{year:"numeric",month:"long",day:"numeric"}):e.date;return t.innerHTML=`
    <div class="project-date">${a||"Reciente"}</div>
    <h3 class="project-title">${e.title}</h3>
    ${n}
    <p class="project-excerpt">${e.excerpt||e.description||""}</p>
    <a href="project.html?id=${e.id}" target="_blank" class="read-more">Ver más</a>
  `,t}
