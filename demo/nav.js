import { LitElement, html, css } from 'lit-element'

export const routes = [
  { path: '/', component: 'solo-page', title: 'solo' },
  { path: '/playlist', component: 'playlist-page', title: 'playlist' }
]

class NavBar extends LitElement {
  static get properties () {
    return {
      location: Object,
      color: String,
      locale: String,
      demo: String,
      langName: String,
      lang: Array,
      solo: String,
      playlist: String
    }
  }

  static get styles () {
    return css`
      .nav {
        height: 60px;
        background: #00000000;
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        color: #fff;
        padding: 0 32px;
      }
      .nav-title {
        font-size: 18px;
      }
      .nav-item {
        font-size: 14px;
        padding: 18px 12px;
        align-self: stretch;
      }
      .icon.lang {
        width: 50px;
        padding: 18px 12px;
        text-align: center;
        margin-left: 5px;
        position: relative;
      }
      .nav-item.active, .icon.lang:hover {
          border-bottom: 2px solid #fff;
      }
      .nav-item-menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
      }
      .icon.lang:hover > .nav-item-menu {
        display: block;
      }
      .nav-item-menu-item {
        font-size: 14px;
        padding: 8px 12px;
        border: 2px solid;
        border-top: 0;
        min-width: 100%;
        box-sizing: border-box;
      }
      a {
        font-weight: 500;
        text-decoration: none;
        color: inherit;
      }
      .icon {
        padding: 0 12px;
        width: 24px;
        height: 24px;
        background-size: cover;
      }
      .flex {
        flex: 1;
      }
      @media screen and (max-width: 490px) {
        .lg {
          display: none;
        }
        .sm {
          display: inherit;
        }
      }
      @media screen and (min-width: 490px) {
        .lg {
          display: inherit;
        }
        .sm {
          display: none;
        }
      }
    `
  }

  render () {
    return html`
      <style>
        .nav {
          color: ${this.color} !important;
        }
        .nav-item.active, .icon.lang:hover {
          border-color: ${this.color} !important;
        }
        .nav-item-menu-item {
          color: ${this.color};
          border-color: ${this.color} !important;
        }
      </style>
      <div class="nav">
        <a class="nav-title lg" href="/"> 💘 ${this.demo}</a>
        <a class="nav-title sm" href="/"> 💘</a>
        <div class="flex"></div>
        ${routes.map(route => html`
          <a 
            class="nav-item ${this.location.pathname === route.path ? 'active' : ''}"
            href="${route.path}">${this[route.title]}
          </a>
        `)}
        <a class="icon lang" href=""
        >
          <svg width="24" height="24" fill="currentcolor">
            <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path>
          </svg>
          <div class="nav-item-menu">
            ${this.lang.map(l => html`
              <div class="nav-item-menu-item"
                   @click="${() => this.changeLang(l.value)}"
              >${l.name}</div>
            `)}
          </div>
        </a>
        <a class="icon" href="https://github.com/cool2645/kokoro-player" title="GitHub" target="_blank">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentcolor">
            <path d="M12,2C6.48,2,2,6.59,2,12.25c0,4.53,2.87,8.37,6.84,9.73c0.5,0.09,0.68-0.22,0.68-0.49c0-0.24-0.01-0.89-0.01-1.74c-2.78,0.62-3.37-1.37-3.37-1.37c-0.45-1.18-1.11-1.5-1.11-1.5c-0.91-0.64,0.07-0.62,0.07-0.62c1,0.07,1.53,1.06,1.53,1.06c0.89,1.57,2.34,1.11,2.91,0.85c0.09-0.66,0.35-1.11,0.63-1.37c-2.22-0.26-4.56-1.14-4.56-5.07c0-1.12,0.39-2.03,1.03-2.75c-0.1-0.26-0.45-1.3,0.1-2.71c0,0,0.84-0.28,2.75,1.05c0.8-0.23,1.65-0.34,2.5-0.34c0.85,0,1.7,0.12,2.5,0.34c1.91-1.33,2.75-1.05,2.75-1.05c0.55,1.41,0.2,2.45,0.1,2.71c0.64,0.72,1.03,1.63,1.03,2.75c0,3.94-2.34,4.81-4.57,5.06c0.36,0.32,0.68,0.94,0.68,1.9c0,1.37-0.01,2.48-0.01,2.81c0,0.27,0.18,0.59,0.69,0.49c3.97-1.36,6.83-5.2,6.83-9.73C22,6.59,17.52,2,12,2"></path>
          </svg>
        </a>
      </div>
    `
  }

  changeLang (lang) {
    this.dispatchEvent(new window.CustomEvent('demo-change-lang', {
      detail: {
        lang
      }
    }))
  }
}

window.customElements.define('nav-bar', NavBar)
