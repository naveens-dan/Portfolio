// search-panel.js
class SearchPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: block;
        z-index: 1005;
      }
      
      .search-panel {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--color-bg, #FFFFFF);
        padding: var(--space-xl, 64px);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-20px);
        transition: all var(--transition-medium, 0.4s);
        z-index: 1005;
        display: flex;
        flex-direction: column;
      }
      
      .search-panel.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      
      .search-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-lg, 40px);
      }
      
      .search-title {
        font-family: var(--font-heading, 'Space Grotesk', sans-serif);
        font-size: 2.4rem;
        font-weight: 700;
        color: var(--color-text-primary, #2D3436);
        margin: 0;
      }
      
      .search-close {
        background: none;
        border: none;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-text-primary, #2D3436);
        transition: all var(--transition-fast, 0.2s);
        font-size: 2.4rem;
      }
      
      .search-close:hover {
        background-color: var(--color-surface, #efefef);
      }
      
      .search-form {
        display: flex;
        align-items: center;
        background-color: var(--color-surface, #efefef);
        border-radius: 8px;
        padding: var(--space-sm, 16px);
        margin-bottom: var(--space-lg, 40px);
      }
      
      .search-input {
        flex: 1;
        border: none;
        background: transparent;
        padding: var(--space-sm, 16px);
        font-size: 1.8rem;
        color: var(--color-text-primary, #2D3436);
        font-family: var(--font-body, 'Inter', sans-serif);
      }
      
      .search-input:focus {
        outline: none;
      }
      
      .search-submit {
        background: none;
        border: none;
        color: var(--color-text-secondary, #636E72);
        cursor: pointer;
        padding: var(--space-sm, 16px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
      }
      
      .search-submit:hover {
        color: var(--color-primary, #6C5CE7);
      }
      
      .search-results {
        flex: 1;
        overflow-y: auto;
      }
      
      .search-result {
        padding: var(--space-md, 24px);
        border-radius: 8px;
        margin-bottom: var(--space-sm, 16px);
        cursor: pointer;
        transition: all var(--transition-fast, 0.2s);
        border: 1px solid var(--color-border, #DFE6E9);
      }
      
      .search-result:hover {
        background-color: var(--color-surface, #efefef);
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }
      
      .search-result-title {
        font-weight: 600;
        margin-bottom: 4px;
        color: var(--color-text-primary, #2D3436);
        font-size: 1.8rem;
      }
      
      .search-result-category {
        font-size: 1.4rem;
        color: var(--color-accent, #FF7675);
        margin-bottom: 8px;
        display: inline-block;
        padding: 2px 8px;
        background-color: rgba(255, 118, 117, 0.1);
        border-radius: 4px;
      }
      
      .search-result-snippet {
        font-size: 1.6rem;
        color: var(--color-text-secondary, #636E72);
        line-height: 1.6;
      }
      
      .search-highlight {
        background-color: rgba(108, 92, 231, 0.2);
        padding: 0 2px;
        border-radius: 2px;
        font-weight: 500;
      }
      
      .search-empty {
        text-align: center;
        padding: var(--space-xl, 64px);
        color: var(--color-text-secondary, #636E72);
        font-size: 1.8rem;
      }
      
      .search-info {
        text-align: center;
        padding: var(--space-xl, 64px);
        color: var(--color-text-secondary, #636E72);
        font-size: 1.6rem;
      }
      
      @media (max-width: 768px) {
        .search-panel {
          padding: var(--space-lg, 40px) var(--space-md, 24px);
        }
      }
    </style>
    
    <div class="search-panel" id="search-panel">
      <div class="search-header">
        <h2 class="search-title">Search</h2>
        <button class="search-close" id="search-close" aria-label="Close search">×</button>
      </div>
      <form class="search-form" id="search-form">
        <input type="text" class="search-input" id="search-input" placeholder="Type to search..." autocomplete="off">
        <button type="submit" class="search-submit">
          🔎︎
        </button>
      </form>
      <div class="search-results" id="search-results">
        <div class="search-info">Start typing to search through the entire site content...</div>
      </div>
    </div>
  `;

    // Store references to elements
    this.searchPanel = this.shadowRoot.querySelector('#search-panel');
    this.searchClose = this.shadowRoot.querySelector('#search-close');
    this.searchForm = this.shadowRoot.querySelector('#search-form');
    this.searchInput = this.shadowRoot.querySelector('#search-input');
    this.searchResults = this.shadowRoot.querySelector('#search-results');

    // Bind methods
    this.toggleSearch = this.toggleSearch.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.performSearch = this.performSearch.bind(this);
    this.extractPageContent = this.extractPageContent.bind(this);
    this.searchPageContent = this.searchPageContent.bind(this);
    this.displaySearchResults = this.displaySearchResults.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  connectedCallback() {
    // Add event listeners
    this.searchClose.addEventListener('click', this.closeSearch);
    this.searchForm.addEventListener('submit', this.handleSubmit);
    this.searchInput.addEventListener('input', this.handleInput);
    document.addEventListener('keydown', this.handleKeyDown);

    // Listen for search toggle events
    document.addEventListener('search-toggle', this.toggleSearch);
  }

  disconnectedCallback() {
    // Remove event listeners
    this.searchClose.removeEventListener('click', this.closeSearch);
    this.searchForm.removeEventListener('submit', this.handleSubmit);
    this.searchInput.removeEventListener('input', this.handleInput);
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('search-toggle', this.toggleSearch);
  }

  toggleSearch() {
    this.searchPanel.classList.toggle('active');

    if (this.searchPanel.classList.contains('active')) {
      // Focus search input after transition
      setTimeout(() => {
        this.searchInput.focus();
      }, 300);
    }
  }

  closeSearch() {
    this.searchPanel.classList.remove('active');
  }

  handleSubmit(e) {
    e.preventDefault();
    this.performSearch();
  }

  handleInput() {
    // Debounce search input
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.performSearch();
    }, 300);
  }

  handleKeyDown(e) {
    // Close search panel with Escape key
    if (e.key === 'Escape' && this.searchPanel.classList.contains('active')) {
      this.closeSearch();
    }
  }

  performSearch() {
    const query = this.searchInput.value.trim().toLowerCase();

    if (query.length < 2) {
      this.searchResults.innerHTML = '<div class="search-info">Start typing to search through the entire site content...</div>';
      return;
    }

    // Extract all text content from the page
    const pageContent = this.extractPageContent();

    // Filter content based on search query
    const results = this.searchPageContent(pageContent, query);

    // Display results
    this.displaySearchResults(results, query);
  }

  extractPageContent() {
    const content = [];

    // Extract all text from the page
    document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, span, button, .skill-item, .project-title, .project-description, .project-tag, .testimonial-quote, .form-label, .btn, .section-title, .section-subtitle, .hero-title, .hero-subtitle, .footer-text, .copyright, .cube-list-label, .cube-list-value, .cube-face-title, .cube-objective, .cube-language-name, .cube-language-level, .cube-hobby-name').forEach(element => {
      // Skip elements in the search panel itself
      if (element.closest('search-panel')) {
        return;
      }

      const text = element.textContent.trim();
      if (text.length > 1) {
        // Determine the category based on element type or class
        let category = element.tagName;
        let section = 'General';

        // Find the closest section
        const parentSection = element.closest('section, [id]');
        if (parentSection && parentSection.id) {
          section = parentSection.id.charAt(0).toUpperCase() + parentSection.id.slice(1);
        }

        // More specific categorization
        if (element.classList.contains('project-title')) {
          category = 'Project';
        } else if (element.classList.contains('skill-item')) {
          category = 'Skill';
        } else if (element.classList.contains('testimonial-quote')) {
          category = 'Testimonial';
        } else if (element.classList.contains('btn')) {
          category = 'Button';
        } else if (element.classList.contains('section-title')) {
          category = 'Section';
        }

        // Get the element's URL (for navigation)
        let url = '#';
        if (parentSection && parentSection.id) {
          url = '#' + parentSection.id;
        } else if (element.closest('[id]')) {
          url = '#' + element.closest('[id]').id;
        }

        // Get surrounding context
        let context = text;
        const parentParagraph = element.closest('p');
        if (parentParagraph) {
          context = parentParagraph.textContent.trim();
        }

        content.push({
          text: text,
          element: element,
          category: category,
          section: section,
          url: url,
          context: context
        });
      }
    });

    return content;
  }

  searchPageContent(content, query) {
    const results = [];

    content.forEach(item => {
      if (item.text.toLowerCase().includes(query) ||
        item.context.toLowerCase().includes(query)) {

        // Calculate relevance score
        let score = 0;

        // Exact match in text
        if (item.text.toLowerCase() === query) {
          score += 10;
        }
        // Text starts with query
        else if (item.text.toLowerCase().startsWith(query)) {
          score += 8;
        }
        // Text contains query
        else if (item.text.toLowerCase().includes(query)) {
          score += 5;
        }
        // Context contains query
        else if (item.context.toLowerCase().includes(query)) {
          score += 3;
        }

        // Boost score for headings and important elements
        if (item.element.tagName.startsWith('H')) {
          score += 3;
        }

        // Boost score for project titles and section titles
        if (item.category === 'Project' || item.category === 'Section') {
          score += 2;
        }

        results.push({
          ...item,
          score: score
        });
      }
    });

    // Sort by relevance score (highest first)
    return results.sort((a, b) => b.score - a.score);
  }

  displaySearchResults(results, query) {
    this.searchResults.innerHTML = '';

    if (results.length === 0) {
      this.searchResults.innerHTML = '<div class="search-empty">No results found for "' + query + '"</div>';
      return;
    }

    // Group results by section
    const groupedResults = {};
    results.forEach(result => {
      if (!groupedResults[result.section]) {
        groupedResults[result.section] = [];
      }
      groupedResults[result.section].push(result);
    });

    // Display results by section
    for (const section in groupedResults) {
      // Take only top 3 results per section
      const sectionResults = groupedResults[section].slice(0, 3);

      sectionResults.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.className = 'search-result';

        // Highlight the query in the text
        let highlightedText = result.text;
        const queryRegex = new RegExp(`(${query})`, 'gi');
        highlightedText = highlightedText.replace(queryRegex, '<span class="search-highlight">$1</span>');

        // Get context snippet with highlighted query
        let contextSnippet = result.context;
        if (contextSnippet.length > 100) {
          // Find the position of the query in the context
          const queryPos = contextSnippet.toLowerCase().indexOf(query.toLowerCase());
          if (queryPos !== -1) {
            // Create a snippet centered around the query
            const startPos = Math.max(0, queryPos - 40);
            const endPos = Math.min(contextSnippet.length, queryPos + query.length + 40);
            contextSnippet = (startPos > 0 ? '...' : '') +
              contextSnippet.substring(startPos, endPos) +
              (endPos < contextSnippet.length ? '...' : '');
          } else {
            // If query not found in context, just take the first 100 chars
            contextSnippet = contextSnippet.substring(0, 100) + '...';
          }
        }

        // Highlight the query in the context
        contextSnippet = contextSnippet.replace(queryRegex, '<span class="search-highlight">$1</span>');

        resultElement.innerHTML = `
        <div class="search-result-title">${highlightedText}</div>
        <div class="search-result-category">${result.category} in ${result.section}</div>
        <div class="search-result-snippet">${contextSnippet}</div>
      `;

        resultElement.addEventListener('click', () => {
          this.closeSearch();

          // Scroll to the element
          const targetElement = result.element;
          if (targetElement) {
            setTimeout(() => {
              const navbarHeight = 80; // Approximate navbar height
              const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });

              // Highlight the element briefly
              targetElement.style.transition = 'background-color 0.5s ease';
              const originalBg = window.getComputedStyle(targetElement).backgroundColor;
              targetElement.style.backgroundColor = 'rgba(108, 92, 231, 0.2)';

              setTimeout(() => {
                targetElement.style.backgroundColor = originalBg;
                setTimeout(() => {
                  targetElement.style.transition = '';
                }, 500);
              }, 1500);
            }, 300);
          }
        });

        this.searchResults.appendChild(resultElement);
      });
    }
  }
}

customElements.define('search-panel', SearchPanel);