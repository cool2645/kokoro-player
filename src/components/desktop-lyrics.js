import { html, css, LitElement } from 'lit-element'

import { iconfont } from '../iconfont'

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
      isLocked: { type: Boolean },
      paused: { type: Boolean }
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
        max-width: 600px;
        transform: translate(-50%, -50%);
        user-select: none;
        padding: 35px 20px;
      }

      .desktop-lyrics-window:hover {
        background: rgba(0, 0, 0, 0.6);
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
        border-radius: 4px;
        cursor: grab;
      }

      .desktop-lyrics-window.locked:hover {
        background: none;
        box-shadow: none;
        cursor: inherit;
      }

      .desktop-lyrics-window.dragging {
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

      .desktop-lyrics-window .btn {
        color: var(--kokoro-white);
        text-shadow: 0 0 1px var(--kokoro-white);
        font-size: 14px;
        cursor: pointer;
      }

      .desktop-lyrics-window > .btn.lock {
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

      .desktop-lyrics-window.locked:hover > .btn.lock {
        display: block;
      }

      .desktop-lyrics-window > .tool-bar > .btn {
        margin: 0 3px;
      }

      .desktop-lyrics-window > .tool-bar > .btn > .preview {
        width: 14px;
        height: 14px;
        display: inline-block;
        vertical-align: top;
        border-radius: 2px;
      }

      .desktop-lyrics-window:hover > .tool-bar {
        display: flex;
      }

      .desktop-lyrics-window.locked:hover > .tool-bar {
        display: none;
      }

      .desktop-lyrics-window > .desktop-lyrics-panel {
        overflow: hidden;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .desktop-lyrics-window > .desktop-lyrics-panel > .lyrics-track {
        max-width: 100%;
        overflow: hidden;
      }

      .desktop-lyrics {
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        white-space: pre;
        line-height: normal;
        display: inline-block;
        line-height: normal;
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
    if (changedProperties.get('currentTime') && this.lyrics) {
      this.shadowRoot.querySelector('#desktop-lyrics-track').scrollLeft =
        (changedProperties.get('currentTime') - this.lyrics.currentSentenceStart) /
        (this.lyrics.currentSentenceEnd - this.lyrics.currentSentenceStart) *
        this.shadowRoot.querySelector('#desktop-lyrics-track').scrollWidth
    }
  }

  render () {
    return html`
      <style>
        .desktop-lyrics {
          background: ${this.colorSchemes[this.colorSchemeIndex]?.value};
          font-size: ${this.fontSize}px;
        }
        .desktop-lyrics-window > .btn.lock {
          background: ${this.colorSchemes[this.colorSchemeIndex]?.value};
        }
      </style>
      <div
        id="desktop-lyrics-window"
        class="desktop-lyrics-window ${this.dragging ? 'dragging' : ''} ${this.isLocked ? 'locked' : ''}"
        style="left: ${this.horizontalCenter}px; top: ${this.verticalCenter}px"
        @mousedown="${this.startDragging}"
        @touchstart="${this.startDragging}"
      >
        <div class="desktop-lyrics-panel">
          <div id="desktop-lyrics-track" class="lyrics-track">
            <span class="desktop-lyrics">${this.lyrics?.currentSentence}</span>
          </div>
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
    `
  }

  nextDesktopLyricsColorScheme () {
    if (this.colorSchemeIndex + 1 === this.colorSchemes.length) {
      this.colorSchemeIndex = 0
    } else {
      this.colorSchemeIndex++
    }
  }

  startDragging (e) {
    if (this.isLocked) return
    this.dragging = true
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
