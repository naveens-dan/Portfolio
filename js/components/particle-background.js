// particle-background.js
class ParticleBackground extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
    <style>
      :host {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
      }
      
      .particle {
        position: absolute;
        will-change: transform;
        transition: transform 0.8s ease-out, opacity 0.8s ease-out;
        pointer-events: none;
      }
      
      .circle {
        border-radius: 50%;
      }
      
      .square {
        border-radius: 4px;
      }
      
      .triangle {
        width: 0 !important;
        height: 0 !important;
        background-color: transparent !important;
        border-left: 25px solid transparent;
        border-right: 25px solid transparent;
        border-bottom: 43px solid var(--color-primary, #6C5CE7);
      }
      
      .star {
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
      }
    </style>
  `;

    // Configuration
    this.config = {
      count: 30,
      minSize: 10,
      maxSize: 50,
      speed: 1,
      interactionRadius: 500,
      shapes: ['circle', 'square', 'triangle', 'star'],
      colors: [
        '#6C5CE7', '#00D2D3', '#FF7675', // Primary theme colors
        '#2ecc71', '#3498db', '#9b59b6',  // Additional colors
        '#e74c3c', '#f1c40f', '#1abc9c'   // More variety
      ],
      minOpacity: 0.05,
      maxOpacity: 0.2
    };

    // Mouse position tracking
    this.mouseX = 0;
    this.mouseY = 0;
    this.isMouseMoving = false;
    this.mouseMovingTimeout = null;

    // Particles array
    this.particles = [];

    // Bind methods
    this.createParticles = this.createParticles.bind(this);
    this.createParticle = this.createParticle.bind(this);
    this.animateParticles = this.animateParticles.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  connectedCallback() {
    // Create particles
    this.createParticles();

    // Start animation
    requestAnimationFrame(this.animateParticles);

    // Add event listeners
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('resize', this.handleResize);
  }

  disconnectedCallback() {
    // Clean up event listeners
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('resize', this.handleResize);
  }

  createParticles() {
    // Clear existing particles
    while (this.shadowRoot.firstChild.nextSibling) {
      this.shadowRoot.removeChild(this.shadowRoot.firstChild.nextSibling);
    }
    this.particles = [];

    // Create new particles
    for (let i = 0; i < this.config.count; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random shape
    const shape = this.config.shapes[Math.floor(Math.random() * this.config.shapes.length)];
    particle.classList.add(shape);

    // Random size
    const size = Math.random() * (this.config.maxSize - this.config.minSize) + this.config.minSize;

    // Random position
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    // Random opacity
    const opacity = Math.random() * (this.config.maxOpacity - this.config.minOpacity) + this.config.minOpacity;

    // Random color
    const color = this.config.colors[Math.floor(Math.random() * this.config.colors.length)];

    // Set styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.opacity = opacity.toString();

    if (shape === 'triangle') {
      // For triangles, set the border sizes proportionally to the particle size
      particle.style.borderLeftWidth = `${size / 2}px`;
      particle.style.borderRightWidth = `${size / 2}px`;
      particle.style.borderBottomWidth = `${size * 0.866}px`; // height of equilateral triangle
      particle.style.borderBottomColor = color;
    } else {
      particle.style.backgroundColor = color;
    }

    this.shadowRoot.appendChild(particle);

    // Store particle properties
    const particleObj = {
      element: particle,
      x: x,
      y: y,
      size: size,
      speedX: (Math.random() * 2 - 1) * this.config.speed,
      speedY: (Math.random() * 2 - 1) * this.config.speed,
      opacity: opacity,
      color: color,
      shape: shape,
      baseX: x,
      baseY: y,
      density: (Math.random() * 30) + 10,
      angle: Math.random() * 360 // For rotation
    };

    this.particles.push(particleObj);
    return particleObj;
  }

  animateParticles() {
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Boundary check with bounce effect
      if (particle.x > window.innerWidth || particle.x < 0) {
        particle.speedX *= -1;
      }

      if (particle.y > window.innerHeight || particle.y < 0) {
        particle.speedY *= -1;
      }

      // Mouse interaction
      if (this.isMouseMoving) {
        let dx = this.mouseX - particle.x;
        let dy = this.mouseY - particle.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.config.interactionRadius) {
          // Calculate force direction
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;

          // Calculate force strength
          const force = (this.config.interactionRadius - distance) / this.config.interactionRadius;

          // Apply force with density factor
          const directionX = forceDirectionX * force * particle.density * 0.2;
          const directionY = forceDirectionY * force * particle.density * 0.2;

          // Move particle away from mouse
          particle.x -= directionX;
          particle.y -= directionY;
        }
      } else {
        // Gradually return to base position when not affected by mouse
        particle.x += (particle.baseX - particle.x) * 0.01;
        particle.y += (particle.baseY - particle.y) * 0.01;
      }

      // Rotate particles (especially for squares, triangles, and stars)
      if (particle.shape !== 'circle') {
        particle.angle += 0.2 * (particle.size / this.config.maxSize); // Larger particles rotate slower
        const rotation = `rotate(${particle.angle}deg)`;
        particle.element.style.transform = rotation;
      }

      // Update particle position
      particle.element.style.left = `${particle.x}px`;
      particle.element.style.top = `${particle.y}px`;
    });

    requestAnimationFrame(this.animateParticles);
  }

  handleMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    this.isMouseMoving = true;

    // Reset the timeout on each mouse move
    clearTimeout(this.mouseMovingTimeout);
    this.mouseMovingTimeout = setTimeout(() => {
      this.isMouseMoving = false;
    }, 2000); // Consider mouse stopped after 2 seconds of inactivity
  }

  handleTouchMove(e) {
    if (e.touches[0]) {
      this.mouseX = e.touches[0].clientX;
      this.mouseY = e.touches[0].clientY;
      this.isMouseMoving = true;

      // Reset the timeout on each touch move
      clearTimeout(this.mouseMovingTimeout);
      this.mouseMovingTimeout = setTimeout(() => {
        this.isMouseMoving = false;
      }, 2000);
    }
  }

  handleResize() {
    this.particles.forEach(particle => {
      // Keep particles within the new window bounds
      if (particle.x > window.innerWidth) {
        particle.x = window.innerWidth * Math.random();
        particle.baseX = particle.x;
      }

      if (particle.y > window.innerHeight) {
        particle.y = window.innerHeight * Math.random();
        particle.baseY = particle.y;
      }
    });
  }
}

customElements.define('particle-background', ParticleBackground);