import { html, css, LitElement } from 'lit-element'

import { iconfont } from '../iconfont'
import locale from '../utils/locale'

export default class DesktopLyrics extends LitElement {
  static get properties () {
    return {
      lyrics: { type: Object },
      currentTime: { type: Number },
      dragging: { type: Boolean },
      verticalCenter: { type: Number },
      horizontalCenter: { type: Number },
      colorSchemes: { type: Array },
      colorSchemeIndex: { type: Number },
      fontSize: { type: Number },
      mobileFontSize: { type: Number },
      isLocked: { type: Boolean },
      paused: { type: Boolean },
      langAvailable: { type: Array },
      isSettingsBarShowing: { type: Boolean }
    }
  }

  static get styles () {
    return css`
      ${iconfont}
      :host {
        position: fixed;
      }
      
      .desktop-lyrics-window.hide {
        display: none;
      }

      .desktop-lyrics-window {
        position: fixed;
        width: 90%;
        box-sizing: border-box;
        max-width: 700px;
        transform: translate(-50%, -50%);
        user-select: none;
        padding: 35px 20px;
        cursor: grab;
      }

      .desktop-lyrics-window:hover {
        background: rgba(0, 0, 0, 0.6);
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
        border-radius: 4px;
      }

      .desktop-lyrics-window.locked:hover,
      .mobile-lyrics-window.locked:hover {
        background: none;
        box-shadow: none;
        cursor: inherit;
      }

      .desktop-lyrics-window.dragging,
      .mobile-lyrics-window.dragging {
        cursor: grabbing;
      }

      .desktop-lyrics-window > .tool-bar {
        position: absolute;
        top: 6px;
        left: 50%;
        transform: translateX(-50%);
        display: none;
        font-size: 14px;
        line-height: 1;
        white-space: nowrap;
      }

      .desktop-lyrics-window > .btn.close {
        display: none;
        position: absolute;
        top: 6px;
        left: 6px;
        line-height: 1;
      }

      .desktop-lyrics-window > .btn.close > .icon {
        vertical-align: top;
      }

      .desktop-lyrics-window:hover > .btn.close {
        display: block;
      }

      .desktop-lyrics-window.locked:hover > .btn.close {
        display: none;
      }

      .desktop-lyrics-window .btn,
      .mobile-lyrics-window .btn {
        color: var(--kokoro-white);
        font-size: 14px;
        cursor: pointer;
      }

      .desktop-lyrics-window .btn {
        text-shadow: 0 0 1px var(--kokoro-white);
      }

      .desktop-lyrics-window > .btn.lock,
      .mobile-lyrics-window > .btn.lock {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        padding: 1px 4px;
        border-radius: 4px;
        display: none;
        color: transparent;
        background-clip: text;
        -webkit-background-clip: text;
      }

      .desktop-lyrics-window.locked:hover > .btn.lock,
      .mobile-lyrics-window.locked:hover > .btn.lock {
        display: block;
      }

      .desktop-lyrics-window > .tool-bar > .btn {
        margin: 0 3px;
      }

      .btn > .icon {
        vertical-align: middle;
      }

      .preview {
        width: 14px;
        height: 14px;
        display: inline-block;
        vertical-align: middle;
        border-radius: 2px;
      }

      .desktop-lyrics-window:hover > .tool-bar {
        display: flex;
      }

      .desktop-lyrics-window.locked:hover > .tool-bar {
        display: none;
      }

      .desktop-lyrics-window > .desktop-lyrics-panel,
      .mobile-lyrics-window > .desktop-lyrics-panel {
        overflow: hidden;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .desktop-lyrics-window > .desktop-lyrics-panel > .lyrics-track,
      .mobile-lyrics-window > .desktop-lyrics-panel > .lyrics-track {
        max-width: 100%;
        line-height: normal;
      }

      .desktop-lyrics-window > .desktop-lyrics-panel > .lyrics-track {
        overflow: hidden;
      }

      .desktop-lyrics {
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        white-space: pre;
        line-height: normal;
        display: inline-block;
        text-align: center;
      }

      .translation-track .desktop-lyrics {
        white-space: pre-wrap;
      }

      .mobile-lyrics-window.hide {
        display: none;
      }
      
      .mobile-lyrics-window {
        display: none;
        position: fixed;
        left: 50%;
        width: 95%;
        box-sizing: border-box;
        transform: translate(-50%, -50%);
        user-select: none;
        cursor: grab;
      }

      .mobile-lyrics-window:hover {
        background: rgba(0, 0, 0, 0.6);
      }

      .mobile-lyrics-window > .tool-bar {
        visibility: hidden;
        display: flex;
        justify-content: space-between;
      }

      .mobile-lyrics-window:hover > .tool-bar {
        visibility: visible;
      }

      .mobile-lyrics-window.locked:hover > .tool-bar {
        visibility: hidden;
      }

      .mobile-lyrics-window > .tool-bar.top .btn {
        padding: 4px 8px 0 8px;
      }

      .mobile-lyrics-window > .tool-bar.middle {
        margin: 10px 0;
      }

      .mobile-lyrics-window > .tool-bar.middle .btn {
        padding: 0 8px 0 8px;
        font-size: 18px;
      }

      .mobile-lyrics-window > .tool-bar.bottom {
        display: block;
      }

      .mobile-lyrics-window > .tool-bar.bottom.hide {
        display: none;
      }

      .mobile-lyrics-window > .tool-bar.bottom > * {
        display: inline-block;
        margin-bottom: 10px;
        padding: 0 10px;
      }

      @media screen and (max-width: 500px) {
        .desktop-lyrics-window {
          display: none;
        }

        .mobile-lyrics-window {
          display: block;
        }
      }
    `
  }

  constructor () {
    super()
    this.drag = this.drag.bind(this)
    this.stopDragging = this.stopDragging.bind(this)
    this.isLocked = false
  }

  updated (changedProperties) {
    if (changedProperties.has('currentTime') && this.lyrics) {
      this.shadowRoot.querySelector('#desktop-lyrics-track').scrollLeft =
        (this.currentTime - this.lyrics.currentSentenceStart) /
        (this.lyrics.currentSentenceEnd - this.lyrics.currentSentenceStart) *
        this.shadowRoot.querySelector('#desktop-lyrics-track').scrollWidth -
        this.shadowRoot.querySelector('#desktop-lyrics-track').clientWidth / 2
    }
  }

  get notStartedYet () {
    return this.paused && this.currentTime === 0
  }

  render () {
    return html`
      <style>
        .desktop-lyrics {
          background: ${this.colorSchemes[this.colorSchemeIndex]?.value};
          font-size: ${this.fontSize}px;
        }
        .translation-track .desktop-lyrics {
          font-size: ${(this.fontSize + 10) / 2}px;
        }
        .desktop-lyrics-window > .btn.lock,
        .mobile-lyrics-window > .btn.lock {
          background: ${this.colorSchemes[this.colorSchemeIndex]?.value};
        }

        @media screen and (max-width: 500px) {
          .desktop-lyrics {
            font-size: ${this.mobileFontSize}px;
          }
          .translation-track .desktop-lyrics {
            font-size: ${(this.mobileFontSize + 10) / 2}px;
          }
        }
      </style>
      <div
        class="desktop-lyrics-window ${this.dragging ? 'dragging' : ''} ${this.isLocked ? 'locked' : ''}"
        style="left: ${this.horizontalCenter}px; top: ${this.verticalCenter}px"
        @mousedown="${this.startDragging}"
        @touchstart="${this.startDragging}"
      >
        <div class="desktop-lyrics-panel">
          <div id="desktop-lyrics-track" class="lyrics-track">
            <span class="desktop-lyrics"
            >${this.lyrics && !this.notStartedYet ? this.lyrics.currentSentence : locale.banner}</span>
          </div>
          ${this.lyrics && !this.notStartedYet && this.lyrics?.lang && this.lyrics.currentSentenceTranslation
            ? html`
              <div class="lyrics-track translation-track"">
                <span class="desktop-lyrics"
                >${this.lyrics.currentSentenceTranslation}</span>
              </div>`
            : ''}
        </div>
        <div class="tool-bar">
          <a class="btn" @click="${() => { this.isLocked = !this.isLocked }}"
          ><i class="icon icon-lock"></i></a>
          <a class="btn" @click="${this.prev}"><i class="icon icon-left"></i></a>
          <a class="btn" @click="${this.togglePlay}"
          ><i class="icon icon-${this.paused ? 'play' : 'pause'}"></i></a>
          <a class="btn" @click="${this.next}"><i class="icon icon-right"></i></a>
          <a class="btn" @click="${() => { if (this.fontSize > 10) this.fontSize -= 4 }}"
          ><i class="icon icon-font-smaller"></i></a>
          <a class="btn" @click="${() => { this.fontSize += 4 }}"
          ><i class="icon icon-font-larger"></i></a>
          <a
            class="btn"
            title="${this.colorSchemes[this.colorSchemeIndex].name}"
            @click="${this.nextDesktopLyricsColorScheme}"
          >
            <i class="icon icon-font-color"></i>
            <i
              class="preview"
              style="background: ${this.colorSchemes[this.colorSchemeIndex].value}"
            ></i>
          </a>
          ${this.langAvailable?.length ? html`
            <a class="btn" @click="${this.nextLang}"
            >${this.lyrics?.langName || this.lyrics?.lang || html`<i class="icon icon-translate"></i>`}</a>
          ` : ''}
        </div>
        <a
          class="btn close"
          @click="${this.toggleDesktopLyrics}"
        ><i class="icon icon-close"></i></a>
        <a
          class="btn lock"
          @click="${() => { this.isLocked = !this.isLocked }}"
        ><i class="icon icon-lock"></i></a>
      </div>
      <div
        class="mobile-lyrics-window ${this.dragging ? 'dragging' : ''} ${this.isLocked ? 'locked' : ''}"
        style="top: ${this.verticalCenter}px"
        @mousedown="${this.startDragging}"
        @touchstart="${this.startDragging}"
      >
        <div class="tool-bar top">
          <a
            class="btn close"
            @click="${this.toggleDesktopLyrics}"
          ><i class="icon icon-close"></i></a>
          <span></span>
        </div>
        <div class="desktop-lyrics-panel">
          <div class="lyrics-track">
            <span class="desktop-lyrics"
            >${this.lyrics && !this.notStartedYet ? this.lyrics.currentSentence : locale.banner}</span>
          </div>
          ${this.lyrics && !this.notStartedYet && this.lyrics?.lang && this.lyrics.currentSentenceTranslation
            ? html`
              <div class="lyrics-track translation-track"">
                <span class="desktop-lyrics"
                >${this.lyrics.currentSentenceTranslation}</span>
              </div>`
            : ''}
        </div>
        <div class="tool-bar middle">
          <a
            class="btn settings"
            @click="${() => { this.isSettingsBarShowing = !this.isSettingsBarShowing }}"
          ><i class="icon icon-setting"></i></a>
          <div class="control">
            <a class="btn" @click="${this.prev}"><i class="icon icon-left"></i></a>
            <a class="btn" @click="${this.togglePlay}"
            ><i class="icon icon-${this.paused ? 'play' : 'pause'}"></i></a>
            <a class="btn" @click="${this.next}"><i class="icon icon-right"></i></a>
          </div>
          <a
            class="btn lock"
            @click="${() => { this.isLocked = !this.isLocked }}"
          ><i class="icon icon-lock"></i></a>
        </div>
        <div class="tool-bar bottom ${this.isSettingsBarShowing ? '' : 'hide'}">
          <a class="btn" @click="${() => { if (this.mobileFontSize > 10) this.mobileFontSize -= 2 }}"
          ><i class="icon icon-font-smaller"></i></a>
          <a class="btn" @click="${() => { this.mobileFontSize += 2 }}"
          ><i class="icon icon-font-larger"></i></a>
          ${this.colorSchemes.map((colorScheme, index) => html`
            <a
              class="btn"
              title="${colorScheme.name}"
              @click="${() => { this.colorSchemeIndex = index }}"
            >
              <i
                class="preview"
                style="background: ${colorScheme.value}"
              ></i>
            </a>
          `)}
          ${this.langAvailable?.length ? html`
            <a class="btn" @click="${this.nextLang}"
            ><i class="icon icon-translate"></i></a>
          ` : ''}
          ${this.langAvailable?.map((lang) => html`
            <a class="btn" @click="${() => this.setLang(lang.lang)}"
            >${lang.name || lang.lang}</a>
          `)}
        </div>
        <a
          class="btn lock"
          @click="${() => { this.isLocked = !this.isLocked }}"
        ><i class="icon icon-lock"></i></a>
      </div>
    `
  }

  nextLang () {
    let index = this.langAvailable.findIndex((lang) => lang.lang === this.lyrics?.lang)
    index++
    if (index === this.langAvailable.length) index = -1
    this.setLang(this.langAvailable[index]?.lang)
  }

  setLang (lang) {
    this.dispatchEvent(new window.CustomEvent('kokoro-change', {
      detail: {
        lang: lang || null
      }
    }))
  }

  nextDesktopLyricsColorScheme () {
    if (this.colorSchemeIndex + 1 === this.colorSchemes.length) {
      this.colorSchemeIndex = 0
    } else {
      this.colorSchemeIndex++
    }
  }

  startDragging (e) {
    this.dragging = true
    e.stopPropagation()
    const e1 = (typeof window.TouchEvent !== 'undefined' && e instanceof window.TouchEvent)
      ? e.changedTouches[0]
      : e
    this.cursorX = e1.clientX
    this.cursorY = e1.clientY
    this.drag(e)
    if (e.type === 'mousedown') {
      document.addEventListener('mousemove', this.drag)
      document.addEventListener('mouseup', this.stopDragging)
    }
    if (e.type === 'touchstart') {
      document.addEventListener('touchmove', this.drag, { passive: false })
      document.addEventListener('touchend', this.stopDragging)
      document.addEventListener('touchcancel', this.stopDragging)
    }
  }

  drag (e) {
    if (e.type === 'touchmove') e.preventDefault()
    e = (typeof window.TouchEvent !== 'undefined' && e instanceof window.TouchEvent)
      ? e.changedTouches[0]
      : e
    this.horizontalCenter += e.clientX - this.cursorX
    this.verticalCenter += e.clientY - this.cursorY
    this.cursorX = e.clientX
    this.cursorY = e.clientY
  }

  stopDragging () {
    this.dragging = false
    document.removeEventListener('mousemove', this.drag)
    document.removeEventListener('mouseup', this.stopDragging)
    document.removeEventListener('touchmove', this.drag)
    document.removeEventListener('touchend', this.stopDragging)
    document.removeEventListener('touchcancel', this.stopDragging)
  }

  prev () {
    this.dispatchEvent(new window.CustomEvent('kokoro-action', {
      detail: {
        action: 'prev'
      }
    }))
  }

  next () {
    this.dispatchEvent(new window.CustomEvent('kokoro-action', {
      detail: {
        action: 'next'
      }
    }))
  }

  togglePlay () {
    this.dispatchEvent(new window.CustomEvent('kokoro-action', {
      detail: {
        action: 'togglePlay'
      }
    }))
  }

  toggleDesktopLyrics () {
    this.dispatchEvent(new window.CustomEvent('kokoro-action', {
      detail: {
        action: 'toggleDesktopLyrics'
      }
    }))
  }
}

window.customElements.define('kokoro-desktop-lyrics', DesktopLyrics)
