import { html, css } from 'lit-element'
import { PLAY_ORDER_SHUFFLE, PLAY_ORDER_SINGLE } from 'kokoro'

import { connect } from '../utils/lit-redux'
import { Component } from '../utils/component'
import './icon-button'
import './track'
import './progress'
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
      primaryColor: { type: String },
      secondaryColor: { type: String },
      backgroundColor: { type: String },
      nextSongSrc: { type: String },
      currentSongSrc: { type: String },
      paused: { type: Boolean },
      playOrder: { type: String },
      played: { type: Number },
      buffered: { type: Array },
      currentTime: { type: Number },
      totalTime: { type: Number },
      type: { type: String },
      volume: { type: Number },
      showVolumeTrack: { type: Boolean }
    }
  }

  static get styles () {
    return css`
      ${iconfont}
      :host {
        color: var(--kokoro-secondary-color);
        background-color: var(--kokoro-background-color);
        display: flex;
        max-width: 500px;
        max-height: 200px;
        margin: 0 auto;
        box-shadow: rgba(0, 0, 0, 0.1) 0.96px 0.96px 1.6px 0,
          rgba(0, 0, 0, 0.1) -0.96px 0px 0.96px 0px;
        border-radius: var(--kokoro-border-radius);
        position: relative;
      }

      .cover {
        display: inline-block;
        width: 40%;
        max-width: 200px;
        position: relative;
        border-radius: var(--kokoro-border-radius) 0 0 var(--kokoro-border-radius);
        user-select: none;
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
      
      .cover > .filter {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
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
        color: var(--kokoro-primary-color);
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

        .control.current {
          margin-bottom: 0 !important;
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
      
      .control {
        user-select: none;
        white-space: nowrap;
      }
      
      .control.current {
        margin-bottom: 5px;
      }
      
      .btn {
        display: inline-block;
        text-decoration: none;
        color: inherit;
        font-size: 24px;
        margin: 5px;
        cursor: pointer;
      }
      
      .btn > .icon {
        vertical-align: top;
      }
      
      .btn:first-child {
        margin-left: 0;
      }

      .btn:last-child {
        margin-right: 0;
      }
      
      .btn.primary {
        color: var(--kokoro-primary-color);
      }

      @media screen and (max-width: 480px) {
        .btn {
          font-size: 20px;
          margin: 2px;
        }

        .btn .volume-track-container {
          top: -1px;
          height: 16px;
          width: 40px;
        }
      }

      @media screen and (max-width: 350px) {
        .btn {
          font-size: 16px;
          margin: 2px;
        }

        .btn .volume-track-container {
          top: 1px;
          height: 12px;
          width: 40px;
        }
      }
      
      kokoro-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      }
      
      .btn.volume {
        position: relative;
      }
      
      .volume-track-container {
        position: absolute;
        left: 100%;
        height: 20px;
        width: 60px;
        top: -3px;
        margin: 5px 5px 5px 0;
        padding: 0 20px 0 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        transition: all 250ms;
        cursor: initial;
      }

      .volume-track-container.hide {
        width: 0;
        padding: 0;
        margin-left: 3px;
        overflow: hidden;
      }
    `
  }

  get isConnected () {
    return !!this.context.kokoro
  }

  get isNextSong () {
    if (!this.src || !this.nextSongSrc) return false
    if (this.nextSongSrc instanceof Array && typeof this.src === 'string') {
      return this.nextSongSrc.indexOf(this.src) !== -1
    }
    return JSON.stringify(this.nextSongSrc) === JSON.stringify(this.src)
  }

  get isCurrentSong () {
    if (!this.src || !this.currentSongSrc) return false
    if (this.currentSongSrc instanceof Array && typeof this.src === 'string') {
      return this.currentSongSrc.indexOf(this.src) !== -1
    }
    return JSON.stringify(this.currentSongSrc) === JSON.stringify(this.src)
  }

  render () {
    return html`
      <style>
        :host {
          --kokoro-primary-color: ${this.primaryColor};
          --kokoro-secondary-color: ${this.secondaryColor};
          --kokoro-background-color: ${this.backgroundColor};
          --kokoro-border-radius: ${this.type === 'flat' ? '0' : '4px'}
        }
        ${this.type === 'flat'
          ? css`
            :host {
              box-shadow: none !important;
            }` : ''
        }
      </style>
      <div class="cover">
        <img class="cover" src="${this.cover}" alt="cover" />
        <div class="filter"></div>
      </div>
      <div class="control-panel">
        <div class="header">
          <h1 class="title">${this.title}</h1>
          <h2 class="artist">${this.artist} - ${this.album}</h2>
        </div>
        <div class="lyrics"></div>
        <div class="control ${this.isCurrentSong ? 'current' : ''}">
          ${this.isConnected
            ? this.isCurrentSong
              ? html`
                <a class="btn" @click="${this.prev}"><i class="icon icon-previous"></i></a>
                <a class="btn primary" @click="${this.togglePlay}">
                  <i class="icon icon-${this.paused ? 'play' : 'pause'}"></i></a>
                <a class="btn" @click="${this.next}"><i class="icon icon-next"></i></a>
                <a class="btn" @click="${this.nextPlayOrder}">
                  <i class="icon icon-${this.playOrder === PLAY_ORDER_SINGLE
                    ? 'solo' : this.playOrder === PLAY_ORDER_SHUFFLE ? 'shuffle' : 'loop'}"></i></a>
                <a class="btn volume"
                   @mouseenter="${() => { this.showVolumeTrack = true }}"
                   @mouseleave="${() => { this.showVolumeTrack = false }}"
                >
                  <i class="icon icon-volume"></i>
                  <div class="volume-track-container ${this.showVolumeTrack ? '' : 'hide'}">
                    <kokoro-track
                      .played="${this.volume}"
                      .buffered="${[0, 1]}"
                      @kokoro-change="${(e) => this.setVolume(e.detail.progress)}"
                    ></kokoro-track>
                  </div>
                </a>
              `
              : html`
                <kokoro-button
                  type="primary"
                  icon="play"
                  @click="${this.playNow}"
                >立即播放</kokoro-button>
                ${this.isNextSong
                  ? html`
                    <kokoro-button
                      type="bordered"
                      icon="ok"
                      disabled
                    >已添加</kokoro-button>`
                  : html`
                    <kokoro-button
                      type="bordered"
                      icon="play-next"
                      @click="${this.playNext}"
                    >下一首播放</kokoro-button>`
                }`
            : html`
              <kokoro-button
                type="bordered"
                icon="warn"
                disabled
              >未连接到 Kokoro 播放器</kokoro-button>`
          }
        </div>
      </div>
      ${this.isConnected && this.isCurrentSong ? html`
        <kokoro-progress
          .played="${this.played}"
          .buffered="${this.buffered}"
          .currentTime="${this.currentTime}"
          .totalTime="${this.totalTime}"
          @kokoro-change="${(e) => { if (e.detail.commit) this.setCurrentProgress(e.detail.progress) }}"
        ></kokoro-progress>` : ''
      }
    `
  }

  playNow () {
    this.context.kokoro?.setCurrentSong({
      title: this.title,
      artist: this.artist,
      album: this.album,
      src: this.src,
      lyrics: this.lyrics,
      cover: this.cover
    })
  }

  playNext () {
    this.context.kokoro?.setNextSong({
      title: this.title,
      artist: this.artist,
      album: this.album,
      src: this.src,
      lyrics: this.lyrics,
      cover: this.cover
    })
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
    this.context.kokoro?.setCurrentTime(progress * this.totalTime)
  }

  setVolume (volume) {
    this.context.kokoro?.setVolume(volume)
  }
}

function getNextSongSrc (state) {
  if (state.playlist.playOrder === PLAY_ORDER_SHUFFLE) {
    return state.playlist.shuffledList[state.playlist.shuffledIndexOfPlaying + 1]
  } else {
    if (state.playlist.orderedIndexOfPlaying + 1 === state.playlist.orderedList.length) {
      return state.playlist.orderedList[0]
    } else {
      return state.playlist.orderedList[state.playlist.orderedIndexOfPlaying + 1]
    }
  }
}

const mapStateToProps = (state) => {
  return {
    nextSongSrc: getNextSongSrc(state),
    currentSongSrc: state.playing.src,
    paused: state.playing.paused,
    playOrder: state.playlist.playOrder,
    played: state.playing.currentTime / state.playing.totalTime,
    buffered: state.playing.bufferedTime?.map(
      (buf) => [buf[0] / state.playing.totalTime, buf[1] / state.playing.totalTime]
    ),
    currentTime: state.playing.currentTime,
    totalTime: state.playing.totalTime,
    volume: state.player.volume
  }
}

const KokoroSingleCard = connect(mapStateToProps)(SingleCard)
window.customElements.define('kokoro-single-card', KokoroSingleCard)
export default KokoroSingleCard
