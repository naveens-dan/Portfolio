// hero-section.js
class HeroSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: block;
      }
      
      .hero {
        min-height: 100vh;
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
      }
      
      .container {
        width: 100%;
        max-width: 1440px;
        margin: 0 auto;
        padding: 0 var(--space-md, 24px);
      }
      
      .hero-content {
        position: relative;
        z-index: 2;
      }
      
      .hero-greeting {
        font-family: var(--font-body, 'Inter', sans-serif);
        font-size: 1.8rem;
        font-weight: 500;
        color: var(--color-accent, #FF7675);
        margin-bottom: var(--space-sm, 16px);
        display: flex;
        align-items: center;
        gap: var(--space-sm, 16px);
        width: fit-content;
      }
      
      .hero-greeting::before {
        content: '';
        display: block;
        width: 40px;
        height: 2px;
        background-color: var(--color-accent, #FF7675);
      }
      
      .hero-title {
        font-family: var(--font-heading, 'Space Grotesk', sans-serif);
        font-size: clamp(4rem, 8vw, 9rem);
        font-weight: 700;
        line-height: 1.2;
        letter-spacing: -0.02em;
        margin-bottom: var(--space-md, 24px);
        position: relative;
        color: var(--color-text-primary, #2D3436);
      }
      
      .hero-title .highlight {
        color: var(--color-primary, #6C5CE7);
        position: relative;
        display: inline-block;
      }
      
      .hero-title .highlight::after {
        content: '';
        position: absolute;
        bottom: 5px;
        left: 0;
        width: 100%;
        height: 12px;
        background-color: var(--color-accent, #FF7675);
        opacity: 0.3;
        z-index: -1;
      }
      
      .hero-subtitle {
        font-size: clamp(1.8rem, 2.5vw, 2.4rem);
        color: var(--color-text-secondary, #636E72);
        max-width: 600px;
        margin-bottom: var(--space-lg, 40px);
      }
      
      .hero-cta {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-md, 24px);
      }
      
      .btn {
        display: inline-flex;
        align-items: center;
        gap: var(--space-xs, 8px);
        padding: var(--space-sm, 16px) var(--space-lg, 40px);
        border-radius: 8px;
        font-weight: 600;
        font-size: 1.6rem;
        transition: all var(--transition-fast, 0.2s);
        position: relative;
        text-decoration: none;
      }
      
      .btn-outline {
        background-color: transparent;
        color: var(--color-text-primary, #2D3436);
        border: 1px solid var(--color-border, #DFE6E9);
      }
      
      .btn-outline:hover {
        border-color: var(--color-primary, #6C5CE7);
        color: var(--color-primary, #6C5CE7);
        transform: translateY(-3px);
      }
      
      .resume-download {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-sm, 16px);
        padding: var(--space-sm, 16px) var(--space-lg, 40px);
        background-color: var(--color-surface, #efefef);
        border: 1px solid var(--color-border, #DFE6E9);
        border-radius: 8px;
        color: var(--color-text-primary, #2D3436);
        font-weight: 600;
        transition: all var(--transition-medium, 0.4s);
        text-decoration: none;
      }
      
      .resume-download:hover {
        background-color: var(--color-primary, #6C5CE7);
        color: white;
        border-color: var(--color-primary, #6C5CE7);
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(108, 92, 231, 0.2);
      }
      
      .resume-download svg {
        width: 20px;
        height: 20px;
      }
      
      .hero-scroll {
        position: absolute;
        bottom: var(--space-lg, 40px);
        left: 45%;
        width: 100%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-xs, 8px);
        color: var(--color-text-secondary, #636E72);
        font-size: 1.4rem;
      }
      
      .scroll-indicator {
        width: 24px;
        height: 40px;
        border: 2px solid var(--color-text-secondary, #636E72);
        border-radius: 12px;
        position: relative;
      }
      
      .scroll-indicator::before {
        content: '';
        position: absolute;
        top: 6px;
        left: 50%;
        transform: translateX(-50%);
        width: 4px;
        height: 8px;
        background-color: var(--color-accent, #FF7675);
        border-radius: 2px;
        animation: scrollIndicator 2s infinite;
      }
      
      @keyframes scrollIndicator {
        0% {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
        100% {
          transform: translateX(-50%) translateY(15px);
          opacity: 0;
        }
      }
      
      .hero-background {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        pointer-events: none;
      }
      
      .hero-shape {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        transition: transform 0.2s ease-out;
        will-change: transform;
      }
      
      .hero-shape-1 {
        top: 10%;
        right: 10%;
        width: 300px;
        height: 300px;
        background-color: rgba(108, 92, 231, 0.15);
      }
      
      .hero-shape-2 {
        bottom: 20%;
        right: 30%;
        width: 200px;
        height: 200px;
        background-color: rgba(0, 210, 211, 0.15);
      }
      
      .hero-shape-3 {
        top: 40%;
        left: 10%;
        width: 250px;
        height: 250px;
        background-color: rgba(255, 118, 117, 0.1);
      }
      
      @media (max-width: 768px) {
        .hero-cta {
          flex-direction: column;
          align-items: flex-start;
        }
        
        .btn, .resume-download {
          width: 100%;
          justify-content: center;
        }
      }
    </style>
    
    <section class="hero">
      <div class="container hero-content">
        <div class="hero-greeting">Hello, I'm Naveen S</div>
        <h1 class="hero-title"> <span class="highlight">Front-End</span> Developer & UI/UX Designer</h1>
        <p class="hero-subtitle">I craft visually stunning digital experiences with a focus on performance optimization
          and seamless user interactions.</p>
        <div class="hero-cta">
          <a href="#footer" class="btn btn-outline">Let's Talk</a>
          <a href="#" class="resume-download">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Resume
          </a>
        </div>
      </div>
    
      <div class="hero-scroll">
        <div class="scroll-indicator"></div>
        <span>Scroll Down</span>
      </div>
    
      <div class="hero-background">
        <div class="hero-shape hero-shape-1"></div>
        <div class="hero-shape hero-shape-2"></div>
        <div class="hero-shape hero-shape-3"></div>
      </div>
    </section>
  `;

    // Store references to elements
    this.heroShapes = this.shadowRoot.querySelectorAll('.hero-shape');

    // Bind methods
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  connectedCallback() {
    // Add event listeners
    document.addEventListener('mousemove', this.handleMouseMove);

    // Add fade-in animation
    this.addEventListener('component-visible', () => {
      const content = this.shadowRoot.querySelector('.hero-content');
      content.style.opacity = '0';
      content.style.transform = 'translateY(20px)';
      content.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

      setTimeout(() => {
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
      }, 100);
    });
  }

  disconnectedCallback() {
    // Remove event listeners
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    this.heroShapes.forEach((shape, index) => {
      const depth = (index + 1) * 20; // Different depth for each shape
      const moveX = (mouseX - 0.5) * depth;
      const moveY = (mouseY - 0.5) * depth;

      shape.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
  }
}

customElements.define('hero-section', HeroSection);