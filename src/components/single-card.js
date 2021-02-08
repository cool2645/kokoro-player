import { html, css } from 'lit-element'
import { PLAY_ORDER_SHUFFLE, PLAY_ORDER_SINGLE } from 'kokoro'

import { connect } from '../utils/lit-redux'
import { Component } from '../utils/component'
import './icon-button'
import './track'
import './progress'
import { iconfont } from '../iconfont'
import { SrcUtil } from '../utils/srcutil'
import locale from '../utils/locale'
import { parseLyrics } from '../utils/lyrics'

class SingleCard extends Component {
  static get properties () {
    return {
      title: { type: String },
      artist: { type: String },
      album: { type: String },
      src: { type: String },
      cover: { type: String },
      lyrics: { type: String },
      parsedLyrics: { type: Object },
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
      isVolumeTrackShown: { type: Boolean },
      size: { type: String },
      needShowPlayNext: { type: Boolean }
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
        line-height: 1.4;
        margin: 2px 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }


      .control-panel.medium {
        padding-left: 15px;
      }

      .control-panel.medium .title,
      .control-panel.small .title,
      .control-panel.mini .title {
        font-size: 16px;
      }

      .control-panel.medium .artist,
      .control-panel.small .artist,
      .control-panel.mini .artist {
        font-size: 14px;
      }

      .control-panel.medium .control.current,
      .control-panel.small .control.current,
      .control-panel.mini .control.current {
        margin-bottom: 0 !important;
      }

      .control-panel.small {
        padding-left: 12px;
      }

      .control-panel.small .lyrics {
        display: none;
      }

      .control-panel.mini {
        padding-left: 10px;
      }

      .control-panel.mini .artist {
        display: none;
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

      .control-panel.medium .btn,
      .control-panel.small .btn {
        font-size: 20px;
        margin: 2px;
      }

      .control-panel.medium .btn .volume-track-container,
      .control-panel.small .btn .volume-track-container {
        top: -1px;
        height: 16px;
        width: 40px;
      }

      .control-panel.mini .btn {
        font-size: 16px;
        margin: 2px;
      }

      .control-panel.mini .btn .volume-track-container {
        top: 1px;
        height: 12px;
        width: 36px;
        padding-left: 5px;
      }

      .control-panel.mini .btn .volume-track-container.hide {
        padding-left: 0;
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
        width: 0 !important;
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
    return SrcUtil.same(this.nextSongSrc, this.src)
  }

  get isCurrentSong () {
    if (!this.src || !this.currentSongSrc) return false
    return SrcUtil.same(this.currentSongSrc, this.src)
  }

  constructor (props) {
    super(props)
    this.hideVolumeTrack = this.hideVolumeTrack.bind(this)
  }

  firstUpdated (_) {
    let parentElement = this.parentElement
    while (parentElement?.tagName.toLowerCase().startsWith('kokoro')) {
      parentElement = parentElement.parentElement
    }
    this.resizeObserver = new window.ResizeObserver(() => {
      this.size = parentElement.offsetWidth >= 500
        ? 'large' : parentElement.offsetWidth >= 420
          ? 'medium' : parentElement.offsetWidth >= 370
            ? 'small' : 'mini'
    })
    this.resizeObserver.observe(parentElement)
    this.size = parentElement.offsetWidth >= 500
      ? 'large' : parentElement.offsetWidth >= 420
        ? 'medium' : parentElement.offsetWidth >= 370
          ? 'small' : 'mini'
  }

  updated (changedProperties) {
    if (changedProperties.has('currentTime') || changedProperties.has('totalTime') ||
      changedProperties.has('lyrics')) {
      if (this.isCurrentSong) {
        this.parsedLyrics = parseLyrics(this.lyrics, this.currentTime, this.totalTime)
      } else {
        this.parsedLyrics = null
      }
    }
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    this.resizeObserver?.disconnect()
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
      </div>
      <div class="control-panel ${this.size}">
        <div class="header">
          <h1 class="title">${this.title}</h1>
          <h2 class="artist">${this.artist} - ${this.album}</h2>
          <div class="artist lyrics">${this.parsedLyrics?.currentSentence}</div>
        </div>
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
                   @mouseenter="${this.showVolumeTrack}"
                   @mouseleave="${this.closeVolumeTrack}"
                >
                  <i class="icon icon-volume"></i>
                  <div class="volume-track-container ${this.isVolumeTrackShown ? '' : 'hide'}">
                    <kokoro-track
                      id="volume-track"
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
                  size="${this.size}"
                  @click="${this.playNow}"
                >${locale.playNow}</kokoro-button>
                ${this.needShowPlayNext ? this.isNextSong
                  ? html`
                    <kokoro-button
                      type="bordered"
                      icon="ok"
                      size="${this.size}"
                      disabled
                    >${locale.added}</kokoro-button>`
                  : html`
                    <kokoro-button
                      type="bordered"
                      icon="play-next"
                      size="${this.size}"
                      @click="${this.playNext}"
                    >${locale.playNext}</kokoro-button>`
                : ''}`
            : html`
              <kokoro-button
                type="bordered"
                icon="warn"
                size="${this.size}"
                disabled
              >${locale.disconnected}</kokoro-button>`
          }
        </div>
      </div>
      ${this.isConnected && this.isCurrentSong ? html`
        <kokoro-progress
          .played="${this.played}"
          .buffered="${this.buffered}"
          .currentTime="${this.currentTime}"
          .totalTime="${this.totalTime}"
          @kokoro-change="${(e) => { this.setCurrentProgress(e.detail.progress, e.detail.commit) }}"
        ></kokoro-progress>` : ''
      }
    `
  }

  showVolumeTrack () {
    this.isVolumeTrackShown = true
    document.removeEventListener('mouseup', this.hideVolumeTrack)
  }

  closeVolumeTrack () {
    if (this.shadowRoot.querySelector('#volume-track').dragging) {
      document.addEventListener('mouseup', this.hideVolumeTrack)
    } else {
      this.isVolumeTrackShown = false
    }
  }

  hideVolumeTrack () {
    setTimeout(() => {
      this.isVolumeTrackShown = false
    }, 250)
    document.removeEventListener('mouseup', this.hideVolumeTrack)
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

  setCurrentProgress (progress, commit) {
    if (commit) this.context.kokoro?.setCurrentTime(progress * this.totalTime)
    else this.currentTime = progress * this.totalTime
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
    volume: state.player.volume,
    needShowPlayNext: !(state.playing.paused && state.playing.currentTime === 0)
  }
}

const KokoroSingleCard = connect(mapStateToProps)(SingleCard)
window.customElements.define('kokoro-single-card', KokoroSingleCard)
export default KokoroSingleCard
