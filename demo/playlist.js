import { LitElement, html, css } from 'lit-element'

import { waveStyle, sharedPageStyle } from './style'

class PlaylistPage extends LitElement {
  static get styles () {
    return css`
      ${waveStyle}
      ${sharedPageStyle}
      .demo {
        background: linear-gradient(315deg, #fffbf8, #fffbf0);
      }
      .main {
        color: #3e4f55;
      }
    `
  }

  render () {
    return html`
      <link href="https://cdn.jsdelivr.net/gh/PrismJS/prism@1.16.0/themes/prism-coy.css" rel="stylesheet" />
      <div class="demo waveAnimation">
        <div class="content">
          <nav-bar .location=${this.location} color="#3e4f55"></nav-bar>
          <div class="main">
            <h1>Playlist Card</h1>
            <div class="landing">
              <kokoro-provider>
                <kokoro-playlist-card></kokoro-playlist-card>
              </kokoro-provider>
            </div>
          </div>
        </div>
        <div class="waveWrapperInner bgTop">
          <div class="wave waveTop" style="background-image: url('https://i.loli.net/2019/09/28/uJiFzLwxGkA8Ecl.png')"></div>
        </div>
        <div class="waveWrapperInner bgMiddle">
          <div class="wave waveMiddle" style="background-image: url('https://i.loli.net/2019/09/28/fhKuB9jLc7wRTEG.png')"></div>
        </div>
        <div class="waveWrapperInner bgBottom">
          <div class="wave waveBottom" style="background-image: url('https://i.loli.net/2019/09/28/lpuMerGD4wbgR5P.png')"></div>
        </div>
      </div>
      <div class="source">
        <h1>Source Code</h1>
        <source-box .snippets=${[{
      langCode: 'html',
      lang: 'HTML',
      code: `<html>
<head>
</head>
<body>
  <kokoro-provider>
    <!-- Playlist Card -->
    <kokoro-playlist-card></kokoro-playlist-card>
  </kokoro-provider>
  <kokoro-provider>
    <!-- Player -->
    <kokoro-player></kokoro-player>
  </kokoro-provider>
</body>
</html>`
    }, {
      langCode: 'javascript',
      lang: 'JavaScript',
      code: `import Kororo from 'kokoro'
import { Provider } from 'kokoro-player' 

window.player = new Kokoro()
window.customElements.define('kokoro-provider', Provider.connect(window.player))`
    }]}></source-box>
      </div>
    `
  }
}

window.customElements.define('playlist-page', PlaylistPage)
