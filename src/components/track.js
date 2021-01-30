import { html, css, LitElement } from 'lit-element'

export default class Track extends LitElement {
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
      
      .bar {
        position: relative;
        height: 100%;
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
        background-color: var(--kokoro-primary-color);
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
    `
  }
}

window.customElements.define('kokoro-track', Track)
