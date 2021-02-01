import { html, css } from 'lit-element'

import { Component } from '../utils/component'
import { connect } from '../utils/lit-redux'

class Player extends Component {
  static get properties () {
    return {
      currentSong: { type: Object },
      darkMode: { type: Boolean }
    }
  }

  static get styles () {
    return css`
      :host {
        position: fixed;
      }

      .main-window {
        position: fixed;
        top: 100px;
        left: 100px;
        width: 315px;
        height: 560px;
        overflow: hidden;
        border-radius: 15px;
        box-shadow: 0 1px 3px #666;
        background-color: #fbfbfb;
      }

      .main-window.dark {
        background-color: #000;
      }
      
      .main-window.dark .underlay {
        opacity: 0.94;
        filter: blur(40px);
      }

      .small-window {
        position: fixed;
      }

      .underlay {
        position: absolute;
        top: -50px;
        left: -50px;
        right: -50px;
        bottom: -50px;
        opacity: 0.06;
      }
      
      .dark .underlay > .filter {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.6);
      }
    `
  }

  render () {
    return html`
      <style>
        .underlay {
          background: url("${this.currentSong?.cover}") no-repeat scroll center center / cover;
        }
      </style>
      <div class="main-window ${this.darkMode ? 'dark' : ''}">
        <div class="underlay">
          <div class="filter"></div>
        </div>
      </div>
    `
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.playlist.songs[
      state.playlist.orderedList[state.playlist.orderedIndexOfPlaying]
    ]
  }
}

const KokoroPlayer = connect(mapStateToProps)(Player)
window.customElements.define('kokoro-player', KokoroPlayer)
export default KokoroPlayer
