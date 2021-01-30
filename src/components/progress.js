import { html, css } from 'lit-element'

import Track from './track'

export default class Progress extends Track {
  static get styles () {
    return css`
      ${super.styles}
      :host(:hover) {
        height: 5px;
      }

      :host(:hover) .handle {
        top: -7px;
      }
      
      .bar {
        border-radius: 0 0 var(--kokoro-border-radius, 4px) var(--kokoro-border-radius, 4px);
      }
      
      .handle {
        border: 2px var(--kokoro-primary-color) solid;
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
      ${super.render()}
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
