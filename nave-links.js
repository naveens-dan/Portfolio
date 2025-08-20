// custom-elements.js
class AppHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<a href="index.html"><span>Home</span></a>
<a href="leads-repost.html"><span>LeadsRepost</span></a>
<a href="email-naming.html"><span>Naming</span></a>
<a href="email.html"><span>Email</span></a>
<a href="email-oft.html"><span>OFT</span></a>
<a href="segments.html"><span>Segments</span></a>
<a href="segments-picklist.html"><span>Picklist</span></a>
<a href="!samples.html" tar>Do not Press ☢️</a>
 `
    }
}
window.customElements.define('app-header', AppHeader)