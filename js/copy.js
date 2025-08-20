class copiedSuccess extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<div id="copied-success" class="copied">Copied</div>
        `
    }
}
window.customElements.define('dan-copied', copiedSuccess)