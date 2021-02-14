import { LitElement } from 'lit-element'

import { locale } from '../'

export default class Locale extends LitElement {
  constructor () {
    super()
    this._lang = 'en'
    if (navigator.languages) {
      for (const lang of navigator.languages) {
        if (lang.match('zh')) {
          this._lang = 'zh_Hans'
        }
      }
    } else {
      if (navigator.language.match('zh')) this._lang = 'zh_Hans'
    }
  }

  getLangList () {
    return [{
      value: 'en',
      name: 'English'
    }, {
      value: 'zh_Hans',
      name: '中文'
    }]
  }

  getLocale (key) {
    return {
      en: {
        lang: 'English',
        solo: 'Solo',
        playlist: 'Playlist',
        soloCard: 'Single Song Card',
        playlistCard: 'Playlist Card',
        source: 'Source Code',
        demo: 'Kokoro Player Demo'
      },
      zh_Hans: {
        lang: '中文',
        solo: '单曲',
        playlist: '歌单',
        soloCard: '单曲卡片',
        playlistCard: '歌单卡片',
        source: '源代码',
        demo: 'Kokoro Player 演示'
      }
    }[this._lang][key]
  }

  changeLang (lang) {
    this._lang = lang
    locale.use(locale[lang] || locale.en)
    this.shadowRoot.querySelectorAll('kokoro-provider')
      .forEach((provider) => {
        provider.querySelector('kokoro-player')?.requestUpdate()
        provider.querySelector('kokoro-single-card')?.requestUpdate()
        provider.querySelector('kokoro-playlist-card')?.requestUpdate()
      })
    this.requestUpdate()
  }
}
