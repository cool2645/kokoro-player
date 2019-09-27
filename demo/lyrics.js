import { LitElement, html, css } from 'lit-element'

class LyricsPage extends LitElement {
  static get styles () {
    return css`
      .demo {
        height: 600px;
        background: linear-gradient(315deg, #ffde79, #ffc795);
        position: relative;
      }
      .source {
        height: 500px;
      }
    `
  }

  render () {
    return html`
      <div class="demo">
        <div class="content">
          <nav-bar .location=${this.location} color="#000"></nav-bar>
          <h1>Lyrics Page</h1>
          <kokoro-provider>
            <kokoro-player></kokoro-player>
          </kokoro-provider>
        </div>
      </div>
      <div class="source">
            
      </div>
    `
  }
}

window.customElements.define('lyrics-page', LyricsPage)
