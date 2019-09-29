import { LitElement, html, css } from 'lit-element'

export const routes = [
  { path: '/', component: 'solo-page', title: 'Solo' },
  { path: '/playlist', component: 'playlist-page', title: 'Playlist' },
  { path: '/lyrics', component: 'lyrics-page', title: 'Lyrics' }
]

class NavBar extends LitElement {
  static get properties () {
    return {
      location: Object,
      color: String
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
      .nav-item.active {
          border-bottom: 2px solid #fff;
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
        .nav-item.active {
          border-color: ${this.color} !important;
        }
      </style>
      <div class="nav">
        <a class="nav-title lg" href="/"> 💘 Kokoro Player Demo</a>
        <a class="nav-title sm" href="/"> 💘</a>
        <div class="flex"></div>
        ${routes.map(route => html`
          <a 
            class="nav-item ${this.location.pathname === route.path ? 'active' : ''}"
            href="${route.path}">${route.title}
          </a>
        `)}
        <a class="icon" href="https://github.com/cool2645/kokoro-player" title="GitHub" target="_blank">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentcolor">
            <path d="M12,2C6.48,2,2,6.59,2,12.25c0,4.53,2.87,8.37,6.84,9.73c0.5,0.09,0.68-0.22,0.68-0.49c0-0.24-0.01-0.89-0.01-1.74c-2.78,0.62-3.37-1.37-3.37-1.37c-0.45-1.18-1.11-1.5-1.11-1.5c-0.91-0.64,0.07-0.62,0.07-0.62c1,0.07,1.53,1.06,1.53,1.06c0.89,1.57,2.34,1.11,2.91,0.85c0.09-0.66,0.35-1.11,0.63-1.37c-2.22-0.26-4.56-1.14-4.56-5.07c0-1.12,0.39-2.03,1.03-2.75c-0.1-0.26-0.45-1.3,0.1-2.71c0,0,0.84-0.28,2.75,1.05c0.8-0.23,1.65-0.34,2.5-0.34c0.85,0,1.7,0.12,2.5,0.34c1.91-1.33,2.75-1.05,2.75-1.05c0.55,1.41,0.2,2.45,0.1,2.71c0.64,0.72,1.03,1.63,1.03,2.75c0,3.94-2.34,4.81-4.57,5.06c0.36,0.32,0.68,0.94,0.68,1.9c0,1.37-0.01,2.48-0.01,2.81c0,0.27,0.18,0.59,0.69,0.49c3.97-1.36,6.83-5.2,6.83-9.73C22,6.59,17.52,2,12,2"></path>
          </svg>
        </a>
      </div>
    `
  }
}

window.customElements.define('nav-bar', NavBar)