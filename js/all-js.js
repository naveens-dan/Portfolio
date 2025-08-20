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
    'js/jquery.3.4.1.js',
    'js/fancybox/fancybox.min.js',
    'js/copy.js',
    'js/popup.js',
    'js/main-menu.js',
    'nave-links.js',
    'js/RW-Helpline.js',
    'js/tab-block.js',
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