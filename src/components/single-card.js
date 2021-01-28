import { html, css } from 'lit-element'

import { connect } from '../utils/lit-redux'
import { Component } from '../utils/component'
import { iconfont } from '../iconfont'

class SingleCard extends Component {
  static get properties () {
    return {
      title: { type: String },
      artist: { type: String },
      album: { type: String },
      src: { type: String },
      cover: { type: String },
      lyrics: { type: String },
      json: { type: String }
    }
  }

  static get styles () {
    return css`
      ${iconfont}
      :host {
        display: block;
        max-width: 500px;
        max-height: 200px;
        margin: 0 auto;
      }

      .cover {
        width: 40%;
        max-width: 200px;
      }
    `
  }

  render () {
    return html`
      <img class="cover" src="${this.cover}" alt="cover" />
      <i class="icon icon-right"></i>
    `
  }
}

const mapStateToProps = (state) => {
  return {
    json: JSON.stringify(state)
  }
}

export default connect(mapStateToProps)(SingleCard)
