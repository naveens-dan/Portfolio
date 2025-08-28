// cube-component.js
class CubeComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: block;
      }
      
      .personal-details-cube {
        position: relative;
        padding: var(--space-xl, 64px) 0;
        height: 700px;
      }
      
      .container {
        width: 100%;
        max-width: 1440px;
        margin: 0 auto;
        padding: 0 var(--space-md, 24px);
      }
      
      .cube-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: var(--space-xl, 64px);
      }
      
      .scene {
        width: 100%;
        height: 100%;
        perspective: 1000px;
        display: flex;
        justify-content: center;
        align-items: center;
        touch-action: none; /* Prevents browser handling of touch gestures */
      }
      
      .scene::after {
        content: "Swipe to rotate";
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        color: var(--color-text-secondary, #636E72);
        opacity: 0.7;
        pointer-events: none;
        animation: fadeOut 3s forwards;
      }
      
      @keyframes fadeOut {
        0%, 50% { opacity: 0.7; }
        100% { opacity: 0; }
      }
      
      .cube {
        width: 400px;
        height: 400px;
        position: relative;
        transform-style: preserve-3d;
        transform: rotateX(-15deg) rotateY(15deg);
        transition: transform 1s;
        will-change: transform;
      }
      
      .cube.dragging {
        transition: none !important;
      }
      
      .cube.dragging .cube-face {
        box-shadow: 0 0 15px rgba(var(--color-primary-rgb, 108, 92, 231), 0.5);
      }
      
      .cube-face {
        position: absolute;
        width: 400px;
        height: 400px;
        border: 1px solid rgba(var(--color-primary-rgb, 108, 92, 231), 0.3);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: var(--space-lg, 40px);
        background-color: rgba(var(--color-primary-rgb, 108, 92, 231), 0.15);
        backface-visibility: hidden;
        overflow: auto;
      }
      
      .cube-face-front {
        transform: translateZ(200px);
        background-color: rgba(30, 0, 255, 0.15);
      }
      
      .cube-face-back {
        transform: rotateY(180deg) translateZ(200px);
        background-color: rgba(255, 238, 0, 0.15);
      }
      
      .cube-face-right {
        transform: rotateY(90deg) translateZ(200px);
        background-color: rgba(255, 0, 0, 0.15);
      }
      
      .cube-face-left {
        transform: rotateY(-90deg) translateZ(200px);
        background-color: rgba(0, 255, 106, 0.15);
      }
      
      .cube-face-top {
        transform: rotateX(90deg) translateZ(200px);
        background-color: rgba(0, 153, 255, 0.15);
      }
      
      .cube-face-bottom {
        transform: rotateX(-90deg) translateZ(200px);
        background-color: rgba(183, 0, 255, 0.15);
      }
      
      .cube-face-content.language {
        text-align: center;
      }
      
      .cube-nav {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: var(--space-md, 24px);
        z-index: 10;
      }
      
      .cube-nav-btn {
        padding: var(--space-md, 24px) var(--space-lg, 40px);
        background-color: rgba(var(--color-primary-rgb, 108, 92, 231), 0.1);
        border: none;
        border-radius: 8px;
        color: var(--color-text-primary, #2D3436);
        transition: all var(--transition-fast, 0.2s);
        font-family: var(--font-body, 'Inter', sans-serif);
        font-size: 1.6rem;
        text-align: left;
        position: relative;
        cursor: pointer;
      }
      
      .cube-nav-btn:hover {
        background-color: var(--color-primary, #6C5CE7);
        color: white;
        transform: translateX(5px);
      }
      
      .cube-nav-btn.active {
        background-color: var(--color-primary, #6C5CE7);
        color: white;
      }
      
      .cube-nav-btn.active::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -10px;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 10px solid var(--color-primary, #6C5CE7);
      }
      
      .cube-face-title {
        font-family: var(--font-heading, 'Space Grotesk', sans-serif);
        font-size: 2.4rem;
        margin-bottom: var(--space-lg, 40px);
        color: var(--color-primary, #6C5CE7);
        text-align: center;
      }
      
      .cube-face-content {
        width: 100%;
      }
      
      .cube-list {
        list-style: none;
        width: 100%;
        padding: 0;
        margin: 0;
      }
      
      .cube-list-item {
        display: flex;
        margin-bottom: var(--space-md, 24px);
        align-items: flex-start;
      }
      
      .cube-list-icon {
        margin-right: var(--space-sm, 16px);
        font-size: 2rem;
        color: var(--color-primary, #6C5CE7);
        flex-shrink: 0;
      }
      
      .cube-list-content {
        flex-grow: 1;
      }
      
      .cube-list-label {
        font-weight: 600;
        margin-bottom: 4px;
        color: var(--color-text-primary, #2D3436);
      }
      
      .cube-list-value {
        color: var(--color-text-secondary, #636E72);
        font-size: 12px;
      }
      
      .cube-objective {
        font-style: italic;
        line-height: 1.8;
        text-align: center;
        color: var(--color-text-secondary, #636E72);
        padding: 0;
      }
      
      .cube-languages {
        width: 100%;
      }
      
      .cube-language {
        display: flex;
        align-items: center;
        margin-bottom: var(--space-md, 24px);
      }
      
      .cube-language-flag {
        font-size: 2.4rem;
        margin-right: var(--space-sm, 16px);
      }
      
      .cube-language-info {
        flex-grow: 1;
      }
      
      .cube-language-name {
        font-weight: 600;
        color: var(--color-text-primary, #2D3436);
      }
      
      .cube-language-level {
        font-size: 1.4rem;
        color: var(--color-text-secondary, #636E72);
      }
      
      .cube-hobbies {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-sm, 16px);
        justify-content: center;
      }
      
      .cube-hobby {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-xs, 8px);
      }
      
      .cube-hobby-icon {
        font-size: 2.4rem;
        color: var(--color-accent, #FF7675);
      }
      
      .cube-hobby-name {
        font-size: 1.4rem;
        color: var(--color-text-secondary, #636E72);
      }
      
      .contact-link {
        display: flex;
        align-items: center;
        gap: var(--space-md, 24px);
        color: var(--color-text-primary, #2D3436);
        transition: all var(--transition-fast, 0.2s);
        width: fit-content;
        text-decoration: none;
        margin-bottom: var(--space-md, 24px);
      }
      
      .contact-link:hover {
        color: var(--color-primary, #6C5CE7);
        transform: translateX(5px);
      }
      
      .contact-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--color-surface, #efefef);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: var(--color-primary, #6C5CE7);
        transition: all var(--transition-fast, 0.2s);
      }
      
      .contact-link:hover .contact-icon {
        background-color: var(--color-primary, #6C5CE7);
        color: white;
      }
      
      /* Responsive adjustments */
      @media (max-width: 992px) {
        .cube-container {
          flex-direction: column;
        }
        
        .cube-nav-container {
          width: 100%;
          padding-right: 0;
          padding-bottom: var(--space-lg, 40px);
        }
        
        .scene {
          width: 100%;
        }
        
        .cube-nav {
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .cube-nav-btn.active::after {
          display: none;
        }
        
        .cube-nav-btn:hover {
          transform: translateY(-5px);
        }
      }
      
      @media (max-width: 768px) {
        .cube {
          width: 350px;
          height: 350px;
          transition: transform 0.05s; /* Smoother response on mobile */
        }
        
        .cube-face {
          width: 350px;
          height: 350px;
          padding: var(--space-md, 24px);
          overflow-y: auto; /* Enable scrolling for content that might still overflow */
        }
        
        .cube-face-front {
          transform: translateZ(175px);
        }
        
        .cube-face-back {
          transform: rotateY(180deg) translateZ(175px);
        }
        
        .cube-face-right {
          transform: rotateY(90deg) translateZ(175px);
        }
        
        .cube-face-left {
          transform: rotateY(-90deg) translateZ(175px);
        }
        
        .cube-face-top {
          transform: rotateX(90deg) translateZ(175px);
        }
        
        .cube-face-bottom {
          transform: rotateX(-90deg) translateZ(175px);
        }
        
        /* Reduce font sizes for better fit */
        .cube-face-title {
          font-size: 2rem;
          margin-bottom: var(--space-md, 24px);
        }
        
        .cube-list-label {
          font-size: 1.4rem;
        }
        
        .cube-list-value {
          font-size: 1.2rem;
        }
        
        .cube-objective {
          font-size: 1.4rem;
          padding: 0 var(--space-xs, 8px);
        }
        
        .cube-language-name {
          font-size: 1.4rem;
        }
        
        .cube-language-level {
          font-size: 1.2rem;
        }
        
        .cube-hobby-name {
          font-size: 1.2rem;
        }
        
        .cube-nav {
          padding: 0 var(--space-md, 24px);
        }
        
        .cube-nav-btn {
          font-size: 1.2rem;
          padding: var(--space-xs, 8px) var(--space-sm, 16px);
        }
      }
      
      @media (max-width: 480px) {
        .cube {
          width: 300px;
          height: 300px;
        }
        
        .cube-face {
          width: 300px;
          height: 300px;
          padding: var(--space-sm, 16px);
        }
        
        .cube-face-front {
          transform: translateZ(150px);
        }
        
        .cube-face-back {
          transform: rotateY(180deg) translateZ(150px);
        }
        
        .cube-face-right {
          transform: rotateY(90deg) translateZ(150px);
        }
        
        .cube-face-left {
          transform: rotateY(-90deg) translateZ(150px);
        }
        
        .cube-face-top {
          transform: rotateX(90deg) translateZ(150px);
        }
        
        .cube-face-bottom {
          transform: rotateX(-90deg) translateZ(150px);
        }
      }
    </style>
    
    <section class="personal-details-cube">
      <div class="container">
        <div class="cube-container">
          <!-- Left side: Navigation -->
          <div class="cube-nav-container">
            <div class="cube-nav">
              <button class="cube-nav-btn" data-face="top">Personal</button>
              <button class="cube-nav-btn" data-face="left">Languages</button>
              <button class="cube-nav-btn" data-face="back">Objective</button>
              <button class="cube-nav-btn" data-face="right">Hobbies</button>
              <button class="cube-nav-btn" data-face="bottom">Education</button>
              <button class="cube-nav-btn active" data-face="front">Contact</button>
            </div>
          </div>
          
          <!-- Right side: Cube -->
          <div class="scene">
            <div class="cube" id="cube">
              <!-- Front Face - Contact -->
              <div class="cube-face cube-face-front">
                <h3 class="cube-face-title">Contact</h3>
                <div class="cube-face-content">
                  <a href="mailto:naveenbsc1@gmail.com" class="contact-link">
                    <div class="contact-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div>
                      <strong>Email</strong>
                      <p>naveenbsc1@gmail.com</p>
                    </div>
                  </a>
                  <a href="tel:+919787752302" class="contact-link">
                    <div class="contact-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path
                          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                        </path>
                      </svg>
                    </div>
                    <div>
                      <strong>Phone</strong>
                      <p>+91 97877 52302</p>
                    </div>
                  </a>
                </div>
              </div>
              
              <!-- Back Face - Career Objective -->
              <div class="cube-face cube-face-back">
                <h3 class="cube-face-title">Career Objective</h3>
                <div class="cube-face-content">
                  <p class="cube-objective">Passionate front-end developer seeking challenging projects that require
                    continuous learning and adaptation to new technologies, with the goal of creating innovative,
                    accessible, and performance-optimized digital experiences.</p>
                </div>
              </div>
              
              <!-- Right Face - Languages -->
              <div class="cube-face cube-face-right">
                <h3 class="cube-face-title">Languages</h3>
                <div class="cube-face-content language">
                  <div class="cube-languages">
                    <div class="cube-language">
                      <div class="cube-language-info">
                        <div class="cube-language-name">Tamil <small>(Native)</small></div>
                        <div class="cube-language-level">Speaking, Reading, Writing</div>
                      </div>
                    </div>
                    <div class="cube-language">
                      <div class="cube-language-info">
                        <div class="cube-language-name">English <small>(Fluent)</small></div>
                        <div class="cube-language-level">Speaking, Reading, Writing</div>
                      </div>
                    </div>
                    <div class="cube-language">
                      <div class="cube-language-info">
                        <div class="cube-language-name">Hindi <small>(Basic)</small></div>
                        <div class="cube-language-level">Speaking</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Left Face - Hobbies -->
              <div class="cube-face cube-face-left">
                <h3 class="cube-face-title">Hobbies</h3>
                <div class="cube-face-content">
                  <div class="cube-hobbies">
                    <div class="cube-hobby">
                      <div class="cube-hobby-icon">🎧</div>
                      <div class="cube-hobby-name">Audio Books</div>
                    </div>
                    <div class="cube-hobby">
                      <div class="cube-hobby-icon">🎵</div>
                      <div class="cube-hobby-name">Music</div>
                    </div>
                    <div class="cube-hobby">
                      <div class="cube-hobby-icon">▶</div>
                      <div class="cube-hobby-name">YouTube</div>
                    </div>
                    <div class="cube-hobby">
                      <div class="cube-hobby-icon">🎬</div>
                      <div class="cube-hobby-name">Anime</div>
                    </div>
                    <div class="cube-hobby">
                      <div class="cube-hobby-icon">♟️</div>
                      <div class="cube-hobby-name">Chess</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Top Face - Education -->
              <div class="cube-face cube-face-top">
                <h3 class="cube-face-title">Personal Information</h3>
                <div class="cube-face-content">
                  <ul class="cube-list">
                    <li class="cube-list-item">
                      <div class="cube-list-icon">💍</div>
                      <div class="cube-list-content">
                        <div class="cube-list-label">Marital Status</div>
                        <div class="cube-list-value">Married</div>
                      </div>
                    </li>
                    <li class="cube-list-item">
                      <div class="cube-list-icon">📆</div>
                      <div class="cube-list-content">
                        <div class="cube-list-label">Date of Birth</div>
                        <div class="cube-list-value">09 June 1998</div>
                      </div>
                    </li>
                    <li class="cube-list-item">
                      <div class="cube-list-icon">🌏</div>
                      <div class="cube-list-content">
                        <div class="cube-list-label">Nationality</div>
                        <div class="cube-list-value">Indian</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <!-- Bottom Face - Personal Info -->
              <div class="cube-face cube-face-bottom">
                <h3 class="cube-face-title">Education</h3>
                <div class="cube-face-content">
                  <ul class="cube-list">
                    <li class="cube-list-item">
                      <div class="cube-list-icon">🎓</div>
                      <div class="cube-list-content">
                        <div class="cube-list-label">BSc Mathematics (2015-2018)</div>
                        <div class="cube-list-value">Jairams Arts and Science College, Karur</div>
                      </div>
                    </li>
                    <li class="cube-list-item">
                      <div class="cube-list-icon">🏫</div>
                      <div class="cube-list-content">
                        <div class="cube-list-label">Higher Secondary (2013-2015)</div>
                        <div class="cube-list-value">Vivekanada Hr. Sec. School, Karur</div>
                      </div>
                    </li>
                    <li class="cube-list-item">
                      <div class="cube-list-icon">📚</div>
                      <div class="cube-list-content">
                        <div class="cube-list-label">SSLC (2013)</div>
                        <div class="cube-list-value">MPL Kumaran School, Karur</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

        // Store references to elements
        this.cube = this.shadowRoot.querySelector('#cube');
        this.cubeNavBtns = this.shadowRoot.querySelectorAll('.cube-nav-btn');
        this.scene = this.shadowRoot.querySelector('.scene');

        // Initialize cube properties
        this.isDragging = false;
        this.previousPosition = { x: 0, y: 0 };
        this.cubeRotation = { x: -15, y: 15 };
        this.touchDeltaX = 0;
        this.touchDeltaY = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.friction = 0.95;

        // Bind methods
        this.handleNavClick = this.handleNavClick.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.updateCubeRotation = this.updateCubeRotation.bind(this);
        this.updateCubeRotationSmooth = this.updateCubeRotationSmooth.bind(this);
        this.applyInertia = this.applyInertia.bind(this);
        this.animateInertia = this.animateInertia.bind(this);
    }

    connectedCallback() {
        // Add event listeners
        this.cubeNavBtns.forEach(btn => {
            btn.addEventListener('click', this.handleNavClick);
        });

        this.scene.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);

        this.scene.addEventListener('touchstart', this.handleTouchStart, { passive: false });
        document.addEventListener('touchmove', this.handleTouchMove, { passive: false });
        document.addEventListener('touchend', this.handleTouchEnd);
        document.addEventListener('touchcancel', this.handleTouchEnd);

        // Add fade-in animation
        this.addEventListener('component-visible', () => {
            const cubeContainer = this.shadowRoot.querySelector('.cube-container');
            cubeContainer.style.opacity = '0';
            cubeContainer.style.transform = 'translateY(20px)';
            cubeContainer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            setTimeout(() => {
                cubeContainer.style.opacity = '1';
                cubeContainer.style.transform = 'translateY(0)';
            }, 100);
        });
    }

    disconnectedCallback() {
        // Remove event listeners
        this.cubeNavBtns.forEach(btn => {
            btn.removeEventListener('click', this.handleNavClick);
        });

        this.scene.removeEventListener('mousedown', this.handleMouseDown);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);

        this.scene.removeEventListener('touchstart', this.handleTouchStart);
        document.removeEventListener('touchmove', this.handleTouchMove);
        document.removeEventListener('touchend', this.handleTouchEnd);
        document.removeEventListener('touchcancel', this.handleTouchEnd);
    }

    handleNavClick(e) {
        // Remove active class from all buttons
        this.cubeNavBtns.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        e.target.classList.add('active');

        // Get the face to show
        const face = e.target.getAttribute('data-face');

        // Set rotation based on the face
        let rotateX = 0;
        let rotateY = 0;

        switch (face) {
            case 'front':
                rotateX = -15;
                rotateY = 15;
                break;
            case 'back':
                rotateX = -15;
                rotateY = 195;
                break;
            case 'right':
                rotateX = -15;
                rotateY = 105;
                break;
            case 'left':
                rotateX = -15;
                rotateY = -75;
                break;
            case 'top':
                rotateX = 75;
                rotateY = 15;
                break;
            case 'bottom':
                rotateX = -105;
                rotateY = 15;
                break;
        }

        // Update cube rotation
        this.cubeRotation.x = rotateX;
        this.cubeRotation.y = rotateY;
        this.cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    handleMouseDown(e) {
        this.isDragging = true;
        this.previousPosition = { x: e.clientX, y: e.clientY };
        this.scene.style.cursor = 'grabbing';
    }

    handleMouseMove(e) {
        if (!this.isDragging) return;

        const deltaX = e.clientX - this.previousPosition.x;
        const deltaY = e.clientY - this.previousPosition.y;

        this.updateCubeRotation(deltaX, deltaY);
        this.previousPosition = { x: e.clientX, y: e.clientY };
    }

    handleMouseUp() {
        this.isDragging = false;
        this.scene.style.cursor = 'grab';
    }

    handleTouchStart(e) {
        if (e.touches.length === 1) {
            this.isDragging = true;
            this.previousPosition = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };

            // Add dragging class for visual feedback
            this.cube.classList.add('dragging');

            // Prevent default to avoid scrolling while rotating
            e.preventDefault();
        }
    }

    handleTouchMove(e) {
        if (!this.isDragging || e.touches.length !== 1) return;

        // Store deltas for animation frame
        this.touchDeltaX = e.touches[0].clientX - this.previousPosition.x;
        this.touchDeltaY = e.touches[0].clientY - this.previousPosition.y;

        this.previousPosition = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };

        // Cancel existing animation frame
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        // Request new frame for update
        this.animationFrameId = requestAnimationFrame(this.updateCubeRotationSmooth);

        // Prevent default to avoid scrolling
        e.preventDefault();
    }

    handleTouchEnd() {
        this.isDragging = false;
        this.cube.classList.remove('dragging');

        // Apply inertia effect
        this.applyInertia();
    }

    updateCubeRotation(deltaX, deltaY) {
        // Adjust sensitivity
        const sensitivity = 0.5;

        this.cubeRotation.y += deltaX * sensitivity;
        this.cubeRotation.x -= deltaY * sensitivity;

        // Optional: Add limits to rotation
        this.cubeRotation.x = Math.max(-180, Math.min(180, this.cubeRotation.x));

        this.cube.style.transform = `rotateX(${this.cubeRotation.x}deg) rotateY(${this.cubeRotation.y}deg)`;
    }

    updateCubeRotationSmooth() {
        // Apply damping for smoother movement
        const damping = 0.8;
        const sensitivity = 0.3;

        this.cubeRotation.y += this.touchDeltaX * sensitivity * damping;
        this.cubeRotation.x -= this.touchDeltaY * sensitivity * damping;

        // Apply transform with hardware acceleration
        this.cube.style.transform = `rotateX(${this.cubeRotation.x}deg) rotateY(${this.cubeRotation.y}deg)`;
        this.cube.style.willChange = 'transform';
    }

    applyInertia() {
        // Calculate velocity based on recent movement
        this.velocityX = this.touchDeltaX * 0.1;
        this.velocityY = this.touchDeltaY * 0.1;

        // Start inertia animation
        this.animateInertia();
    }

    animateInertia() {
        // Stop animation if velocity is very small
        if (Math.abs(this.velocityX) < 0.1 && Math.abs(this.velocityY) < 0.1) {
            this.cube.style.willChange = 'auto'; // Release hardware acceleration
            return;
        }

        // Apply velocity with friction
        this.cubeRotation.y += this.velocityX;
        this.cubeRotation.x -= this.velocityY;

        // Apply friction
        this.velocityX *= this.friction;
        this.velocityY *= this.friction;

        // Update cube rotation
        this.cube.style.transform = `rotateX(${this.cubeRotation.x}deg) rotateY(${this.cubeRotation.y}deg)`;

        // Continue animation
        this.inertiaFrameId = requestAnimationFrame(this.animateInertia.bind(this));
    }
}

customElements.define('cube-component', CubeComponent);