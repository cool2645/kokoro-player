import { html, css } from 'lit-element'

import { connect } from '../../utils/lit-redux'
import { Component } from '../../utils/component'

class Player extends Component {
  static get properties () {
    return { json: { type: String } }
  }

  static get styles () {
    return css`
      :host {
        position: fixed;
        top: 100px;
        left: 100px;
        width: 315px;
        height: 560px;
      }
    `
  }

  render () {
    return html`
    `
  }
}

const mapStateToProps = (state) => {
  return {
    json: JSON.stringify(state)
  }
}

const KokoroPlayer = connect(mapStateToProps)(Player)
window.customElements.define('kokoro-player', KokoroPlayer)
export default KokoroPlayer
