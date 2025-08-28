// projects-section.js
class ProjectsSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: block;
        position: relative;
      }
      
      :host(.color-surface)::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--color-surface, #efefef);
        opacity: 0.7;
        z-index: -1;
      }
      
      .projects {
        position: relative;
        padding: var(--space-xl, 64px) 0;
      }
      
      .container {
        width: 100%;
        max-width: 1440px;
        margin: 0 auto;
        padding: 0 var(--space-md, 24px);
      }
      
      .section-header {
        margin-bottom: var(--space-xl, 64px);
      }
      
      .section-title-container {
        display: flex;
        align-items: center;
        gap: var(--space-sm, 16px);
        margin-bottom: var(--space-md, 24px);
      }
      
      .section-number {
        font-family: var(--font-heading, 'Space Grotesk', sans-serif);
        font-size: 1.4rem;
        font-weight: 700;
        color: var(--color-accent, #FF7675);
      }
      
      .section-title {
        font-family: var(--font-heading, 'Space Grotesk', sans-serif);
        font-size: clamp(3.2rem, 5vw, 5.6rem);
        font-weight: 700;
        letter-spacing: -0.01em;
        color: var(--color-text-primary, #2D3436);
        position: relative;
        margin: 0;
      }
      
      .section-subtitle {
        font-size: 1.8rem;
        color: var(--color-text-secondary, #636E72);
        max-width: 600px;
        margin: 0;
      }
      
      .projects-filter {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-sm, 16px);
        margin-bottom: var(--space-xl, 64px);
      }
      
      .filter-btn {
        padding: var(--space-xs, 8px) var(--space-md, 24px);
        background: none;
        border: none;
        font-size: 1.6rem;
        font-weight: 500;
        color: var(--color-text-secondary, #636E72);
        cursor: pointer;
        transition: all var(--transition-fast, 0.2s);
        border-radius: 30px;
      }
      
      .filter-btn:hover,
      .filter-btn.active {
        color: var(--color-primary, #6C5CE7);
        background-color: var(--color-surface, #efefef);
      }
      
      .filter-btn.active {
        font-weight: 600;
      }
      
      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--space-lg, 40px);
      }
      
      .project-card {
        border-radius: 16px;
        background-color: var(--color-surface, #efefef);
        transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        position: relative;
        transform-style: preserve-3d;
        perspective: 1000px;
        cursor: pointer;
        box-shadow: 0 30px 50px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transform: translateY(20px);
      }
      
      .project-card.visible {
        opacity: 1;
        transform: translateY(0);
      }
      
      .project-card:hover {
        transform: translateY(-10px) rotateX(5deg);
        box-shadow: 0 30px 50px rgba(0, 0, 0, 0.4);
      }
      
      .project-thumbnail {
        position: relative;
        overflow: hidden;
        aspect-ratio: 16/9;
        transform-style: preserve-3d;
        perspective: 1000px;
        border-radius: 15px 15px 0px 0px;
      }
      
      .project-thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease-out;
      }
      
      .project-card:hover .project-thumbnail img {
        transform: scale(1.05) translateZ(20px);
      }
      
      .project-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
        opacity: 0;
        transition: opacity var(--transition-medium, 0.4s);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .project-card:hover .project-overlay {
        opacity: 1;
      }
      
      .project-links {
        display: flex;
        gap: var(--space-sm, 16px);
      }
      
      .project-link {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-primary, #6C5CE7);
        font-size: 2rem;
        transform: translateY(20px);
        opacity: 0;
        transition: all var(--transition-medium, 0.4s);
        text-decoration: none;
      }
      
      .project-card:hover .project-link {
        transform: translateY(0);
        opacity: 1;
      }
      
      .project-card:hover .project-link:nth-child(2) {
        transition-delay: 0.1s;
      }
      
      .project-link:hover {
        background-color: var(--color-primary, #6C5CE7);
        color: white;
      }
      
      .project-content {
        padding: var(--space-md, 24px);
        transform: translateZ(10px);
        transition: transform 0.3s ease;
      }
      
      .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs, 8px);
        margin-bottom: var(--space-sm, 16px);
      }
      
      .project-tag {
        font-size: 1.2rem;
        color: var(--color-accent, #FF7675);
        font-weight: 500;
      }
      
      .project-title {
        font-family: var(--font-heading, 'Space Grotesk', sans-serif);
        font-size: 2rem;
        font-weight: 700;
        color: var(--color-text-primary, #2D3436);
        margin: 0 0 var(--space-xs, 8px) 0;
      }
      
      .project-description {
        font-size: 1.4rem;
        color: var(--color-text-secondary, #636E72);
        margin: 0;
      }
      
      @media (max-width: 768px) {
        .container {
          padding: 0 var(--space-sm, 16px);
        }
        
        .projects {
          padding: var(--space-lg, 40px) 0;
        }
        
        .section-header {
          margin-bottom: var(--space-lg, 40px);
        }
      }
    </style>
    
    <section class="projects">
      <div class="container">
        <div class="section-header">
          <div class="section-title-container">
            <span class="section-number">01</span>
            <h2 class="section-title">Featured Projects</h2>
          </div>
          <p class="section-subtitle">A selection of my work showcasing my design and development capabilities.</p>
        </div>
        
        <div class="projects-filter">
          <button class="filter-btn active" data-filter="all">All</button>
          <button class="filter-btn" data-filter="Full-Stack">Full-Stack</button>
          <button class="filter-btn" data-filter="Front-End">Front-End</button>
          <button class="filter-btn" data-filter="App-Design">App Design</button>
        </div>
        
        <div class="projects-grid">
          <!-- Project 1 -->
          <div class="project-card" data-category="Front-End">
            <div class="project-thumbnail">
              <img src="img/projects/misoftwares.jpg" alt="MI Softwares Website">
              <div class="project-overlay">
                <div class="project-links">
                  <a href="https://misoftwares.com" target="_blank" class="project-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div class="project-content">
              <div class="project-tags">
                <span class="project-tag">Front-End</span>
                <span class="project-tag">Corporate</span>
                <span class="project-tag">Responsive</span>
              </div>
              <h3 class="project-title">MI Softwares</h3>
              <p class="project-description">Company website featuring modern design, optimized performance, and
                responsive layout.</p>
            </div>
          </div>
          
          <!-- Project 2 -->
          <div class="project-card" data-category="Front-End">
            <div class="project-thumbnail">
              <img src="img/projects/clouddreams.jpg" alt="Cloud Dreams Website">
              <div class="project-overlay">
                <div class="project-links">
                  <a href="https://clouddreams.in" target="_blank" class="project-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div class="project-content">
              <div class="project-tags">
                <span class="project-tag">Front-End</span>
                <span class="project-tag">Corporate</span>
                <span class="project-tag">Responsive</span>
              </div>
              <h3 class="project-title">Cloud Dreams</h3>
              <p class="project-description">Company website with advanced animations and interactive elements.</p>
            </div>
          </div>
          
          <!-- More projects... -->
        </div>
      </div>
    </section>
  `;

        // Store references to elements
        this.projectCards = this.shadowRoot.querySelectorAll('.project-card');
        this.filterButtons = this.shadowRoot.querySelectorAll('.filter-btn');

        // Bind methods
        this.handleFilterClick = this.handleFilterClick.bind(this);
        this.showProjectsWithDelay = this.showProjectsWithDelay.bind(this);
    }

    connectedCallback() {
        // Add event listeners
        this.filterButtons.forEach(button => {
            button.addEventListener('click', this.handleFilterClick);
        });

        // Add fade-in animation
        this.addEventListener('component-visible', () => {
            this.showProjectsWithDelay();
        });
    }

    disconnectedCallback() {
        // Remove event listeners
        this.filterButtons.forEach(button => {
            button.removeEventListener('click', this.handleFilterClick);
        });
    }

    handleFilterClick(e) {
        // Remove active class from all buttons
        this.filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        e.target.classList.add('active');

        const filter = e.target.getAttribute('data-filter');

        this.projectCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                const category = card.getAttribute('data-category');
                if (category && category.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }

    showProjectsWithDelay() {
        this.projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, 100 * index); // Staggered delay
        });
    }
}

customElements.define('projects-section', ProjectsSection);