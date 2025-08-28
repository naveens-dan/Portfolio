// footer-section.js
class FooterSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: block;
        position: relative;
        overflow: hidden;
      }
      
      .footer {
        position: relative;
        padding-bottom: var(--space-lg, 40px);
      }
      
      .copyright-container {
        text-align: center;
        padding: var(--space-lg, 40px) 0;
        border-top: 1px solid var(--color-border, #DFE6E9);
        margin-top: var(--space-lg, 40px);
        color: var(--color-text-secondary, #636E72);
        font-size: 1.4rem;
      }
      
      ::slotted(.copyright) {
        text-align: center;
        color: var(--color-text-secondary, #636E72);
        font-size: 1.4rem;
        margin: 0;
      }
    </style>
    
    <footer class="footer">
      <slot></slot>
    </footer>
  `;
    }

    connectedCallback() {
        // Add fade-in animation
        this.addEventListener('component-visible', () => {
            const footer = this.shadowRoot.querySelector('.footer');
            footer.style.opacity = '0';
            footer.style.transform = 'translateY(20px)';
            footer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            setTimeout(() => {
                footer.style.opacity = '1';
                footer.style.transform = 'translateY(0)';
            }, 100);
        });
    }
}

customElements.define('footer-section', FooterSection);