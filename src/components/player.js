import { html, css } from 'lit-element'

import { connect } from '../utils/lit-redux'
import { Component } from '../utils/component'

class Player extends Component {
  static get properties () {
    return { json: { type: String } }
  }

  static get styles () {
    return css`
      p {
        word-break: break-all;
      }
    `
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
