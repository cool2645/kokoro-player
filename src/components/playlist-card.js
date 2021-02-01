import { html, css } from 'lit-element'
import { PLAY_ORDER_LOOP, PLAY_ORDER_SHUFFLE, PLAY_ORDER_SINGLE } from 'kokoro'

import { connect } from '../utils/lit-redux'
import { Component } from '../utils/component'
import { iconfont } from '../iconfont'
import { SrcUtil } from '../utils/srcutil'

class PlaylistCard extends Component {
  static get properties () {
    return {
      title: { type: String },
      songs: { type: Array },
      primaryColor: { type: String },
      secondaryColor: { type: String },
      backgroundColor: { type: String },
      songSrcList: { type: Array },
      songListIndex: { type: Number },
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
      isPlaylistShowing: { type: Boolean },
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
      
      .cover > .filter {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
      }
      
      .control-panel {
        box-sizing: border-box;
        width: 60%;
        max-width: 300px;
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
      
      .song {
        font-weight: normal;
        font-size: 16px;
        line-height: 1.25;
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

      .control-panel.medium .song,
      .control-panel.small .song,
      .control-panel.mini .song {
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

      .control-panel.mini .song {
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
      
      .playlist-mask.hide {
        opacity: 0;
        visibility: hidden;
      }
      
      .playlist-mask {
        cursor: pointer;
        width: 60%;
        overflow: hidden;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(8px);
        opacity: 1;
        transition: opacity 250ms;
        border-radius: 0 var(--kokoro-border-radius) var(--kokoro-border-radius) 0;
      }
      
      .playlist-close {
        display: block;
        font-size: 20px;
        position: relative;
        top: 5px;
        left: 5px;
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
      }
      
      .playlist.hide {
        width: 0;
      }
      
      .playlist {
        width: calc(60% - 30px);
        overflow-x: hidden;
        overflow-y: auto;
        cursor: default;
        counter-reset: songs;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: var(--kokoro-background-color);
        border-radius: 0 var(--kokoro-border-radius) var(--kokoro-border-radius) 0;
        transition: width 250ms;
      }
      
      .playlist.expand {
        border-left: 1px solid rgba(51,51,51,0.05);
        width: 250px;
        position: static;
        transition: none;
      }
      
      .playlist > .playlist-item {
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        cursor: pointer;
      }

      .playlist.mini > .playlist-item {
        height: 35px;
        line-height: 35px;
        font-size: 12px;
      }
      
      .playlist > .playlist-item::before {
        counter-increment: songs;
        content: counter(songs);
        margin-right: 10px;
      }
      
      .playlist > .playlist-item:hover {
        background: rgba(0,0,0,0.1);
      }
      
      .playlist > .playlist-item.current {
        background: rgba(0,0,0,0.1);
        border-left: 3px var(--kokoro-primary-color) solid;
      }
      
      .playlist-toggle {
        text-decoration: none;
      }
      
      .playlist-toggle .icon {
        margin-left: 1ex;
      }
    `
  }

  get isConnected () {
    return !!this.context.kokoro
  }

  get isFollowingPlaylist () {
    if (!this.songs || !this.songSrcList) return false
    const nextSongsSrc = this.songSrcList.slice(
      this.songListIndex + 1, this.songListIndex + 1 + this.songs.length)
    let identical = true
    for (let i = 0; i < this.songs.length; i++) {
      if (!SrcUtil.same(nextSongsSrc[i], this.songs[i].src)) {
        identical = false
        break
      }
    }
    return identical
  }

  get isCurrentPlaylist () {
    if (!this.songs || !this.currentSongSrc) return false
    if (this.currentSongSrc instanceof Array) {
      for (const src of this.currentSongSrc) {
        if (SrcUtil.indexOf(this.songs.map(song => song.src), src) !== -1) {
          return true
        }
      }
      return false
    }
    return SrcUtil.indexOf(this.songs.map(song => song.src), this.currentSongSrc) !== -1
  }

  get displayedSong () {
    if (!this.isConnected || !this.currentSongSrc) return this.songs[0]
    if (this.currentSongSrc instanceof Array) {
      for (const src of this.currentSongSrc) {
        if (SrcUtil.indexOf(this.songs.map(song => song.src), src) !== -1) {
          return this.songs[SrcUtil.indexOf(this.songs.map(song => song.src), src)]
        }
      }
      return this.songs[0]
    }
    if (SrcUtil.indexOf(this.songs.map(song => song.src), this.currentSongSrc) !== -1) {
      return this.songs[SrcUtil.indexOf(this.songs.map(song => song.src), this.currentSongSrc)]
    }
    return this.songs[0]
  }

  isCurrentSong (song) {
    if (!this.isConnected) return false
    return SrcUtil.same(this.currentSongSrc, song.src)
  }

  get expand () {
    return this.size === 'expand'
  }

  firstUpdated (_) {
    let parentElement = this.parentElement
    while (parentElement?.tagName.toLowerCase().startsWith('kokoro')) {
      parentElement = parentElement.parentElement
    }
    this.resizeObserver = new window.ResizeObserver(() => {
      this.size = parentElement.offsetWidth >= 750
        ? 'expand' : parentElement.offsetWidth >= 500
          ? 'large' : parentElement.offsetWidth >= 420
            ? 'medium' : parentElement.offsetWidth >= 370
              ? 'small' : 'mini'
    })
    this.resizeObserver.observe(parentElement)
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    this.resizeObserver?.disconnect()
  }

  render () {
    return html`
      <style>
        :host {
          --kokoro-primary-color: ${this.displayedSong.primaryColor || this.primaryColor};
          --kokoro-secondary-color: ${this.displayedSong.secondaryColor || this.secondaryColor};
          --kokoro-background-color: ${this.displayedSong.backgroundColor || this.backgroundColor};
          --kokoro-border-radius: ${this.type === 'flat' ? '0' : '4px'}
        }

        ${this.type === 'flat'
          ? css`
            :host {
              box-shadow: none !important;
            }` : ''
        }

        ${this.expand
          ? css`
            :host {
              max-width: 750px !important;
            }` : ''
        }
      </style>
      <div class="cover">
        <img class="cover" src="${this.displayedSong.cover}" alt="cover" />
        <div class="filter"></div>
      </div>
      <div class="control-panel ${this.size}">
        <div class="header">
          <a class="playlist-toggle" href="" @click="${this.togglePlaylist}">
            <h1 class="title">${this.title || this.displayedSong.title}<i class="icon icon-playlist"></i></h1>
          </a>
          <h2 class="song">
            ${this.title ? this.displayedSong.title : this.displayedSong.artist}
            -
            ${this.title ? this.displayedSong.artist : this.displayedSong.album}
          </h2>
        </div>
        <div class="lyrics"></div>
        <div class="control ${this.isCurrentPlaylist ? 'current' : ''}">
          ${this.isConnected
            ? this.isCurrentPlaylist
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
                </a>`
              : html`
                <kokoro-button
                  type="primary"
                  icon="play"
                  size="${this.size}"
                  @click="${this.playNow}"
                >播放全部
                </kokoro-button>
                ${this.songSrcList?.length ? this.isFollowingPlaylist
                  ? html`
                    <kokoro-button
                      type="bordered"
                      icon="ok"
                      size="${this.size}"
                      disabled
                    >已添加
                    </kokoro-button>`
                  : html`
                    <kokoro-button
                      type="bordered"
                      icon="play-next"
                      size="${this.size}"
                      @click="${this.playNext}"
                    >添加到列表
                    </kokoro-button>`
                : ''}`
            : html`
              <kokoro-button
                type="bordered"
                icon="warn"
                size="${this.size}"
                disabled
              >未连接到 Kokoro 播放器
              </kokoro-button>`
          }
        </div>
      </div>
      <div class="playlist-mask ${!this.isPlaylistShowing || this.expand ? 'hide' : ''}"
           @click="${this.togglePlaylist}"
      >
        <a class="playlist-close"><i class="icon icon-close"></i></a>
      </div>
      <div class="playlist ${!this.isPlaylistShowing && !this.expand ? 'hide' : ''} ${this.expand ? 'expand' : ''} ${this.size}">
        ${this.songs.map((song) => html`
          <div
            class="playlist-item ${this.isCurrentSong(song) ? 'current' : ''}"
            @click="${() => this.setCurrentSong(song)}"
          >${song.title} - ${song.artist}
          </div>
        `)}
      </div>
      ${this.isConnected && this.isCurrentPlaylist ? html`
        <kokoro-progress
          .played="${this.played}"
          .buffered="${this.buffered}"
          .currentTime="${this.currentTime}"
          .totalTime="${this.totalTime}"
          @kokoro-change="${(e) => {
            if (e.detail.commit) this.setCurrentProgress(e.detail.progress)
          }}"
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

  setCurrentSong (song) {
    if (this.isCurrentSong(song)) return
    this.context.kokoro?.setCurrentSong(song)
  }

  playNow () {
    this.context.kokoro?.setPlaylist(this.songs, 0, PLAY_ORDER_LOOP)
    this.context.kokoro?.play()
  }

  playNext () {
    for (const song of this.songs.slice().reverse()) {
      this.context.kokoro?.setNextSong(song)
    }
    if (!this.isCurrentPlaylist && !this.needShowPlayNext) {
      this.context.kokoro?.next()
    }
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

  togglePlaylist (e) {
    e.preventDefault()
    if (!this.expand) {
      this.isPlaylistShowing = !this.isPlaylistShowing
    }
  }
}

function getSongSrcList (state) {
  if (state.playlist.playOrder === PLAY_ORDER_SHUFFLE) {
    return state.playlist.shuffledList.map(song => state.playlist.songs[song].src)
  } else {
    return state.playlist.orderedList.map(song => state.playlist.songs[song].src)
  }
}

function getSongListIndex (state) {
  if (state.playlist.playOrder === PLAY_ORDER_SHUFFLE) {
    return state.playlist.shuffledIndexOfPlaying
  } else {
    return state.playlist.orderedIndexOfPlaying
  }
}

const mapStateToProps = (state) => {
  return {
    songSrcList: getSongSrcList(state),
    songListIndex: getSongListIndex(state),
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

const KokoroPlaylistCard = connect(mapStateToProps)(PlaylistCard)
window.customElements.define('kokoro-playlist-card', KokoroPlaylistCard)
export default KokoroPlaylistCard
