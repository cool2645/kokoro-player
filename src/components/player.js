import { html, css } from 'lit-element'
import { PLAY_ORDER_SHUFFLE, PLAY_ORDER_SINGLE } from 'kokoro'

import { Component } from '../utils/component'
import { connect } from '../utils/lit-redux'
import { iconfont } from '../iconfont'

class Player extends Component {
  static get properties () {
    return {
      currentSong: { type: Object },
      playing: { type: Object },
      darkMode: { type: Boolean },
      playOrder: { type: String },
      played: { type: Number },
      buffered: { type: Array }
    }
  }

  static get styles () {
    return css`
      ${iconfont}
      :host {
        position: fixed;
      }

      .main-window {
        position: fixed;
        top: 100px;
        left: 100px;
        width: 315px;
        height: 560px;
        border-radius: 15px;
        box-shadow: 0 1px 3px #666;
        background-color: #fbfbfb;
        color: var(--kokoro-primary-color);
        padding: 10px;
      }

      .main-window.dark {
        background-color: #000;
      }
      
      .main-window.dark .underlay > .background {
        opacity: 0.94;
        filter: blur(40px);
      }

      .underlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        border-radius: 15px;
        overflow: hidden;
      }
      
      .underlay > .background {
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
      
      .move-handle {
        height: 8px;
        width: 50px;
        margin: 4px auto;
        border-radius: 6px;
        background-color: var(--kokoro-white);
        opacity: 0.94;
        cursor: grab;
      }
      
      .handle-bar {
        overflow: hidden;
        margin-top: -4px;
      }
      
      .control-box {
        height: 84px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        font-size: 24px;
        position: relative;
      }
      
      .control-box .btn {
        display: inline-block;
        line-height: 1;
        cursor: pointer;
      }
      
      .control-box .btn > .icon {
        vertical-align: top;
      }
      
      .control-box .btn.play {
        font-size: 48px;
      }

      kokoro-progress {
        position: absolute;
        bottom: 0;
        left: -10px;
        right: -10px;
        transform: translateY(50%);
      }
      
      .cover-box {
        box-sizing: border-box;
        height: 315px;
        padding: 20px;
        margin: 8px 0;
      }
      
      .cover-box > img {
        width: 100%;
      }
      
      .lyrics-box {
        padding: 0 10px;
        overflow: hidden;
      }
      
      .lyrics-box h1 {
        font-size: 24px;
        line-height: 1.45;
        margin: 0;
        font-weight: normal;
        text-overflow: ellipsis;
      }
      
      .lyrics-box h2 {
        font-size: 18px;
        line-height: 1.4;
        margin: 0;
        font-weight: normal;
        text-overflow: ellipsis;
      }
    `
  }

  render () {
    return html`
      <style>
        .underlay > .background {
          background: url("${this.currentSong?.cover}") no-repeat scroll center center / cover;
        }
        :host {
          --kokoro-white: #cecece;
          --kokoro-black: rgba(0, 0, 0, 0.8);
          --kokoro-primary-color: ${this.darkMode ? '#cecece' : 'rgba(0, 0, 0, 0.8)'};
          --kokoro-secondary-color: ${this.darkMode ? '#8e8e8e' : 'rgba(0, 0, 0, 0.4)'};
          --kokoro-border-radius: 0;
        }
      </style>
      <div class="main-window ${this.darkMode ? 'dark' : ''}">
        <div class="handle-bar">
          <div class="move-handle"></div>
        </div>
        <div class="control-box">
          <a class="btn"><i class="icon icon-lyrics"></i></a>
          <a class="btn" @click="${this.nextPlayOrder}"><i class="icon icon-${this.playOrder === PLAY_ORDER_SINGLE
            ? 'solo' : this.playOrder === PLAY_ORDER_SHUFFLE ? 'shuffle' : 'loop'}"></i></a>
          <a class="btn" @click="${this.prev}"><i class="icon icon-previous"></i></a>
          <a class="btn play" @click="${this.togglePlay}"><i
            class="icon icon-${this.playing.paused ? 'play' : 'pause'}-circle"
          ></i></a>
          <a class="btn" @click="${this.next}"><i class="icon icon-next"></i></a>
          <a class="btn"><i class="icon icon-volume"></i></a>
          <a class="btn"><i class="icon icon-playlist"></i></a>
          <kokoro-progress
            .played="${this.played}"
            .buffered="${this.buffered}"
            .currentTime="${this.playing.currentTime}"
            .totalTime="${this.playing.totalTime}"
            @kokoro-change="${(e) => { if (e.detail.commit) this.setCurrentProgress(e.detail.progress) }}"
          ></kokoro-progress>
        </div>
        <div class="cover-box">
          <img src="${this.currentSong?.cover}" />
        </div>
        <div class="lyrics-box">
          <h1>${this.currentSong?.title}</h1>
          <h2>${this.currentSong?.artist}</h2>
        </div>
        <div class="underlay">
          <div class="background"></div>
          <div class="filter"></div>
        </div>
      </div>
    `
  }

  prev () {
    this.context.kokoro?.previous()
  }

  next () {
    this.context.kokoro?.next()
  }

  togglePlay () {
    this.context.kokoro?.togglePlay()
  }

  nextPlayOrder () {
    this.context.kokoro?.nextPlayOrder()
  }

  setCurrentProgress (progress) {
    this.context.kokoro?.setCurrentTime(progress * this.playing.totalTime)
  }

  setVolume (volume) {
    this.context.kokoro?.setVolume(volume)
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.playlist.songs[
      state.playlist.orderedList[state.playlist.orderedIndexOfPlaying]
    ],
    playing: state.playing,
    played: state.playing.currentTime / state.playing.totalTime,
    buffered: state.playing.bufferedTime?.map(
      (buf) => [buf[0] / state.playing.totalTime, buf[1] / state.playing.totalTime]
    ),
    playOrder: state.playlist.playOrder
  }
}

const KokoroPlayer = connect(mapStateToProps)(Player)
window.customElements.define('kokoro-player', KokoroPlayer)
export default KokoroPlayer
