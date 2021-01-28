import { html, css } from 'lit-element'

import { connect } from '../utils/lit-redux'
import { Component } from '../utils/component'
import './icon-button'

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
      :host {
        display: flex;
        max-width: 500px;
        max-height: 200px;
        margin: 0 auto;
        box-shadow: rgba(0, 0, 0, 0.1) 0.96px 0.96px 1.2px 0,
          rgba(0, 0, 0, 0.1) -0.96px 0px 0.96px 0px;
      }

      .cover {
        display: inline-block;
        width: 40%;
        max-width: 200px;
        position: relative;
      }
      
      .cover::before {
        content: '';
        display: block;
        padding-bottom: 100%;
      }
      
      .cover > img {
        position: absolute;
        top: 0;
        width: 100%;
        max-height: 100%;
      }
      
      .control-panel {
        flex: 1 1 auto;
        padding: 15px 10px 15px 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
      }
      
      .title {
        font-weight: normal;
        font-size: 20px;
        line-height: 1.4;
        margin: 2px 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .artist {
        font-weight: normal;
        font-size: 16px;
        line-height: 1.25;
        margin: 2px 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      @media screen and (max-width: 480px) {
        .title {
          font-size: 16px;
        }
        
        .artist {
          font-size: 14px;
        }

        .control-panel {
          padding-left: 15px;
        }
      }

      @media screen and (max-width: 400px) {
        .control-panel {
          padding-left: 10px;
        }
        
        .lyrics {
          display: none;
        }
      }

      @media screen and (max-width: 350px) {
        .artist {
          display: none;
        }
      }
    `
  }

  render () {
    return html`
      <div class="cover">
        <img class="cover" src="${this.cover}" alt="cover" />
      </div>
      <div class="control-panel">
        <div class="header">
          <h1 class="title">${this.title}</h1>
          <h2 class="artist">${this.artist} - ${this.album}</h2>
        </div>
        <div class="lyrics"></div>
        <div class="control">
          <kokoro-button
            type="primary"
            icon="play"
          >立即播放</kokoro-button>
          <kokoro-button
            type="bordered"
            icon="play-next"
          >下一首播放</kokoro-button>
        </div>
      </div>
    `
  }
}

const mapStateToProps = (state) => {
  return {
    json: JSON.stringify(state)
  }
}

const KokoroSingleCard = connect(mapStateToProps)(SingleCard)
window.customElements.define('kokoro-single-card', KokoroSingleCard)
export default KokoroSingleCard
