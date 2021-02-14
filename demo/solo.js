import { html, css } from 'lit-element'

import { waveStyle, sharedPageStyle } from './style'
import Locale from './locale'

class SoloPage extends Locale {
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

  firstUpdated (_) {
    this.shadowRoot.querySelector('#if').lyrics = {
      type: 'lrc',
      value: `[ar:阮豆]
[ti:如果你能够做我男朋友]
[al:如果你能够做我男朋友]
[length: 2:41]
[00:00.00]作词：久贤
[00:06.20]作曲：久贤
[00:13.17]编曲：安苏羽
[00:16.30]制作人：久贤
[00:19.58]混音：贾佳
[00:22.13][01:22.75]请问你是什么星座
[00:25.00][01:25.03]能不能告诉我
[00:27.13][01:27.08]你是狮子座还是水瓶座
[00:29.62][01:29.58]不管是什么都很适合我
[00:32.56][01:32.48]每天都会许个愿望
[00:34.98][01:34.99]满足我的小幻想
[00:37.03][01:37.07]我只是害羞
[00:38.51][01:38.61]也怕出糗
[00:39.71][01:39.77]想鼓起勇气说
[00:41.43][00:51.57][01:41.41][01:51.48][02:01.44][02:11.48]如果你能够做我男朋友
[00:44.77][01:44.85][02:04.70]那就请你牵我手
[00:47.10][01:47.09][02:07.06]阳光 午后
[00:49.75][01:49.52][02:09.42]散步或郊游
[00:54.68][01:54.76][02:14.68]那就请你点点头
[00:57.09][01:57.01][02:17.09]约定拉钩
[00:59.21]现在就跟我走
[01:59.33]现在就跟我
[02:19.23]现在就请你跟我走`,
      translations: [{
        lang: 'phonetic-latin',
        name: 'Pīnyīn',
        value: `[ar:阮豆]
[ti:如果你能够做我男朋友]
[al:如果你能够做我男朋友]
[length: 2:41]
[00:00.00]
[00:06.20]
[00:13.17]
[00:16.30]
[00:19.58]
[00:22.13][01:22.75]qingwen ni shi shenme xingzuo
[00:25.00][01:25.03]neng bu neng gaosu wo
[00:27.13][01:27.08]ni shi shizizuo haishi shuipingzuo
[00:29.62][01:29.58]buguan shi shenme dou hen shihe wo
[00:32.56][01:32.48]meitian dou hui xu ge yuanwang
[00:34.98][01:34.99]manzu wo de xiao huanxiang
[00:37.03][01:37.07]wo zhishi haixiu
[00:38.51][01:38.61]ye pa chuqiu
[00:39.71][01:39.77]xiang gu qi yongqi shuo
[00:41.43][00:51.57][01:41.41][01:51.48][02:01.44][02:11.48]ruguo ni nenggou zuo wo nanpengyou
[00:44.77][01:44.85][02:04.70]na jiu qing ni qian wo shou
[00:47.10][01:47.09][02:07.06]yangguang wuhou
[00:49.75][01:49.52][02:09.42]sanbu huo jiaoyou
[00:54.68][01:54.76][02:14.68]na jiu qing ni diandiantou
[00:57.09][01:57.01][02:17.09]yueding lagou
[00:59.21]xianzai jiu gen wo zou
[01:59.33]xianzai jiu gen wo
[02:19.23]xianzai jiu qing ni gen wo zou`
      }]
    }
  }

  render () {
    return html`
      <div class="demo waveAnimation">
        <div class="content">
          <nav-bar
            .location=${this.location} color="#ffe9f8"
            .demo="${this.getLocale('demo')}"
            .langName="${this.getLocale('lang')}"
            .solo="${this.getLocale('solo')}"
            .playlist="${this.getLocale('playlist')}"
            .lang="${this.getLangList()}"
            @demo-change-lang="${(e) => this.changeLang(e.detail.lang)}"
          ></nav-bar>
          <div class="main">
            <h1>${this.getLocale('soloCard')}</h1>
            <div class="landing">
              <kokoro-provider>
                <kokoro-single-card
                  id="if"
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
              mobileDefaultSide="right"
              desktopLyricsColorSchemeIndex="2"
              isDesktopLyricsShowing
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
        <h1>${this.getLocale('source')}</h1>
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
      id="if"
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
    <kokoro-player
      id="player"${this.darkMode ? `
      darkMode` : ''}
      lang="${this._lang}"
      top="100"
      left="0"
      mobileDefaultSide="right"
      desktopLyricsColorSchemeIndex="2"
      desktopLyricsVerticalCenter="150"
      isDesktopLyricsShowing
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

// Set lyrics for card
// More about lyrics: https://kokoro.js.org/interfaces/ilyrics.html
document.querySelector('#if').lyrics = {
  type: 'lrc',
  value: '[ar:阮豆]\\n[ti:如果你能够做我男朋友]\\n[al:如果你能够做我男朋友]\\n[length: 2:41]\\n[00:00.00]作词：久贤\\n[00:06.20]作曲：久贤\\n[00:13.17]编曲：安苏羽\\n[00:16.30]制作人：久贤\\n[00:19.58]混音：贾佳\\n[00:22.13][01:22.75]请问你是什么星座\\n[00:25.00][01:25.03]能不能告诉我\\n[00:27.13][01:27.08]你是狮子座还是水瓶座\\n[00:29.62][01:29.58]不管是什么都很适合我\\n[00:32.56][01:32.48]每天都会许个愿望\\n[00:34.98][01:34.99]满足我的小幻想\\n[00:37.03][01:37.07]我只是害羞\\n[00:38.51][01:38.61]也怕出糗\\n[00:39.71][01:39.77]想鼓起勇气说\\n[00:41.43][00:51.57][01:41.41][01:51.48][02:01.44][02:11.48]如果你能够做我男朋友\\n[00:44.77][01:44.85][02:04.70]那就请你牵我手\\n[00:47.10][01:47.09][02:07.06]阳光 午后\\n[00:49.75][01:49.52][02:09.42]散步或郊游\\n[00:54.68][01:54.76][02:14.68]那就请你点点头\\n[00:57.09][01:57.01][02:17.09]约定拉钩\\n[00:59.21]现在就跟我走\\n[01:59.33]现在就跟我\\n[02:19.23]现在就请你跟我走',
  translations: [{
    lang: 'phonetic-latin',
    name: 'Pīnyīn',
    value: '[ar:阮豆]\\n[ti:如果你能够做我男朋友]\\n[al:如果你能够做我男朋友]\\n[length: 2:41]\\n[00:00.00]\\n[00:06.20]\\n[00:13.17]\\n[00:16.30]\\n[00:19.58]\\n[00:22.13][01:22.75]qingwen ni shi shenme xingzuo\\n[00:25.00][01:25.03]neng bu neng gaosu wo\\n[00:27.13][01:27.08]ni shi shizizuo haishi shuipingzuo\\n[00:29.62][01:29.58]buguan shi shenme dou hen shihe wo\\n[00:32.56][01:32.48]meitian dou hui xu ge yuanwang\\n[00:34.98][01:34.99]manzu wo de xiao huanxiang\\n[00:37.03][01:37.07]wo zhishi haixiu\\n[00:38.51][01:38.61]ye pa chuqiu\\n[00:39.71][01:39.77]xiang gu qi yongqi shuo\\n[00:41.43][00:51.57][01:41.41][01:51.48][02:01.44][02:11.48]ruguo ni nenggou zuo wo nanpengyou\\n[00:44.77][01:44.85][02:04.70]na jiu qing ni qian wo shou\\n[00:47.10][01:47.09][02:07.06]yangguang wuhou\\n[00:49.75][01:49.52][02:09.42]sanbu huo jiaoyou\\n[00:54.68][01:54.76][02:14.68]na jiu qing ni diandiantou\\n[00:57.09][01:57.01][02:17.09]yueding lagou\\n[00:59.21]xianzai jiu gen wo zou\\n[01:59.33]xianzai jiu gen wo\\n[02:19.23]xianzai jiu qing ni gen wo zou'
  }]
}

// To override desktop lyrics color scheme
// document.querySelector('#player').desktopLyricsColorSchemes = [
//   { name: '夕阳', value: 'linear-gradient(-1deg, #e92201, #fb9c17, #e92201)' },
//   { name: '蓝天', value: 'linear-gradient(-1deg, #0145d3, #118cfa, #0145d3)' },
//   { name: '星野', value: 'linear-gradient(-1deg, #a5c9e5, #9da9eb, #c6bde2)' },
//   { name: '山峦', value: 'linear-gradient(-1deg, #1dbf76, #67d74d, #1dbf76)' }
// ]

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
