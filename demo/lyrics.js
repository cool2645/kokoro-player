import { LitElement, html, css, unsafeCSS } from 'lit-element'

import { sharedPageStyle } from './style'

class LyricsPage extends LitElement {
  static get styles () {
    return css`
      ${unsafeCSS(sharedPageStyle)}
      .demo {
        height: 600px;
        background: linear-gradient(315deg, #c24046, #751b1a);
      }
      .main {
        height: calc(100% - 60px);
        color: #fff;
      }
    `
  }

  render () {
    return html`
      <div class="demo">
        <div class="content">
          <nav-bar .location=${this.location} color="#fff"></nav-bar>
          <div class="main">
            <h1>Hyper Lyrics</h1>
            <div class="landing">
              <kokoro-provider>
                <kokoro-player></kokoro-player>
              </kokoro-provider>
            </div>
          </div>
        </div>
      </div>
      <div class="source">
            
      </div>
    `
  }
}

window.customElements.define('lyrics-page', LyricsPage)
