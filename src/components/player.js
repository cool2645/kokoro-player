import { html } from 'lit-element'

import { connect } from '../utils/redux'
import Component from '../utils/component'

class Player extends Component {
  static get properties () {
    return { json: { type: String } }
  }

  render () {
    return html`
      <p>Kokoro: ${this.json}</p>
    `
  }
}

const mapStateToProps = (state) => {
  return {
    json: JSON.stringify(state)
  }
}

export default connect(mapStateToProps)(Player)
