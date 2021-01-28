import { html, css, LitElement } from 'lit-element'

import { iconfont } from '../iconfont'

export default class Button extends LitElement {
  static get properties () {
    return {
      type: { type: String },
      icon: { type: String }
    }
  }

  static get styles () {
    return css`
      ${iconfont}
      :host {
        display: inline-block;
        margin-right: 10px;
      }

      .btn {
        cursor: pointer;
        padding: 10px 12px;
        border-radius: 15px;
      }

      .btn.primary {
        background-color: #ffe9f8;
        color: #04142d;
      }

      .btn.bordered {
        border: 1px solid;
      }

      :host(:last-child) {
        margin-right: 0;
      }

      @media screen and (max-width: 500px) {
        :host {
          margin-right: 4px;
        }
        .btn {
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 8px;
        }
      }

      @media screen and (max-width: 370px) {
        :host {
          margin-right: 2px;
        }
        .btn {
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 6px;
        }
      }
    `
  }

  render () {
    return html`
      <div class="btn ${this.type}">
        <i class="icon icon-${this.icon}"></i>
        <slot></slot>
      </div>
    `
  }
}

window.customElements.define('kokoro-button', Button)
