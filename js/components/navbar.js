// navbar.js
class NavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
    <style>
      :host {
        --navbar-height: 80px;
        --navbar-height-scrolled: 60px;
        display: block;
        width: 100%;
        z-index: 1000;
      }
      
      .navbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        padding: var(--space-md, 24px) 0;
        transition: all var(--transition-fast, 0.2s);
        z-index: 1000;
      }
      
      .navbar.scrolled {
        background-color: var(--color-bg, #FFFFFF);
        box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
        padding: var(--space-xs, 8px) 0;
      }
      
      .navbar-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 1440px;
        margin: 0 auto;
        padding: 0 var(--space-md, 24px);
      }
      
      .logo {
        font-family: var(--font-heading, 'Space Grotesk', sans-serif);
        font-size: 2.4rem;
        font-weight: 700;
        color: var(--color-text-primary, #2D3436);
        display: flex;
        align-items: center;
        gap: var(--space-xs, 8px);
        z-index: 1002;
        text-decoration: none;
      }
      
      .logo-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        background-color: var(--color-accent, #FF7675);
        border-radius: 50%;
      }
      
      .nav-links {
        display: none;
        gap: var(--space-lg, 40px);
        list-style: none;
        margin: 0;
        padding: 0;
      }
      
      .nav-link {
        font-size: 1.6rem;
        font-weight: 500;
        color: var(--color-text-secondary, #636E72);
        position: relative;
        text-decoration: none;
      }
      
      .nav-link::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: var(--color-accent, #FF7675);
        transition: width var(--transition-fast, 0.2s);
      }
      
      .nav-link:hover {
        color: var(--color-text-primary, #2D3436);
      }
      
      .nav-link:hover::after {
        width: 100%;
      }
      
      .nav-controls {
        display: flex;
        align-items: center;
        gap: var(--space-md, 24px);
        z-index: 1002;
      }
      
      .search-toggle, .theme-toggle {
        background: none;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-text-primary, #2D3436);
        transition: all var(--transition-fast, 0.2s);
        font-size: 1.8rem;
        cursor: pointer;
      }
      
      .search-toggle:hover, .theme-toggle:hover {
        background-color: var(--color-surface, #efefef);
      }
      
      .theme-toggle {
        position: relative;
      }
      
      .theme-icon {
        position: absolute;
        transition: opacity 0.3s ease, transform 0.3s ease;
        font-size: 1.8rem;
      }
      
      .sun-icon {
        opacity: 1;
        transform: rotate(0);
      }
      
      .moon-icon {
        opacity: 0;
        transform: rotate(90deg);
      }
      
      :host-context([data-theme="dark"]) .sun-icon {
        opacity: 0;
        transform: rotate(-90deg);
      }
      
      :host-context([data-theme="dark"]) .moon-icon {
        opacity: 1;
        transform: rotate(0);
      }
      
      .hamburger {
        width: 30px;
        height: 24px;
        position: relative;
        cursor: pointer;
        z-index: 1002;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: none;
        border: none;
        padding: 0;
      }
      
      .hamburger span {
        display: block;
        height: 3px;
        background-color: var(--color-text-primary, #2D3436);
        border-radius: 3px;
        transition: all 0.3s ease;
      }
      
      .hamburger span:nth-child(1) {
        width: 70%;
        align-self: flex-end;
        border-radius: 3px 10px 10px 3px;
      }
      
      .hamburger span:nth-child(2) {
        width: 100%;
      }
      
      .hamburger span:nth-child(3) {
        width: 70%;
        align-self: flex-start;
        border-radius: 10px 3px 3px 10px;
      }
      
      .hamburger.active span:nth-child(1) {
        transform: translateY(10.5px) rotate(45deg);
        width: 100%;
        border-radius: 3px;
        align-self: center;
      }
      
      .hamburger.active span:nth-child(2) {
        opacity: 0;
        transform: translateX(-20px);
      }
      
      .hamburger.active span:nth-child(3) {
        transform: translateY(-10.5px) rotate(-45deg);
        width: 100%;
        border-radius: 3px;
        align-self: center;
      }
      
      @media (min-width: 992px) {
        .nav-links {
          display: flex;
        }
        
        .hamburger {
          display: none;
        }
      }
      
      @media (max-width: 991px) {
        .navbar-container {
          padding: 0 var(--space-sm, 16px);
        }
      }
    </style>
    
    <nav class="navbar" id="navbar">
      <div class="navbar-container">
        <a href="#" class="logo">
          Naveen S<span class="logo-dot"></span>
        </a>
        <ul class="nav-links">
          <li><a href="#home" class="nav-link">Home</a></li>
          <li><a href="#projects" class="nav-link">Projects</a></li>
          <li><a href="#about" class="nav-link">About</a></li>
          <li><a href="#skills" class="nav-link">Skills</a></li>
          <li><a href="#footer" class="nav-link">Contact</a></li>
        </ul>
        <div class="nav-controls">
          <button class="search-toggle" id="search-toggle" aria-label="Search">
            🔎︎
          </button>
          <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
            <span class="theme-icon sun-icon">⛅</span>
            <span class="theme-icon moon-icon">🌙</span>
          </button>
          <button class="hamburger" id="hamburger" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  `;

    // Store references to elements
    this.navbar = this.shadowRoot.querySelector('#navbar');
    this.hamburger = this.shadowRoot.querySelector('#hamburger');
    this.themeToggle = this.shadowRoot.querySelector('#theme-toggle');
    this.searchToggle = this.shadowRoot.querySelector('#search-toggle');

    // Bind methods
    this.handleScroll = this.handleScroll.bind(this);
    this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
    this.handleThemeToggle = this.handleThemeToggle.bind(this);
    this.handleSearchToggle = this.handleSearchToggle.bind(this);
  }

  connectedCallback() {
    // Add event listeners
    window.addEventListener('scroll', this.handleScroll);
    this.hamburger.addEventListener('click', this.handleHamburgerClick);
    this.themeToggle.addEventListener('click', this.handleThemeToggle);
    this.searchToggle.addEventListener('click', this.handleSearchToggle);

    // Check initial scroll position
    this.handleScroll();
  }

  disconnectedCallback() {
    // Remove event listeners
    window.removeEventListener('scroll', this.handleScroll);
    this.hamburger.removeEventListener('click', this.handleHamburgerClick);
    this.themeToggle.removeEventListener('click', this.handleThemeToggle);
    this.searchToggle.removeEventListener('click', this.handleSearchToggle);
  }

  handleScroll() {
    if (window.scrollY > 50) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  }

  handleHamburgerClick() {
    this.hamburger.classList.toggle('active');

    // Dispatch custom event for mobile menu toggle
    const event = new CustomEvent('mobile-menu-toggle', {
      bubbles: true,
      composed: true,
      detail: { isOpen: this.hamburger.classList.contains('active') }
    });
    this.dispatchEvent(event);
  }

  handleThemeToggle() {
    // Dispatch custom event for theme toggle
    const event = new CustomEvent('theme-toggle', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  handleSearchToggle() {
    // Dispatch custom event for search toggle
    const event = new CustomEvent('search-toggle', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }
}

customElements.define('nav-bar', NavBar);