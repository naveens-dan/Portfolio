// back-to-top.js
class BackToTop extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: block;
      }
      
      .back-to-top {
        position: fixed;
        bottom: var(--space-lg, 40px);
        right: var(--space-lg, 40px);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--color-primary, #6C5CE7);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all var(--transition-fast, 0.2s);
        z-index: 99;
        box-shadow: 0 5px 15px rgba(108, 92, 231, 0.3);
        border: none;
      }
      
      .back-to-top.visible {
        opacity: 1;
        visibility: visible;
      }
      
      .back-to-top:hover {
        background-color: var(--color-accent, #FF7675);
        transform: translateY(-5px);
      }
      
      svg {
        width: 24px;
        height: 24px;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        fill: none;
      }
    </style>
    
    <button class="back-to-top" id="back-to-top" aria-label="Back to top">
      <svg viewBox="0 0 24 24">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  `;

    // Store references to elements
    this.backToTopBtn = this.shadowRoot.querySelector('#back-to-top');

    // Bind methods
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  connectedCallback() {
    // Add event listeners
    window.addEventListener('scroll', this.handleScroll);
    this.backToTopBtn.addEventListener('click', this.scrollToTop);
  }

  disconnectedCallback() {
    // Remove event listeners
    window.removeEventListener('scroll', this.handleScroll);
    this.backToTopBtn.removeEventListener('click', this.scrollToTop);
  }

  handleScroll() {
    if (window.scrollY > 500) {
      this.backToTopBtn.classList.add('visible');
    } else {
      this.backToTopBtn.classList.remove('visible');
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

customElements.define('back-to-top', BackToTop);