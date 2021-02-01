import { html, css, LitElement } from 'lit-element'

import { iconfont } from '../iconfont'

export default class Button extends LitElement {
  static get properties () {
    return {
      type: { type: String },
      icon: { type: String },
      disabled: { type: Boolean },
      size: { type: String }
    }
  }

  static get styles () {
    return css`
      ${iconfont}
      :host {
        display: inline-block;
      }

      .btn {
        cursor: pointer;
        padding: 10px 12px;
        border-radius: 15px;
        color: var(--kokoro-primary-color);
      }
      
      .btn.disabled {
        cursor: default;
      }

      .btn.primary {
        background-color: var(--kokoro-primary-color);
        color: var(--kokoro-background-color);
        border: 1px var(--kokoro-primary-color) solid;
      }

      .btn.bordered {
        border: 1px solid;
      }

      :host(:last-child) {
        margin-right: 0;
      }

      .btn.medium,
      .btn.small {
        font-size: 12px;
        padding: 4px 8px;
        border-radius: 8px;
      }

      .btn.mini {
        font-size: 10px;
        padding: 2px 6px;
        border-radius: 6px;
      }
    `
  }

  render () {
    return html`
      <style>
        :host {
          margin-right: ${this.size === 'mini'
            ? 2 : this.size === 'medium' || this.size === 'small'
              ? 4 : 10}px;
        }
      </style>
      <div class="btn ${this.type} ${this.disabled ? 'disabled' : ''} ${this.size}">
        <i class="icon icon-${this.icon}"></i>
        <slot></slot>
      </div>
    `
  }
}

window.customElements.define('kokoro-button', Button)
