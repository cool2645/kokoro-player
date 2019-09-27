import { withContext } from 'wc-context/lit-element'
import { LitElement, html } from 'lit-element'

const Component = withContext(LitElement)

export default class Player extends Component {
  static get observedContexts() {
    return ['kokoro']
  }

  contextChangedCallback(name, oldValue, value) {
    console.log(
      this.constructor.name,
      `context "${name}" changed from "${oldValue}" to "${value}"`
    )
    this.requestUpdate()
  }

  render () {
    return html`
      <p>Kokoro: ${this.context.kokoro}</p>
    `
  }

}
