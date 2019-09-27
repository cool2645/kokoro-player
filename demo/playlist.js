import { LitElement, html, css } from 'lit-element'

class PlaylistPage extends LitElement {
  static get styles () {
    return css`
      .demo {
        height: calc(100% + 700px);
        background-image: url("https://i.loli.net/2019/09/27/PjdKtTgi3ZHoXCa.jpg");
        background-size: cover;
        background-position: bottom;
        position: relative;
      }
      .content {
        height: 100%;
        background: linear-gradient(180deg, #ffffff00 90%, #ffffffff);
      }
    `
  }

  render () {
    return html`
      <div class="demo">
        <div class="content">
          <nav-bar .location=${this.location} color="#000"></nav-bar>
          <h1>Playlist Page</h1>
          <kokoro-provider>
            <kokoro-player></kokoro-player>
          </kokoro-provider>
        </div>
      </div>
    `
  }
}

window.customElements.define('playlist-page', PlaylistPage)
