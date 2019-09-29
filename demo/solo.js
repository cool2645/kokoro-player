import { LitElement, html, css, unsafeCSS } from 'lit-element'

import { waveStyle, sharedPageStyle } from './style'

class SoloPage extends LitElement {
  static get styles () {
    return css`
      ${unsafeCSS(waveStyle)}
      ${unsafeCSS(sharedPageStyle)}
      .demo {
        background: linear-gradient(315deg, #24354E, #04142D);
      }
      .main {
        color: #ffe9f8;
      }
    `
  }

  render () {
    return html`
      <div class="demo waveAnimation">
        <div class="content">
          <nav-bar .location=${this.location} color="#ffe9f8"></nav-bar>
          <div class="main">
            <h1>Single Song Card</h1>
            <div class="landing">
              <kokoro-provider>
                <kokoro-player></kokoro-player>
              </kokoro-provider>
            </div>
          </div>
        </div>
        <div class="waveWrapperInner bgTop">
          <div class="wave waveTop" style="background-image: url('https://i.loli.net/2019/09/27/DgOiUhxQM69RlWL.png')"></div>
        </div>
        <div class="waveWrapperInner bgMiddle">
          <div class="wave waveMiddle" style="background-image: url('https://i.loli.net/2019/09/27/2Y3j86Mznb5tRwX.png')"></div>
        </div>
        <div class="waveWrapperInner bgBottom">
          <div class="wave waveBottom" style="background-image: url('https://i.loli.net/2019/09/27/GmvokX216OyHr7Q.png')"></div>
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
    <!-- Single Song Card -->
    <single-song-card></single-song-card>
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
import { Player, Provider, SingleSong } from 'kokoro-player' 

window.player = new Kokoro()
window.customElements.define('kokoro-player', Player)
window.customElements.define('single-song-card', SingleSong)
window.customElements.define('kokoro-provider', Provider.connect(window.player))`
      }]}></source-box>
      </div>
    `
  }
}

window.customElements.define('solo-page', SoloPage)
