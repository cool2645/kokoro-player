import { LitElement, html, css } from 'lit-element'

import { waveStyle, sharedPageStyle } from './style'

class SoloPage extends LitElement {
  static get properties () {
    return {
      connected: { type: Boolean },
      flatMode: { type: Boolean },
      darkMode: { type: Boolean }
    }
  }

  constructor () {
    super()
    this.connected = true
    this.flatMode = false
    this.darkMode = true
  }

  toggleConnect () {
    this.connected = !this.connected
    if (this.connected) {
      this.shadowRoot.querySelectorAll('kokoro-provider').forEach((provider) => {
        provider.connect(window.player)
      })
    } else {
      this.shadowRoot.querySelectorAll('kokoro-provider').forEach((provider) => {
        provider.disconnect()
      })
    }
  }

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
                  type="${this.flatMode ? 'flat' : 'classical'}"
                ></kokoro-single-card>
              </kokoro-provider>
            </div>
          </div>
          <kokoro-provider>
            <kokoro-player
              ?darkMode="${this.darkMode}"
              top="100"
              left="0"
            ></kokoro-player>
          </kokoro-provider>
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
        <div>
          <label for="conn"><input type="checkbox" id="conn"
                                   ?checked="${this.connected}"
                                   @change="${this.toggleConnect}"
          /> Connected</label>
          <label for="flat"><input type="checkbox" id="flat"
                                   ?checked="${this.flatMode}"
                                   @change="${() => { this.flatMode = !this.flatMode }}"
          /> Flat mode</label>
          <label for="dark"><input type="checkbox" id="dark"
                                   ?checked="${this.darkMode}"
                                   @change="${() => { this.darkMode = !this.darkMode }}"
          /> Dark mode</label>
        </div>
        <source-box .snippets=${[{
          langCode: 'html',
          lang: 'HTML',
          code: `<html>
<head>
</head>
<body>
  <kokoro-provider>
    <!-- Single Song Card -->
    <kokoro-single-card
      title="如果你能够做我男朋友"
      artist="阮豆"
      album="如果你能够做我男朋友"
      src="https://cdn.innocent.love/阮豆 - 如果你能够做我男朋友.mp3"
      cover="https://cdn.innocent.love/阮豆 - 如果你能够做我男朋友.jpg"
      primaryColor="#bbbdd7"
      secondaryColor="#a0a2bb"
      backgroundColor="#2c3b58"${this.flatMode ? `
      type="flat"` : ''}
    ></kokoro-single-card>
  </kokoro-provider>
  <kokoro-provider>
    <!-- Player -->
    <kokoro-player${this.darkMode ? `
      darkMode` : ''}
      top="100"
      left="0"
    ></kokoro-player>
  </kokoro-provider>
</body>
</html>`
        }, {
          langCode: 'javascript',
          lang: 'JavaScript',
          code: `import { Kokoro, Provider, PLAY_ORDER_LOOP } from 'kokoro-player' 

window.player = new Kokoro()
window.customElements.define('kokoro-provider', Provider${this.connected ? '.connect(window.player)' : ''})
${this.connected ? `// To disconnect
// document.querySelector('kokoro-provider').disconnect()` : `// To connect
// document.querySelector('kokoro-provider').connect(window.player)`}

// Set initial playlist
// More about Kokoro's API: https://kokoro.js.org
window.player.setPlaylist([{
  title: '你的答案',
  artist: '阿冗',
  album: '你的答案',
  src: 'https://cdn.innocent.love/阿冗 - 你的答案.mp3',
  cover: 'https://cdn.innocent.love/阿冗 - 你的答案.jpg'
}], 0, PLAY_ORDER_LOOP)`
      }]}></source-box>
      </div>
    `
  }
}

window.customElements.define('solo-page', SoloPage)
