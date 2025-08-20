//<main-menu></main-menu>

class MenuComponent extends HTMLElement {
    constructor() {
        super();

        // Create shadow DOM
        this.attachShadow({ mode: 'open' });

        // Define menu HTML template
        this.shadowRoot.innerHTML = `
            <style>
            section {
                display: block;
            }

            .menu {
                width: 100%;
                  height: 33px;
                  background-color: #111;
                  text-align: left;
                  position: fixed;
            }
            #hamburgerMenu {
                font-weight: 600;
                font-size: 30px;
                cursor: pointer;
                color: #fff;
                transition: 0.3s;
                padding-left: 5px;
              }
          
            #hamburgerMenu:hover {
                color: #444;
              }

              .details {
                padding-top: 33px;
              }
              
            .sidenav {
                height: 100%;
                width: 0;
                position: fixed;
                z-index: 1;
                top: 0;
                left: 0;
                background-color: #111;
                overflow-x: hidden;
                transition: 0.3s;
                padding-top: 60px;
            }
    
            .sidenav a {
                padding: 8px 8px 8px 8px;
                text-decoration: none;
                font-size: 25px;
                color: #818181;
                display: block;
                transition: 0.3s;
            }
    
            .sidenav a:hover {
                color: #f1f1f1;
            }
    
            .sidenav .closebtn {
                position: absolute;
                top: 0;
                font-size: 36px;
            }
            </style>
            <div class="menu">
                <a id="hamburgerMenu">&equiv;</a>
                <div class="sidenav">
                    <a href="javascript:void(0)" class="closebtn">&times;</a>
                    <app-header></app-header>
                </div>
            </div>
        `;

        // Bind event listeners
        this.shadowRoot.querySelector('#hamburgerMenu').addEventListener('click', () => {
            this.openNav();
        });

        this.shadowRoot.querySelector('.closebtn').addEventListener('click', () => {
            this.closeNav();
        });
    }

    openNav() {
        this.shadowRoot.querySelector('.sidenav').style.width = '250px';
    }

    closeNav() {
        this.shadowRoot.querySelector('.sidenav').style.width = '0';
    }
}

// Define the custom element
customElements.define('main-menu', MenuComponent);