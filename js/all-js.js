function includeJS(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

// Array of JavaScript file URLs to include
const jsFiles = [
    'js/components/particle-background.js',
    'js/components/custom-cursor.js',
    'js/components/navbar.js',
    'js/components/search-panel.js',
    'js/components/mobile-menu.js',
    'js/components/hero-section.js',
    'js/components/projects-section.js',
    'js/components/about-section.js',
    'js/components/skills-section.js',
    'js/components/footer-section.js',
    'js/components/cube-component.js',
    'js/components/back-to-top.js',
    // Add more file URLs if needed
];

// Load each JavaScript file dynamically
Promise.all(jsFiles.map(includeJS))
    .then(() => {
        console.log('All JavaScript files included successfully.');
    })
    .catch(error => {
        console.error('Error loading JavaScript files:', error);
    });