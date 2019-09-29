import { html } from 'lit-element'

import { Component } from './component'

export default class Provider extends Component {
  static connect (kokoro) {
    return class extends Provider {
      constructor () {
        super()
        this.kokoro = kokoro
      }
    }
  }

  connect (kokoro) {
    this.kokoro = kokoro
  }

  disconnect () {
    this.kokoro = null
  }

  static get properties () {
    return {
      kokoro: { type: Object }
    }
  }

  static get providedContexts () {
    return {
      kokoro: { property: 'kokoro' }
    }
  }

  render () {
    return html`<slot/>`
  }
}
