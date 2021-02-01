import { LitElement, html, css } from 'lit-element'

import { waveStyle, sharedPageStyle } from './style'

class PlaylistPage extends LitElement {
  static get properties () {
    return {
      connected: { type: Boolean },
      flatMode: { type: Boolean },
      showTitle: { type: Boolean },
      darkMode: { type: Boolean }
    }
  }

  constructor () {
    super()
    this.connected = true
    this.flatMode = false
    this.showTitle = true
    this.darkMode = false
  }

  toggleConnect () {
    this.connected = !this.connected
    if (this.connected) {
      this.shadowRoot.querySelector('kokoro-provider')
        .connect(window.player)
    } else {
      this.shadowRoot.querySelector('kokoro-provider')
        .disconnect()
    }
  }

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

  firstUpdated (_) {
    this.shadowRoot.querySelector('#hanabi').songs = [{
      title: 'あめあかり',
      artist: 'なぎ',
      album: 'あめあかり',
      src: 'https://cdn.innocent.love/%E3%81%AA%E3%81%8E%20-%20%E3%81%82%E3%82%81%E3%81%82%E3%81%8B%E3%82%8A.mp3',
      cover: 'https://cdn.innocent.love/%E3%81%AA%E3%81%8E%20-%20%E3%81%82%E3%82%81%E3%81%82%E3%81%8B%E3%82%8A.jpg'
    }, {
      title: '君だったら',
      artist: 'HAPPY BIRTHDAY',
      album: '今夜きみが怖い夢を見ませんように',
      src: 'https://cdn.innocent.love/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3',
      cover: 'https://cdn.innocent.love/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.jpg',
      primaryColor: '#0f0000',
      secondaryColor: '#221718',
      backgroundColor: '#8d7d87'
    }, {
      title: '聞こえますか',
      artist: 'HoneyWorks こいぬ',
      album: '東京ウインターセッション',
      src: 'https://cdn.innocent.love/HoneyWorks%20%E3%81%93%E3%81%84%E3%81%AC%20-%20%E8%81%9E%E3%81%93%E3%81%88%E3%81%BE%E3%81%99%E3%81%8B.mp3',
      cover: 'https://cdn.innocent.love/HoneyWorks%20%E3%81%93%E3%81%84%E3%81%AC%20-%20%E8%81%9E%E3%81%93%E3%81%88%E3%81%BE%E3%81%99%E3%81%8B.jpg',
      primaryColor: '#ffe3c3',
      secondaryColor: '#f4c7a8',
      backgroundColor: '#743149'
    }, {
      title: '止まない雨に花束を',
      artist: 'nayuta',
      album: 'あめあかり',
      src: 'https://cdn.innocent.love/nayuta%20-%20%E6%AD%A2%E3%81%BE%E3%81%AA%E3%81%84%E9%9B%A8%E3%81%AB%E8%8A%B1%E6%9D%9F%E3%82%92.mp3',
      cover: 'https://cdn.innocent.love/%E3%81%AA%E3%81%8E%20-%20%E3%81%82%E3%82%81%E3%81%82%E3%81%8B%E3%82%8A.jpg'
    }, {
      title: '花火のような恋',
      artist: 'みゆはん',
      album: '自己スキーマ',
      src: 'https://cdn.innocent.love/%E3%81%BF%E3%82%86%E3%81%AF%E3%82%93%20-%20%E8%8A%B1%E7%81%AB%E3%81%AE%E3%82%88%E3%81%86%E3%81%AA%E6%81%8B.mp3',
      cover: 'https://cdn.innocent.love/%E3%81%BF%E3%82%86%E3%81%AF%E3%82%93%20-%20%E8%8A%B1%E7%81%AB%E3%81%AE%E3%82%88%E3%81%86%E3%81%AA%E6%81%8B.jpg',
      primaryColor: '#482100',
      secondaryColor: '#7b4e00',
      backgroundColor: '#bad0d9'
    }, {
      title: '失う',
      artist: 'らいらい。',
      album: '失う',
      src: 'https://cdn.innocent.love/%E3%82%89%E3%81%84%E3%82%89%E3%81%84%E3%80%82%20-%20%E5%A4%B1%E3%81%86.mp3',
      cover: 'https://cdn.innocent.love/%E3%82%89%E3%81%84%E3%82%89%E3%81%84%E3%80%82%20-%20%E5%A4%B1%E3%81%86.jpg',
      primaryColor: '#6d9bd7',
      secondaryColor: '#5181bb',
      backgroundColor: '#19132a'
    }]
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
                <kokoro-playlist-card
                  id="hanabi"
                  title="${this.showTitle ? '花火般的恋' : ''}"
                  primaryColor="#0e0400"
                  secondaryColor="#383323"
                  backgroundColor="#bf9356"
                  type="${this.flatMode ? 'flat' : 'classical'}"
                ></kokoro-playlist-card>
              </kokoro-provider>
            </div>
          </div>
          <kokoro-provider>
            <kokoro-player
              ?darkMode="${this.darkMode}"
            ></kokoro-player>
          </kokoro-provider>
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
        <div>
          <label for="conn"><input type="checkbox" id="conn"
                                   ?checked="${this.connected}"
                                   @change="${this.toggleConnect}"
          /> Connected</label>
          <label for="title"><input type="checkbox" id="title"
                                   ?checked="${this.showTitle}"
                                   @change="${() => { this.showTitle = !this.showTitle }}"
          /> Title</label>
          <label for="flat"><input type="checkbox" id="flat"
                                   ?checked="${this.flatMode}"
                                   @change="${() => { this.flatMode = !this.flatMode }}"
          /> Flat mode</label>
          <label for="dark"><input type="checkbox" id="dark"
                                   ?checkd="${this.darkMode}"
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
    <!-- Playlist Card -->
    <kokoro-playlist-card
      id="#hanabi"${this.showTitle ? `
      title="花火般的恋"` : ''}
      primaryColor="#0e0400"
      secondaryColor="#383323"
      backgroundColor="#bf9356"${this.flatMode ? `
      type="flat"` : ''}
    ></kokoro-playlist-card>
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
      code: `import { Kokoro, Provider } from 'kokoro-player' 

window.player = new Kokoro()
window.customElements.define('kokoro-provider', Provider${this.connected ? '.connect(window.player)' : ''})
${this.connected ? `// To disconnect
// document.querySelector('kokoro-provider').disconnect()` : `// To connect
// document.querySelector('kokoro-provider').connect(window.player)`}

document.querySelector('#hanabi').songs = [{
  title: 'あめあかり',
  artist: 'なぎ',
  album: 'あめあかり',
  src: 'https://cdn.innocent.love/なぎ - あめあかり.mp3',
  cover: 'https://cdn.innocent.love/なぎ - あめあかり.jpg'
}, {
  title: '君だったら',
  artist: 'HAPPY BIRTHDAY',
  album: '今夜きみが怖い夢を見ませんように',
  src: 'https://cdn.innocent.love/HAPPY BIRTHDAY - 君だったら.mp3',
  cover: 'https://cdn.innocent.love/HAPPY BIRTHDAY - 君だったら.jpg',
  primaryColor: '#0f0000',
  secondaryColor: '#221718',
  backgroundColor: '#8d7d87'
}, {
  title: '聞こえますか',
  artist: 'HoneyWorks こいぬ',
  album: '東京ウインターセッション',
  src: 'https://cdn.innocent.love/HoneyWorks こいぬ - 聞こえますか.mp3',
  cover: 'https://cdn.innocent.love/HoneyWorks こいぬ - 聞こえますか.jpg',
  primaryColor: '#ffe3c3',
  secondaryColor: '#f4c7a8',
  backgroundColor: '#743149'
}, {
  title: '止まない雨に花束を',
  artist: 'nayuta',
  album: 'あめあかり',
  src: 'https://cdn.innocent.love/nayuta - 止まない雨に花束を.mp3',
  cover: 'https://cdn.innocent.love/なぎ - あめあかり.jpg'
}, {
  title: '花火のような恋',
  artist: 'みゆはん',
  album: '自己スキーマ',
  src: 'https://cdn.innocent.love/みゆはん - 花火のような恋.mp3',
  cover: 'https://cdn.innocent.love/みゆはん - 花火のような恋.jpg',
  primaryColor: '#482100',
  secondaryColor: '#7b4e00',
  backgroundColor: '#bad0d9'
}, {
  title: '失う',
  artist: 'らいらい。',
  album: '失う',
  src: 'https://cdn.innocent.love/らいらい。 - 失う.mp3',
  cover: 'https://cdn.innocent.love/らいらい。 - 失う.jpg',
  primaryColor: '#6d9bd7',
  secondaryColor: '#5181bb',
  backgroundColor: '#19132a'
}]
`
    }]}></source-box>
      </div>
    `
  }
}

window.customElements.define('playlist-page', PlaylistPage)
