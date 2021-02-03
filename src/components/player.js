import { html, css } from 'lit-element'
import { PLAY_ORDER_SHUFFLE, PLAY_ORDER_SINGLE } from 'kokoro'

import { Component } from '../utils/component'
import { connect } from '../utils/lit-redux'
import { iconfont } from '../iconfont'
import { SrcUtil } from '../utils/srcutil'

class Player extends Component {
  static get properties () {
    return {
      currentSong: { type: Object },
      playing: { type: Object },
      player: { type: Object },
      playlist: { type: Array },
      darkMode: { type: Boolean },
      playOrder: { type: String },
      played: { type: Number },
      buffered: { type: Array },
      isVolumeControlShown: { type: Boolean },
      isPlaylistShowing: { type: Boolean }
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
        box-shadow: 0 0.96px 1px #666;
        background-color: #fbfbfb;
        color: var(--kokoro-primary-color);
        padding: 10px;
      }

      .main-window.dark {
        background-color: #000;
      }
      
      .main-window.disconnected {
        opacity: 0.85;
        backdrop-filter: blur(4px);
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
        z-index: 2;
        position: relative;
      }
      
      .control-box {
        height: 84px;
        font-size: 24px;
        position: relative;
        user-select: none;
      }
      
      .control-box > .panel {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        transition: top 200ms ease-in, bottom 200ms ease-in;
        overflow: hidden;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
      }
      
      .control-panel.hide {
        bottom: 100%;
      }
      
      .volume-playback-panel.hide {
        top: 100%
      }
      
      .volume-playback-panel > .volume-playback-panel-close {
        position: absolute;
        top: 4px;
        left: 4px;
        font-size: 20px;
        cursor: pointer;
      }

      .control-box .volume-playback-panel .btn {
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        cursor: initial;
      }

      .control-box .volume-playback-panel .btn > kokoro-track {
        margin: 0 10px;
        flex: 1 1 auto;
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
        user-select: none;
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
      
      .playlist-panel.hide {
        left: 100%;
      }
      
      .main-window > .playlist-panel.hide {
        display: block;
      }
      
      .playlist-panel {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(251, 251, 251, 0.94);
        backdrop-filter: blur(1px);
        border-radius: 15px;
        overflow: hidden;
        transition: left 200ms;
      }
      
      .playlist {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: calc(100% - 36px);
        counter-reset: songs;
        padding: 26px 37px 26px 10px;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
      }
      
      .dark .playlist-panel {
        background-color: rgba(0, 0, 0, 0.9);
      }

      .playlist > .playlist-item-box > .playlist-item {
        box-sizing: border-box;
        height: 46px;
        padding: 4px 10px;
        display: inline-block;
        white-space: nowrap;
        max-width: 100%;
        vertical-align: top;
        position: relative;
      }
      
      .playlist > .playlist-item-box {
        transition: transform 250ms ease-in-out;
        transform-origin: left center;
        line-height: 1;
        margin: 6px 0;
        cursor: pointer;
      }

      .playlist > .playlist-item-box:hover {
        transform: scale(1.1);
      }
      
      .playlist > .playlist-item-box:hover > .playlist-item {
        border-left: 3px var(--kokoro-primary-color) solid;
      }

      .playlist .playlist-item.current {
        background: rgba(0, 0, 0, 0.1);
        border-left: 3px var(--kokoro-primary-color) solid;
      }

      .dark .playlist .playlist-item.current {
        background: rgba(251, 251, 251, 0.2);
      }
      
      .playlist > .playlist-item-box > .playlist-item.current::after {
        content: '';
        position: absolute;
        top: 0;
        right: -10px;
        border-top: 23px transparent solid;
        border-left: 5px rgba(0, 0, 0, 0.1) solid;
        border-right: 5px transparent solid;
        border-bottom: 23px rgba(0, 0, 0, 0.1) solid;
      }

      .dark .playlist > .playlist-item-box > .playlist-item.current::after {
        border-left: 5px rgba(251, 251, 251, 0.2) solid;
        border-bottom: 23px rgba(251, 251, 251, 0.2) solid;
      }
      
      .playlist .playlist-item::before {
        counter-increment: songs;
        content: counter(songs);
        float: left;
        line-height: 42px;
      }

      .playlist .playlist-item > .title {
        font-size: 14px;
        line-height: 22px;
        margin-left: 20px;
        margin-right: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .playlist .playlist-item > .artist {
        font-size: 12px;
        line-height: 16px;
        margin-left: 20px;
        margin-right: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .playlist > .playlist-item-box:hover > .playlist-item > .remove {
        visibility: visible;
        transform: rotate(0);
      }

      .playlist .playlist-item > .remove {
        float: right;
        display: block;
        line-height: 42px;
        height: 42px;
        font-size: 16px;
        visibility: hidden;
        transform: rotate(-180deg);
        transition: transform 250ms;
      }

      .playlist .playlist-item > .remove > .icon {
        vertical-align: middle;
      }
      
      .playlist-panel > .playlist-close {
        position: absolute;
        top: 30px;
        left: 12px;
        font-size: 20px;
        cursor: pointer;
      }

      .playlist-panel > .playlist-clear {
        position: absolute;
        top: 65px;
        left: 12px;
        font-size: 20px;
        cursor: pointer;
      }
      
      .disconnected-panel {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      
      .main-window > div.hide {
        display: none;
      }
    `
  }

  get paused () {
    return !this.currentSong || this.playing.paused
  }

  isCurrentSong (song) {
    return SrcUtil.same(this.currentSong?.src, song.src)
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
      <div class="main-window ${this.darkMode ? 'dark' : ''} ${this.isConnected ? '' : 'disconnected'}">
        <div class="handle-bar">
          <div class="move-handle"></div>
        </div>
        <div class="disconnected-panel ${this.isConnected ? 'hide' : ''}">
          Kokoro 播放器未连接
        </div>
        <div class="control-box ${this.isConnected ? '' : 'hide'}">
          <div class="control-panel panel ${this.isVolumeControlShown ? 'hide' : ''}">
            <a class="btn"><i class="icon icon-lyrics"></i></a>
            <a class="btn" @click="${this.nextPlayOrder}"><i class="icon icon-${this.playOrder === PLAY_ORDER_SINGLE
        ? 'solo' : this.playOrder === PLAY_ORDER_SHUFFLE ? 'shuffle' : 'loop'}"></i></a>
            <a class="btn" @click="${this.prev}"><i class="icon icon-previous"></i></a>
            <a class="btn play" @click="${this.togglePlay}"><i
              class="icon icon-${this.paused ? 'play' : 'pause'}-circle"
            ></i></a>
            <a class="btn" @click="${this.next}"><i class="icon icon-next"></i></a>
            <a class="btn" @click="${() => { this.isVolumeControlShown = !this.isVolumeControlShown }}"
            ><i class="icon icon-volume"></i></a>
            <a class="btn" @click="${() => { this.isPlaylistShowing = !this.isPlaylistShowing }}"
            ><i class="icon icon-playlist"></i></a>
          </div>
          <div class="volume-playback-panel panel ${this.isVolumeControlShown ? '' : 'hide'}">
            <a class="btn volume"
               @mouseenter="${this.showVolumeTrack}"
               @mouseleave="${this.closeVolumeTrack}"
            >
              <i class="icon icon-volume"></i>
              <kokoro-track
                id="volume-track"
                .played="${this.player.volume}"
                .buffered="${[0, 1]}"
                @kokoro-change="${(e) => this.setVolume(e.detail.progress)}"
              ></kokoro-track>
            </a>
            <a class="volume-playback-panel-close"
               @click="${() => { this.isVolumeControlShown = !this.isVolumeControlShown }}"
            ><i class="icon icon-close"></i></a>
          </div>
          <kokoro-progress
            .played="${this.played}"
            .buffered="${this.buffered}"
            .currentTime="${this.playing.currentTime}"
            .totalTime="${this.playing.totalTime}"
            @kokoro-change="${(e) => { if (e.detail.commit) this.setCurrentProgress(e.detail.progress) }}"
          ></kokoro-progress>
        </div>
        <div class="cover-box ${this.isConnected ? '' : 'hide'}">
          ${this.currentSong ? html`
            <img src="${this.currentSong.cover}" />
          ` : ''}
        </div>
        <div class="lyrics-box ${this.isConnected ? '' : 'hide'}">
          <h1>${this.currentSong?.title}</h1>
          <h2>${this.currentSong?.artist}</h2>
        </div>
        <div class="playlist-panel ${this.isConnected && this.isPlaylistShowing ? '' : 'hide'}">
          <div class="playlist">
            ${this.playlist.map((song, index) => html`
              <div class="playlist-item-box" @click="${() => { this.setCurrentSong(song, index) }}">
                <div class="playlist-item ${this.isCurrentSong(song) ? 'current' : ''}">
                  <a class="remove" @click="${() => { this.removeSong(index) }}"
                  ><i class="icon icon-close"></i></a>
                  <div class="title">${song.title}</div>
                  <div class="artist">${song.artist} - ${song.album}</div>
                </div>
              </div>
            `)}
          </div>
          <a
            class="playlist-close"
            @click="${() => { this.isPlaylistShowing = !this.isPlaylistShowing }}"
          ><i class="icon icon-close"></i></a>
          ${this.playlist.length ? html`
            <a
              class="playlist-clear"
              @click="${() => { this.clearPlaylist() }}"
            ><i class="icon icon-clear"></i></a>`
          : ''}
        </div>
        <div class="underlay ${this.isConnected ? '' : 'hide'}">
          <div class="background"></div>
          <div class="filter"></div>
        </div>
      </div>
    `
  }

  get isConnected () {
    return !!this.context.kokoro
  }

  setCurrentSong (song, index) {
    if (this.isCurrentSong(song)) return
    this.context.kokoro?.setCurrentSong(index)
  }

  removeSong (index) {
    this.context.kokoro?.removeSong(index)
  }

  clearPlaylist () {
    this.context.kokoro?.clearPlaylist()
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
    playlist: state.playlist.orderedList.map((id) => state.playlist.songs[id]),
    playing: state.playing,
    player: state.player,
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
