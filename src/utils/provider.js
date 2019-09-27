import { withContext } from 'wc-context/lit-element'
import { LitElement, html } from 'lit-element'

const Component = withContext(LitElement)

export function connect (kokoro) {
  return class extends Provider {
    constructor () {
      super()
      this.kokoro = kokoro
    }
  }
}

export default class Provider extends Component {
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

  render() {
    return html`<slot/>`
  }
}
