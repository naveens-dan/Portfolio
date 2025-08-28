// mobile-menu.js
class MobileMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: block;
        z-index: 999;
      }
      
      .mobile-menu {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: var(--color-bg, #FFFFFF);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all var(--transition-medium, 0.4s);
        transform: translateY(-20px);
      }
      
      .mobile-menu.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      
      .mobile-nav-links {
        list-style: none;
        text-align: center;
        padding: 0;
        margin: 0;
      }
      
      .mobile-nav-link {
        margin-bottom: var(--space-lg, 40px);
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.4s ease;
      }
      
      .mobile-menu.active .mobile-nav-link {
        opacity: 1;
        transform: translateY(0);
      }
      
      .mobile-menu.active .mobile-nav-link:nth-child(1) {
        transition-delay: 0.1s;
      }
      
      .mobile-menu.active .mobile-nav-link:nth-child(2) {
        transition-delay: 0.2s;
      }
      
      .mobile-menu.active .mobile-nav-link:nth-child(3) {
        transition-delay: 0.3s;
      }
      
      .mobile-menu.active .mobile-nav-link:nth-child(4) {
        transition-delay: 0.4s;
      }
      
      .mobile-menu.active .mobile-nav-link:nth-child(5) {
        transition-delay: 0.5s;
      }
      
      .mobile-nav-link a {
        font-family: var(--font-heading, 'Space Grotesk', sans-serif);
        font-size: 3.2rem;
        font-weight: 700;
        color: var(--color-text-primary, #2D3436);
        text-decoration: none;
      }
    </style>
    
    <div class="mobile-menu" id="mobile-menu">
      <ul class="mobile-nav-links">
        <li class="mobile-nav-link"><a href="#home">Home</a></li>
        <li class="mobile-nav-link"><a href="#projects">Projects</a></li>
        <li class="mobile-nav-link"><a href="#about">About</a></li>
        <li class="mobile-nav-link"><a href="#skills">Skills</a></li>
        <li class="mobile-nav-link"><a href="#footer">Contact</a></li>
      </ul>
    </div>
  `;

    // Store references to elements
    this.mobileMenu = this.shadowRoot.querySelector('#mobile-menu');
    this.mobileLinks = this.shadowRoot.querySelectorAll('.mobile-nav-link a');

    // Bind methods
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  connectedCallback() {
    // Add event listeners
    this.mobileLinks.forEach(link => {
      link.addEventListener('click', this.handleLinkClick);
    });
  }

  disconnectedCallback() {
    // Remove event listeners
    this.mobileLinks.forEach(link => {
      link.removeEventListener('click', this.handleLinkClick);
    });
  }

  openMenu() {
    this.mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  closeMenu() {
    this.mobileMenu.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling

    // Dispatch event to reset hamburger icon
    const event = new CustomEvent('mobile-menu-closed', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  handleLinkClick() {
    this.closeMenu();
  }
}

customElements.define('mobile-menu', MobileMenu);