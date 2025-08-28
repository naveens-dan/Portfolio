// cursor.js - Direct JavaScript implementation

// Function to initialize the custom cursor
function initCustomCursor() {
// Skip on touch devices
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  return;
}

// Create cursor elements
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';

const cursorText = document.createElement('div');
cursorText.className = 'custom-cursor-text';

cursor.appendChild(cursorText);
document.body.appendChild(cursor);

// Add styles
const style = document.createElement('style');
style.textContent = `
  .custom-cursor {
    position: fixed;
    width: 10px;
    height: 30px;
    border-radius: 10px;
    background-color: var(--color-accent, #FF7675);
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 9999;
    opacity: 0.9;
    transition: width 0.3s, height 0.3s, opacity 0.3s, background-color 0.3s;
    mix-blend-mode: difference;
  }
  
  .custom-cursor.active {
    width: 50px;
    height: 50px;
    opacity: 0.2;
  }
  
  .custom-cursor.hover-link {
    width: 40px;
    height: 40px;
    background-color: var(--color-primary, #6C5CE7);
    opacity: 0.3;
    border-radius: 50%;
  }
  
  .custom-cursor.hover-image {
    width: 80px;
    height: 80px;
    background-color: transparent;
    border: 2px solid var(--color-accent, #FF7675);
    opacity: 0.8;
  }
  
  .custom-cursor.hover-button {
    width: 60px;
    height: 60px;
    background-color: var(--color-primary, #6C5CE7);
    opacity: 0.2;
    border-radius: 50%;
  }
  
  .custom-cursor.text-select {
    width: 10px;
    height: 30px;
    border-radius: 2px;
    opacity: 0.8;
  }
  
  .custom-cursor-text {
    position: absolute;
    color: white;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.3s, transform 0.3s;
  }
  
  .custom-cursor.with-text .custom-cursor-text {
    opacity: 1;
    text-align: center;
    font-size: 60px;
    transform: translateY(0);
  }
  
  @keyframes rotate {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
  
  .rotate-effect {
    animation: rotate 2s linear infinite;
  }
  
  .glow-effect {
    box-shadow: 0 0 15px var(--color-primary, #6C5CE7);
  }
  
  /* Hide default cursor */
  html, body, a, button, input, textarea, select, 
  .btn, .nav-link, .social-link, .footer-link, 
  img, .project-thumbnail, .about-image, .img-container,
  p, h1, h2, h3, h4, h5, h6, 
  .section-title, .section-subtitle, .hero-title, .hero-subtitle,
  .project-card, .filter-btn, .timeline-item, .skill-item,
  .hamburger, .theme-toggle, .search-toggle, .back-to-top {
    cursor: none !important;
  }
`;
document.head.appendChild(style);

// Track mouse position
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Mouse movement with smooth follow
document.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animate cursor with slight lag for smooth effect
function animateCursor() {
  const speed = 0.2; // Adjust for faster/slower follow
  
  cursorX += (mouseX - cursorX) * speed;
  cursorY += (mouseY - cursorY) * speed;
  
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  
  requestAnimationFrame(animateCursor);
}

animateCursor();

// 1. Button Hover Effects - Circle Effect with Glow emoji
const buttons = document.querySelectorAll('.btn, button, [role="button"], .hamburger, .theme-toggle, .search-toggle, .back-to-top, .filter-btn, .cube-nav-btn, .resume-download');
buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    cursor.classList.add('with-text', 'glow-effect', 'hover-button');
    cursorText.textContent = '';
    cursor.style.width = '50px';
    cursor.style.height = '50px';
    cursor.style.borderRadius = '50%';
    cursor.style.border = '2px solid var(--color-primary, #6C5CE7)';
    cursor.style.backgroundColor = 'rgba(108, 92, 231, 0.1)';
  });
  
  button.addEventListener('mouseleave', () => {
    cursor.classList.remove('with-text', 'glow-effect', 'hover-button');
    cursorText.textContent = '';
    cursor.style.width = '';
    cursor.style.height = '';
    cursor.style.borderRadius = '';
    cursor.style.border = '';
    cursor.style.backgroundColor = '';
  });
});

// 2. Image Hover Effects - Frame Effect
const images = document.querySelectorAll('img, .project-thumbnail, .about-image, .img-container, .gallery-item, .project-card');
images.forEach(image => {
  image.addEventListener('mouseenter', () => {
    cursor.classList.add('hover-image');
    cursor.style.width = '80px';
    cursor.style.height = '80px';
    cursor.style.borderRadius = '8px';
    cursor.style.border = '2px solid var(--color-secondary, #00D2D3)';
    cursor.style.backgroundColor = 'transparent';
  });
  
  image.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover-image');
    cursor.style.width = '';
    cursor.style.height = '';
    cursor.style.borderRadius = '';
    cursor.style.border = '';
    cursor.style.backgroundColor = '';
  });
});

// 3. Text Hover Effects - Rotate Animation
const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, .section-title, .section-subtitle, .hero-title, .hero-subtitle, .timeline-title, .timeline-company, .timeline-date, .skill-item, .stat-item');
textElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursor.classList.add('rotate-effect');
    cursor.style.backgroundColor = 'rgba(0, 210, 211, 0.8)';
    cursor.style.width = '40px';
    cursor.style.height = '40px';
    cursor.style.borderRadius = '5px';
  });
  
  element.addEventListener('mouseleave', () => {
    cursor.classList.remove('rotate-effect');
    cursor.style.backgroundColor = '';
    cursor.style.width = '';
    cursor.style.height = '';
    cursor.style.borderRadius = '';
  });
});

// 4. Link Hover Effects - Select Effect
const links = document.querySelectorAll('a:not(.btn), .nav-link, .social-link, .footer-link, .mobile-nav-link a, .project-link, .contact-link');
links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    cursor.classList.add('hover-link');
    cursor.style.width = '15px';
    cursor.style.height = '15px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'var(--color-secondary, #00D2D3)';
    cursor.style.opacity = '0.5';
  });
  
  link.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover-link');
    cursor.style.width = '';
    cursor.style.height = '';
    cursor.style.borderRadius = '';
    cursor.style.backgroundColor = '';
    cursor.style.opacity = '';
  });
});

// 5. Form Elements - Input Effect
const formElements = document.querySelectorAll('input, textarea, select, .form-control, .search-input');
formElements.forEach(input => {
  input.addEventListener('mouseenter', () => {
    cursor.classList.add('form-hover');
    cursor.style.width = '15px';
    cursor.style.height = '15px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'var(--color-secondary, #00D2D3)';
    cursor.style.opacity = '0.5';
  });
  
  input.addEventListener('focus', () => {
    cursor.classList.add('form-focus');
    cursor.style.width = '5px';
    cursor.style.height = '25px';
    cursor.style.borderRadius = '2px';
    cursor.style.backgroundColor = 'var(--color-accent, #FF7675)';
    cursor.style.opacity = '0.7';
  });
  
  input.addEventListener('mouseleave', () => {
    if (!input.matches(':focus')) {
      cursor.classList.remove('form-hover');
      cursor.style.width = '';
      cursor.style.height = '';
      cursor.style.borderRadius = '';
      cursor.style.backgroundColor = '';
      cursor.style.opacity = '';
    }
  });
  
  input.addEventListener('blur', () => {
    cursor.classList.remove('form-focus');
    cursor.style.width = '';
    cursor.style.height = '';
    cursor.style.borderRadius = '';
    cursor.style.backgroundColor = '';
    cursor.style.opacity = '';
  });
});

// Special handling for theme toggle and search toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('mouseenter', () => {
    cursor.classList.add('hover-link');
    cursor.style.width = '15px';
    cursor.style.height = '15px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'var(--color-secondary, #00D2D3)';
    cursor.style.opacity = '0.5';
  });
  
  themeToggle.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover-link');
    cursor.style.width = '';
    cursor.style.height = '';
    cursor.style.borderRadius = '';
    cursor.style.backgroundColor = '';
    cursor.style.opacity = '';
  });
}

const searchToggle = document.getElementById('search-toggle');
if (searchToggle) {
  searchToggle.addEventListener('mouseenter', () => {
    cursor.classList.add('hover-link');
    cursor.style.width = '15px';
    cursor.style.height = '15px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'var(--color-secondary, #00D2D3)';
    cursor.style.opacity = '0.5';
  });
  
  searchToggle.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover-link');
    cursor.style.width = '';
    cursor.style.height = '';
    cursor.style.borderRadius = '';
    cursor.style.backgroundColor = '';
    cursor.style.opacity = '';
  });
}

// Setup MutationObserver for dynamically added elements
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.addedNodes.length) {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          addEventListenersToElement(node, cursor, cursorText);
          
          // Also check children
          node.querySelectorAll('*').forEach(child => {
            addEventListenersToElement(child, cursor, cursorText);
          });
        }
      });
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });

// Function to add event listeners to dynamically added elements
function addEventListenersToElement(element, cursor, cursorText) {
  // Button elements
  if (element.matches('.btn, button, [role="button"], .hamburger, .theme-toggle, .search-toggle, .back-to-top, .filter-btn, .cube-nav-btn, .resume-download')) {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('with-text', 'glow-effect', 'hover-button');
      cursorText.textContent = '';
      cursor.style.width = '50px';
      cursor.style.height = '50px';
      cursor.style.borderRadius = '50%';
      cursor.style.border = '2px solid var(--color-primary, #6C5CE7)';
      cursor.style.backgroundColor = 'rgba(108, 92, 231, 0.1)';
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('with-text', 'glow-effect', 'hover-button');
      cursorText.textContent = '';
      cursor.style.width = '';
      cursor.style.height = '';
      cursor.style.borderRadius = '';
      cursor.style.border = '';
      cursor.style.backgroundColor = '';
    });
  }
  
  // Image elements
  else if (element.matches('img, .project-thumbnail, .about-image, .img-container, .gallery-item, .project-card')) {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('hover-image');
      cursor.style.width = '80px';
      cursor.style.height = '80px';
      cursor.style.borderRadius = '8px';
      cursor.style.border = '2px solid var(--color-secondary, #00D2D3)';
      cursor.style.backgroundColor = 'transparent';
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover-image');
      cursor.style.width = '';
      cursor.style.height = '';
      cursor.style.borderRadius = '';
      cursor.style.border = '';
      cursor.style.backgroundColor = '';
    });
  }
  
  // Text elements
  else if (element.matches('p, h1, h2, h3, h4, h5, h6, .section-title, .section-subtitle, .hero-title, .hero-subtitle, .timeline-title, .timeline-company, .timeline-date, .skill-item, .stat-item')) {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('rotate-effect');
      cursor.style.backgroundColor = 'rgba(0, 210, 211, 0.8)';
      cursor.style.width = '40px';
      cursor.style.height = '40px';
      cursor.style.borderRadius = '5px';
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('rotate-effect');
      cursor.style.backgroundColor = '';
      cursor.style.width = '';
      cursor.style.height = '';
      cursor.style.borderRadius = '';
    });
  }
  
  // Link elements
  else if (element.matches('a:not(.btn), .nav-link, .social-link, .footer-link, .mobile-nav-link a, .project-link, .contact-link')) {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('hover-link');
      cursor.style.width = '15px';
      cursor.style.height = '15px';
      cursor.style.borderRadius = '50%';
      cursor.style.backgroundColor = 'var(--color-secondary, #00D2D3)';
      cursor.style.opacity = '0.5';
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover-link');
      cursor.style.width = '';
      cursor.style.height = '';
      cursor.style.borderRadius = '';
      cursor.style.backgroundColor = '';
      cursor.style.opacity = '';
    });
  }
  
  // Form elements
  else if (element.matches('input, textarea, select, .form-control, .search-input')) {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('form-hover');
      cursor.style.width = '15px';
      cursor.style.height = '15px';
      cursor.style.borderRadius = '50%';
      cursor.style.backgroundColor = 'var(--color-secondary, #00D2D3)';
      cursor.style.opacity = '0.5';
    });
    
    element.addEventListener('focus', () => {
      cursor.classList.add('form-focus');
      cursor.style.width = '5px';
      cursor.style.height = '25px';
      cursor.style.borderRadius = '2px';
      cursor.style.backgroundColor = 'var(--color-accent, #FF7675)';
      cursor.style.opacity = '0.7';
    });
    
    element.addEventListener('mouseleave', () => {
      if (!element.matches(':focus')) {
        cursor.classList.remove('form-hover');
        cursor.style.width = '';
        cursor.style.height = '';
        cursor.style.borderRadius = '';
        cursor.style.backgroundColor = '';
        cursor.style.opacity = '';
      }
    });
    
    element.addEventListener('blur', () => {
      cursor.classList.remove('form-focus');
      cursor.style.width = '';
      cursor.style.height = '';
      cursor.style.borderRadius = '';
      cursor.style.backgroundColor = '';
      cursor.style.opacity = '';
    });
  }
}

// Return a cleanup function
return {
  destroy: function() {
    // Remove cursor element
    if (cursor && cursor.parentNode) {
      cursor.parentNode.removeChild(cursor);
    }
    
    // Remove style element
    if (style && style.parentNode) {
      style.parentNode.removeChild(style);
    }
    
    // Disconnect observer
    observer.disconnect();
    
    // Remove event listeners (not all can be removed easily)
    document.removeEventListener('mousemove', animateCursor);
  }
};
}

// Initialize the cursor when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
const customCursor = initCustomCursor();

// Optional: Store the cursor instance for later cleanup
window.customCursor = customCursor;
});