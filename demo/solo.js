import { LitElement, html, css } from 'lit-element'

import { waveStyle, sharedPageStyle } from './style'

class SoloPage extends LitElement {
  static get styles () {
    return css`
      ${waveStyle}
      ${sharedPageStyle}
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
                <kokoro-single-card
                  title="如果你能够做我男朋友"
                  artist="阮豆"
                  album="如果你能够做我男朋友"
                  src="https://cdn.innocent.love/%E9%98%AE%E8%B1%86%20-%20%E5%A6%82%E6%9E%9C%E4%BD%A0%E8%83%BD%E5%A4%9F%E5%81%9A%E6%88%91%E7%94%B7%E6%9C%8B%E5%8F%8B.mp3"
                  cover="https://cdn.innocent.love/%E9%98%AE%E8%B1%86%20-%20%E5%A6%82%E6%9E%9C%E4%BD%A0%E8%83%BD%E5%A4%9F%E5%81%9A%E6%88%91%E7%94%B7%E6%9C%8B%E5%8F%8B.jpg"
                  primaryColor="#bbbdd7"
                  secondaryColor="#a0a2bb"
                  backgroundColor="#2c3b58"
                ></kokoro-single-card>
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
    <kokoro-single-card></kokoro-single-card>
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

window.customElements.define('solo-page', SoloPage)
