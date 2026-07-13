import { getProjects } from './supabase.js';

let allProjects = [];

document.addEventListener('DOMContentLoaded', async () => {
  const projectsGrid = document.getElementById('projects-grid');
  const loadingState = document.getElementById('loading-state');
  const emptyState = document.getElementById('empty-state');
  
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.padding = '1rem 0';
      navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
      navbar.style.padding = '1.5rem 0';
      navbar.style.background = 'rgba(10, 10, 15, 0.8)';
    }
  });

  try {
    // Fetch projects from Supabase (or mock data)
    allProjects = await getProjects();
    
    // Hide loading
    loadingState.classList.add('hidden');
    
    if (!allProjects || allProjects.length === 0) {
      emptyState.classList.remove('hidden');
      return;
    }
    
    // Render projects
    allProjects.forEach(project => {
      const card = createProjectCard(project);
      projectsGrid.appendChild(card);
    });
    
  } catch (error) {
    console.error("Error al cargar proyectos:", error);
    loadingState.innerHTML = `<p style="color: #ff5e00;">Error al cargar los proyectos. Intenta recargar la página.</p>`;
  }
});

function createProjectCard(project) {
  const article = document.createElement('article');
  article.className = 'project-card';
  
  let tagsHtml = '';
  if (project.tags && Array.isArray(project.tags)) {
    tagsHtml = `<div class="project-tags">
      ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
    </div>`;
  }
  
  const dateStr = project.created_at 
    ? new Date(project.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
    : project.date;

  article.innerHTML = `
    <div class="project-date">${dateStr || 'Reciente'}</div>
    <h3 class="project-title">${project.title}</h3>
    ${tagsHtml}
    <p class="project-excerpt">${project.excerpt || project.description || ''}</p>
    <a href="project.html?id=${project.id}" target="_blank" class="read-more">Ver más</a>
  `;

  return article;
}
