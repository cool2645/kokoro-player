import { html, css, LitElement } from 'lit-element'

export default class Track extends LitElement {
  static get properties () {
    return {
      played: { type: Number },
      buffered: { type: Array },
      currentTime: { type: Number },
      totalTime: { type: Number },
      dirtyPlayed: { type: Number },
      dragging: { type: Boolean }
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
        cursor: pointer;
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
        margin: 0 4px;
      }
      
      .handle {
        position: absolute;
        top: -6px;
        width: 6px;
        height: 6px;
        border: 2px var(--kokoro-primary-color) solid;
        border-radius: 50%;
        background-color: var(--kokoro-primary-color);
        cursor: pointer;
      }
    `
  }

  constructor () {
    super()
    this.drag = this.drag.bind(this)
    this.stopDragging = this.stopDragging.bind(this)
  }

  render () {
    return html`
      <div class="bar" id="bar"
           @mousedown="${this.startDragging}"
      >
        <div class="progress"></div>
        ${this.buffered?.map((buf) => html`
        <div class="buffered" style="left: ${buf[0] * 100}%; width: ${(buf[1] - buf[0]) * 100}%"></div>
      `)}
        <div class="played"
             style="width: ${(this.dragging ? this.dirtyPlayed : (this.played || 0)) * 100}%">
        </div>
      </div>
      <div class="track">
        <div class="handle"
             style="left: calc(${(this.dragging ? this.dirtyPlayed : (this.played || 0)) * 100}% - 5px)"
             @mousedown="${this.startDragging}"
             @touchstart="${this.startDragging}"
        ></div>
      </div>
    `
  }

  startDragging (e) {
    this.dragging = true
    e.stopPropagation()
    this.drag(e)
    if (e.type === 'mousedown') {
      document.addEventListener('mousemove', this.drag)
      document.addEventListener('mouseup', this.stopDragging)
    }
    if (e.type === 'touchstart') {
      document.addEventListener('touchmove', this.drag)
      document.addEventListener('touchend', this.stopDragging)
      document.addEventListener('touchcancel', this.stopDragging)
    }
  }

  drag (e) {
    e = (typeof window.TouchEvent !== 'undefined' && e instanceof window.TouchEvent)
      ? e.changedTouches[0]
      : e
    const rect = this.shadowRoot.querySelector('#bar').getBoundingClientRect()
    this.dirtyPlayed = Math.max(Math.min((e.clientX - rect.left - 3) / (rect.width - 6), 1), 0)
    this.syncDirtyPlayed()
  }

  stopDragging () {
    this.dragging = false
    this.commitDirtyPlayed()
    document.removeEventListener('mousemove', this.drag)
    document.removeEventListener('mouseup', this.stopDragging)
    document.removeEventListener('touchmove', this.drag)
    document.removeEventListener('touchend', this.stopDragging)
    document.removeEventListener('touchcancel', this.stopDragging)
  }

  syncDirtyPlayed () {
    this.dispatchEvent(new window.CustomEvent('kokoro-change', {
      detail: {
        progress: this.dirtyPlayed,
        commit: false
      }
    }))
  }

  commitDirtyPlayed () {
    this.dispatchEvent(new window.CustomEvent('kokoro-change', {
      detail: {
        progress: this.dirtyPlayed,
        commit: true
      }
    }))
  }
}

window.customElements.define('kokoro-track', Track)
