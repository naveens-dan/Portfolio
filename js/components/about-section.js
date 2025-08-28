// about-section.js
class AboutSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: block;
        position: relative;
      }
      
      .about {
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
      
      .about-content {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-xl, 64px);
      }
      
      .about-image {
        position: relative;
        border-radius: 16px;
        overflow: hidden;
        aspect-ratio: 4/5;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .about-image.visible {
        opacity: 1;
        transform: translateY(0);
      }
      
      .about-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform var(--transition-medium, 0.4s);
      }
      
      .about-image:hover img {
        transform: scale(1.05);
      }
      
      .about-image::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);
      }
      
      .about-text {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .about-text.visible {
        opacity: 1;
        transform: translateY(0);
      }
      
      .about-text h3 {
        font-family: var(--font-heading, 'Space Grotesk', sans-serif);
        font-size: clamp(2.4rem, 3vw, 3.2rem);
        font-weight: 700;
        color: var(--color-text-primary, #2D3436);
        margin-bottom: var(--space-md, 24px);
        position: relative;
        display: inline-block;
      }
      
      .about-text h3::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 40px;
        height: 3px;
        background-color: var(--color-accent, #FF7675);
      }
      
      .about-text p {
        font-size: 1.6rem;
        color: var(--color-text-secondary, #636E72);
        margin-bottom: var(--space-lg, 40px);
        line-height: 1.6;
      }
      
      .about-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: var(--space-md, 24px);
        margin-top: var(--space-xl, 64px);
      }
      
      .stat-item {
        text-align: left;
      }
      
      .stat-number {
        font-family: var(--font-heading, 'Space Grotesk', sans-serif);
        font-size: 3.6rem;
        font-weight: 700;
        color: var(--color-primary, #6C5CE7);
        line-height: 1;
        margin-bottom: var(--space-xs, 8px);
      }
      
      .stat-label {
        font-size: 1.4rem;
        color: var(--color-text-secondary, #636E72);
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
        margin-top: var(--space-lg, 40px);
        width: 100%;
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
      
      @media (min-width: 992px) {
        .about-content {
          grid-template-columns: 1fr 1fr;
        }
      }
      
      @media (max-width: 768px) {
        .container {
          padding: 0 var(--space-sm, 16px);
        }
        
        .about {
          padding: var(--space-lg, 40px) 0;
        }
        
        .section-header {
          margin-bottom: var(--space-lg, 40px);
        }
      }
    </style>
    
    <section class="about">
      <div class="container">
        <div class="section-header">
          <div class="section-title-container">
            <span class="section-number">02</span>
            <h2 class="section-title">About Me</h2>
          </div>
          <p class="section-subtitle">Get to know me and my journey in web development and design.</p>
        </div>
        
        <div class="about-content">
          <div class="about-image">
            <!-- Replace with your actual image -->
            <img
              src="https://images.unsplash.com/photo-1596003906949-67221c37965c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Naveen S">
          </div>
          
          <div class="about-text">
            <h3>My Story</h3>
            <p>I'm a Front-End Developer and UI/UX Designer with over 6 years of experience in creating digital
              experiences that combine aesthetic appeal with technical functionality. My journey began with web design
              fundamentals and has evolved to include expertise in front-end frameworks, marketing technology, and team
              coordination.</p>
            <p>I'm passionate about optimizing web performance and creating user-friendly interfaces. My experience spans
              from small business websites to enterprise-level applications, with a focus on clean code and intuitive
              design.</p>
            <p>Beyond coding, I enjoy audio books, music, watching anime, and playing chess. I'm constantly exploring new
              technologies and techniques to enhance my skills and deliver better digital solutions.</p>
            
            <div class="about-stats">
              <div class="stat-item">
                <div class="stat-number">6+</div>
                <div class="stat-label">Years Experience</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">150+</div>
                <div class="stat-label">Projects Completed</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">3</div>
                <div class="stat-label">Companies Worked With</div>
              </div>
            </div>
            
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
      </div>
    </section>
  `;

        // Store references to elements
        this.aboutImage = this.shadowRoot.querySelector('.about-image');
        this.aboutText = this.shadowRoot.querySelector('.about-text');
    }

    connectedCallback() {
        // Add fade-in animation
        this.addEventListener('component-visible', () => {
            setTimeout(() => {
                this.aboutImage.classList.add('visible');
            }, 100);

            setTimeout(() => {
                this.aboutText.classList.add('visible');
            }, 300);
        });
    }
}

customElements.define('about-section', AboutSection);