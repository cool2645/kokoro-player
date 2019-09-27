import { withContext } from 'wc-context/lit-element'
import { LitElement } from 'lit-element'

const Component = withContext(LitElement)

export default class extends Component {
  static get observedContexts() {
    return ['kokoro']
  }

  contextChangedCallback(name, oldValue, value) {
    this.requestUpdate()
  }
}
