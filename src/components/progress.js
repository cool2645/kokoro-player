import { html, css, LitElement } from 'lit-element'

export default class Progress extends LitElement {
  static get properties () {
    return {
      played: { type: Number },
      buffered: { type: Array },
      currentTime: { type: Number },
      totalTime: { type: Number }
    }
  }

  static get styles () {
    return css`
      :host {
        display: block;
        height: 3px;
        user-select: none;
      }
      
      :host(:hover) {
        height: 5px;
      }

      :host(:hover) .handle {
        top: -7px;
      }
      
      .bar {
        position: relative;
        height: 100%;
        border-radius: 0 0 var(--kokoro-border-radius, 4px) var(--kokoro-border-radius, 4px);
        overflow: hidden;
      }

      .progress {
        height: 100%;
        background-color: var(--kokoro-secondary-color);
        opacity: 0.3;
      }
      
      .played {
        position: absolute;
        top: 0;
        height: 100%;
        background-color: var(--kokoro-primary-color);
      }
      
      .buffered {
        position: absolute;
        top: 0;
        height: 100%;
        background-color: var(--kokoro-secondary-color);
        opacity: 0.6;
      }
      
      .track {
        position: relative;
        margin: 0 3px;
      }
      
      .handle {
        position: absolute;
        top: -6px;
        width: 6px;
        height: 6px;
        border: 2px var(--kokoro-primary-color) solid;
        border-radius: 50%;
        background-color: #fff;
      }
      
      .handle:hover {
        transform: scale(1.5);
      }
      
      .label {
        display: none;
        position: absolute;
        bottom: 3px;
        font-size: 12px;
      }
      
      .label.left {
        left: 6px;
      }

      .label.right {
        right: 6px;
      }

      :host(:hover) .label {
        display: block;
      }

      @media screen and (max-width: 400px) {
        .label {
          bottom: 1px;
        }
      }
    `
  }

  render () {
    return html`
      <div class="bar">
        <div class="progress"></div>
        ${this.buffered?.map((buf) => html`
        <div class="buffered" style="left: ${buf[0] * 100}%; width: ${(buf[1] - buf[0]) * 100}%"></div>
      `)}
        <div class="played" style="width: ${(this.played || 0) * 100}%"></div>
      </div>
      <div class="track">
        <div class="handle"
             style="left: calc(${(this.played || 0) * 100}% - 4px)"
        ></div>
      </div>
      <div class="label left">${this.formatTime(this.currentTime)}</div>
      <div class="label right">${this.formatTime(this.totalTime)}</div>
    `
  }

  formatTime (time) {
    if (time === null || time === undefined || isNaN(time)) {
      return '--:--'
    }
    const h = Math.floor(time / 3600)
    const m = Math.floor(time % 3600 / 60)
    const s = Math.floor(time % 60)
    let fmtStr = ''
    fmtStr += s < 10 ? '0' + s : s
    fmtStr = (m < 10 ? '0' + m : m) + ':' + fmtStr
    if (h > 0) {
      fmtStr = (h < 10 ? '0' + h : h) + ':' + fmtStr
    }
    return fmtStr
  }
}

window.customElements.define('kokoro-progress', Progress)
