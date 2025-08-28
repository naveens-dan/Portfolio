// skills-section.js
class SkillsSection extends HTMLElement {
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
      
      .skills {
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
      
      /* Timeline Styles for Skills Section */
      .timeline-container {
        position: relative;
        margin: var(--space-xl, 64px) 0;
        padding-left: 40px;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .timeline-container.visible {
        opacity: 1;
        transform: translateY(0);
      }
      
      /* Timeline vertical line */
      .timeline-container::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 15px;
        width: 2px;
        background: linear-gradient(to bottom,
            var(--color-primary, #6C5CE7) 0%,
            var(--color-accent, #FF7675) 100%);
      }
      
      .timeline-item {
        position: relative;
        margin-bottom: var(--space-xl, 64px);
        padding-bottom: var(--space-lg, 40px);
        opacity: 0;
      }
      
      .timeline-item:last-child {
        margin-bottom: 0;
      }
      
      .timeline-item.visible {
        animation: fadeInLeft 0.6s ease forwards;
      }
      
      .timeline-item:nth-child(2).visible {
        animation-delay: 0.2s;
      }
      
      .timeline-item:nth-child(3).visible {
        animation-delay: 0.4s;
      }
      
      .timeline-item:nth-child(4).visible {
        animation-delay: 0.6s;
      }
      
      .timeline-item:nth-child(5).visible {
        animation-delay: 0.8s;
      }
      
      @keyframes fadeInLeft {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      /* Timeline marker (circle on the line) */
      .timeline-marker {
        position: absolute;
        left: -40px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: var(--color-primary, #6C5CE7);
        border: 4px solid var(--color-bg, #FFFFFF);
        box-shadow: 0 0 0 2px var(--color-primary, #6C5CE7);
        z-index: 1;
      }
      
      /* Special marker for education */
      .education-marker {
        background-color: var(--color-accent, #FF7675);
        box-shadow: 0 0 0 2px var(--color-accent, #FF7675);
      }
      
      .timeline-content {
        background-color: var(--color-surface, #efefef);
        border-radius: 16px;
        padding: var(--space-lg, 40px);
        box-shadow: var(--timeline-box-shadow, 0 0px 15px rgba(0, 0, 0, 0.25));
        transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
      }
      
      .timeline-content:hover {
        transform: translateY(-5px) scale(1.02);
        box-shadow: var(--timeline-box-shadow-hover, 0 0px 30px rgba(0, 0, 0, 0.5));
        background-color: rgba(var(--color-primary-rgb, 108, 92, 231), 0.05);
      }
      
      .timeline-date {
        display: inline-block;
        padding: var(--space-xs, 8px) var(--space-sm, 16px);
        background-color: var(--color-primary, #6C5CE7);
        color: white;
        border-radius: 30px;
        font-size: 1.4rem;
        font-weight: 500;
        margin-bottom: var(--space-sm, 16px);
      }
      
      .timeline-title {
        font-family: var(--font-heading, 'Space Grotesk', sans-serif);
        font-size: 2.2rem;
        font-weight: 700;
        color: var(--color-text-primary, #2D3436);
        margin: 0 0 var(--space-xs, 8px) 0;
      }
      
      .timeline-company {
        font-size: 1.8rem;
        color: var(--color-text-secondary, #636E72);
        margin-bottom: var(--space-md, 24px);
        font-weight: 500;
      }
      
      .timeline-institution {
        font-size: 1.6rem;
        color: var(--color-text-secondary, #636E72);
        margin-bottom: var(--space-md, 24px);
        font-weight: 400;
        font-style: italic;
      }
      
      .timeline-details {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-md, 24px);
      }
      
      .timeline-skills h5,
      .timeline-projects h5 {
        font-family: var(--font-heading, 'Space Grotesk', sans-serif);
        font-size: 1.6rem;
        font-weight: 700;
        color: var(--color-primary, #6C5CE7);
        margin: var(--space-sm, 16px) 0;
        display: flex;
        align-items: center;
        gap: var(--space-xs, 8px);
      }
      
      .timeline-skills h5::before,
      .timeline-projects h5::before {
        content: '';
        display: block;
        width: 8px;
        height: 8px;
        background-color: var(--color-accent, #FF7675);
        border-radius: 50%;
      }
      
      .timeline-projects ul {
        padding-left: var(--space-lg, 40px);
        color: var(--color-text-secondary, #636E72);
        margin: 0;
      }
      
      .timeline-projects li {
        margin-bottom: var(--space-xs, 8px);
        line-height: 1.6;
      }
      
      .skills-list {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-sm, 16px);
        column-gap: 5px;
        row-gap: 5px;
      }
      
      .skill-item {
        padding: var(--space-xs, 8px) var(--space-md, 24px);
        background-color: var(--color-bg, #FFFFFF);
        border-radius: 30px;
        font-size: 1.4rem;
        font-weight: 500;
        color: var(--color-text-primary, #2D3436);
        transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
        border: 1px solid var(--color-border, #DFE6E9);
      }
      
      .skill-item:hover {
        background-color: var(--color-primary, #6C5CE7);
        color: white;
        transform: translateY(-5px) scale(1.1);
        box-shadow: 0 10px 20px rgba(var(--color-primary-rgb, 108, 92, 231), 0.2);
        border-color: var(--color-primary, #6C5CE7);
      }
      
      /* Skills Summary Section */
      .skills-summary {
        margin-top: var(--space-xxl, 104px);
        padding-top: var(--space-xl, 64px);
        border-top: 1px solid var(--color-border, #DFE6E9);
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .skills-summary.visible {
        opacity: 1;
        transform: translateY(0);
      }
      
      .skills-summary-title {
        font-family: var(--font-heading, 'Space Grotesk', sans-serif);
        font-size: 2.4rem;
        font-weight: 700;
        color: var(--color-text-primary, #2D3436);
        margin: 0 0 var(--space-lg, 40px) 0;
        text-align: center;
      }
      
      .skills-categories {
        display: grid;
        grid-template-columns: 1fr;
      }
      
      .skills-category {
        margin-bottom: var(--space-md, 24px);
      }
      
      .skills-category-title {
        font-family: var(--font-heading, 'Space Grotesk', sans-serif);
        font-size: 1.8rem;
        font-weight: 700;
        color: var(--color-text-primary, #2D3436);
        margin: 0 0 var(--space-md, 24px) 0;
        display: flex;
        align-items: center;
        gap: var(--space-xs, 8px);
      }
      
      .skills-category-title::before {
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        background-color: var(--color-accent, #FF7675);
        border-radius: 50%;
      }
      
      .skills-categories .ml40 {
        margin-left: 35px;
      }
      
      @media (min-width: 768px) {
        .timeline-container {
          padding-left: 60px;
        }
        
        .timeline-container::before {
          left: 25px;
        }
        
        .timeline-marker {
          left: -50px;
        }
        
        .timeline-details {
          grid-template-columns: 1fr 1fr;
        }
        
        .skills-categories {
          grid-template-columns: repeat(1, 3fr 2fr);
        }
      }
      
      @media (max-width: 768px) {
        .container {
          padding: 0 var(--space-sm, 16px);
        }
        
        .skills {
          padding: var(--space-lg, 40px) 0;
        }
        
        .section-header {
          margin-bottom: var(--space-lg, 40px);
        }
        
        .timeline-container {
          transition: opacity 0.4s ease, transform 0.4s ease; /* Faster transition on mobile */
        }
      }
    </style>
    
    <section class="skills">
      <div class="container">
        <div class="section-header">
          <div class="section-title-container">
            <span class="section-number">03</span>
            <h2 class="section-title">Professional Journey</h2>
          </div>
          <p class="section-subtitle">My career path and the skills I've developed along the way.</p>
        </div>
        
        <div class="timeline-container">
          <!-- Timeline Item 1 (Most Recent) -->
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="timeline-details">
                <div class="timeline-skills">
                  <div class="timeline-date">Sep 2021 - Present</div>
                  <h3 class="timeline-title">Tech Associate</h3>
                  <h4 class="timeline-company">Verticurl Marketing Pvt Ltd</h4>
                  <h5>Key Skills</h5>
                  <div class="skills-list">
                    <span class="skill-item">Tools Automation</span>
                    <span class="skill-item">AI Integration</span>
                    <span class="skill-item">Team Management</span>
                  </div>
                </div>
                
                <div class="timeline-projects">
                  <h5>Key Responsibilities</h5>
                  <ul>
                    <li>End to End campaign operations from Email and segment creations to DL analysis.</li>
                    <li>Managed daily administrative tasks and gathered consumer behavior data.</li>
                    <li>Created report-based metrics and coordinated with teams to develop materials.</li>
                    <li>Implemented automation solutions to streamline workflows.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Timeline Item 2 -->
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="timeline-details">
                <div class="timeline-skills">
                  <div class="timeline-date">8 Months: Jan 2020 - Aug 2021</div>
                  <h3 class="timeline-title">Full-Stack Developer and UI/UX Designer</h3>
                  <h4 class="timeline-company">Mobility Intelligence Softwares</h4>
                  <h5>Key Skills</h5>
                  <div class="skills-list">
                    <span class="skill-item">API Integration</span>
                    <span class="skill-item">CI/CD Pipeline</span>
                    <span class="skill-item">CMS System</span>
                  </div>
                </div>
                
                <div class="timeline-projects">
                  <h5>My Deliverables</h5>
                  <ul>
                    <li>Designed & Developed the official misoftwares.com company website.</li>
                    <li>Created custom dashboards and CMS systems tailored to client requirements.</li>
                    <li>Optimized to 90%+ Performance for websites with Google PageSpeed, achieving faster load times and
                      better scores.</li>
                    <li>Designed mobile applications for Android, iOS and Cross-platform, focusing on user-friendly
                      interfaces and seamless functionality.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <!-- More timeline items... -->
        </div>
        
        <!-- Skills Summary Section -->
        <div class="skills-summary">
          <h3 class="skills-summary-title">Journey Overview</h3>
          
          <div class="skills-categories">
            <div class="skills-category">
              <h4 class="skills-category-title">Skills</h4>
              <div class="skills-list ml40">
                <span class="skill-item">Tools Automation</span>
                <span class="skill-item">Team Management</span>
                <span class="skill-item">FTP</span>
                <span class="skill-item">AI Integration</span>
                <span class="skill-item">API Integration</span>
                <span class="skill-item">App Design</span>
                <span class="skill-item">CI/CD Pipeline</span>
                <span class="skill-item">CMS System</span>
                <span class="skill-item">UI/UX Design</span>
                <span class="skill-item">HTML conversion</span>
                <span class="skill-item">Motion Path</span>
                <span class="skill-item">Photo Editing</span>
                <span class="skill-item">Driver Pack</span>
                <span class="skill-item">Page Animations</span>
                <span class="skill-item">SVG Animation</span>
                <span class="skill-item">File Format Utilization</span>
                <span class="skill-item">CSS & JS Libraries</span>
                <span class="skill-item">Responsive Design</span>
                <span class="skill-item">OS Change/Maintenance</span>
                <span class="skill-item">Paper Presentation</span>
                <span class="skill-item">PowerPoint Create</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

        // Store references to elements
        this.timelineContainer = this.shadowRoot.querySelector('.timeline-container');
        this.timelineItems = this.shadowRoot.querySelectorAll('.timeline-item');
        this.skillsSummary = this.shadowRoot.querySelector('.skills-summary');
    }

    connectedCallback() {
        // Add fade-in animation
        this.addEventListener('component-visible', () => {
            setTimeout(() => {
                this.timelineContainer.classList.add('visible');

                // Add staggered animation to timeline items
                this.timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 200 * index);
                });

                // Animate skills summary after timeline
                setTimeout(() => {
                    this.skillsSummary.classList.add('visible');
                }, 200 * this.timelineItems.length + 300);
            }, 100);
        });
    }
}

customElements.define('skills-section', SkillsSection);