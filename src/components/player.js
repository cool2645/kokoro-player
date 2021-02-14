import { html, css } from 'lit-element'
import { PLAY_ORDER_SHUFFLE, PLAY_ORDER_SINGLE } from 'kokoro'

import { iconfont } from '../iconfont'
import { Component } from '../utils/component'
import { connect } from '../utils/lit-redux'
import { SrcUtil } from '../utils/srcutil'
import { parseLyrics, getLangAvailable } from '../utils/lyrics'
import './desktop-lyrics'
import locale from '../utils/locale'

class Player extends Component {
  static get properties () {
    return {
      currentSong: { type: Object },
      playing: { type: Object },
      lyrics: { type: Object },
      parsedLyrics: { type: Object },
      language: { type: String },
      langAvailable: { type: Array },
      pnKind: { type: String },
      pnKindAvailable: { type: Array },
      index: { type: Number },
      player: { type: Object },
      playlist: { type: Array },
      darkMode: { type: Boolean },
      playOrder: { type: String },
      played: { type: Number },
      buffered: { type: Array },
      isVolumeControlShowing: { type: Boolean },
      isPlaylistShowing: { type: Boolean },
      isLyricsShowing: { type: Boolean },
      lastLyricsUserScrollTime: { type: Number },
      isLyricsScrollAnimating: { type: Boolean },
      isDesktopLyricsShowing: { type: Boolean },
      dragging: { type: Boolean },
      top: { type: Number },
      left: { type: Number },
      right: { type: Number },
      bottom: { type: Number },
      mobileDefaultSide: { type: String },
      mobileLeft: { type: Number },
      desktopLyricsVerticalCenter: { type: Number },
      desktopLyricsHorizontalCenter: { type: Number },
      desktopLyricsColorSchemes: { type: Array },
      desktopLyricsColorSchemeIndex: { type: Number },
      desktopLyricsFontSize: { type: Number },
      desktopLyricsMobileFontSize: { type: Number },
      shouldShowSmallWindow: { type: Boolean },
      shouldMobileShowMainWindow: { type: Boolean },
      shrinkToLeft: { type: Boolean }
    }
  }

  static get styles () {
    return css`
      ${iconfont}
      :host {
        position: fixed;
      }

      .move-handle, .btn {
        user-select: none;
      }

      .move-handle.dragging {
        cursor: grabbing !important;
      }

      .main-window {
        position: fixed;
        width: 315px;
        height: 560px;
        border-radius: 15px;
        box-shadow: 0 0.3px 0.96px #666;
        background-color: #fbfbfb;
        color: var(--kokoro-primary-color);
        padding: 10px;
        display: flex;
        flex-direction: column;
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

      .main-window .move-handle {
        height: 8px;
        width: 50px;
        margin: 4px auto;
        border-radius: 6px;
        background-color: var(--kokoro-white);
        opacity: 0.94;
        cursor: grab;
      }

      .main-window .move-handle .handle-bar {
        overflow: hidden;
        margin-top: -4px;
        z-index: 2;
        position: relative;
      }

      .main-window > .control-box {
        height: 84px;
        min-height: 84px;
        font-size: 24px;
        position: relative;
        user-select: none;
      }

      .main-window > .control-box > .panel {
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

      .main-window > .control-box .control-panel.hide {
        bottom: 100%;
      }

      .main-window > .control-box .volume-playback-panel.hide {
        top: 100%
      }

      .main-window > .control-box .volume-playback-panel > .volume-playback-panel-close {
        position: absolute;
        top: 4px;
        left: 4px;
        font-size: 20px;
        cursor: pointer;
      }

      .main-window > .control-box .volume-playback-panel .btn {
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        cursor: initial;
      }

      .main-window > .control-box .volume-playback-panel .btn > kokoro-track {
        margin: 0 10px;
        flex: 1 1 auto;
      }

      .main-window > .control-box .btn {
        display: inline-block;
        line-height: 1;
        cursor: pointer;
      }

      .main-window > .control-box .btn > .icon {
        vertical-align: top;
      }

      .main-window > .control-box .btn.play {
        font-size: 48px;
      }

      .main-window > .control-box kokoro-progress {
        position: absolute;
        bottom: 0;
        left: -10px;
        right: -10px;
        transform: translateY(50%);
        z-index: 1;
      }

      .main-window > .cover-panel,
      .main-window > .lyrics-panel
      {
        flex: 1 1 auto;
        position: relative;
        opacity: 1;
        transition: opacity 250ms;
      }

      .main-window > .cover-panel.hide,
      .main-window > .lyrics-panel.hide {
        opacity: 0;
        display: block;
        height: 0;
        flex: 0 0;
        overflow: hidden;
      }

      .main-window .cover-box {
        box-sizing: border-box;
        height: 315px;
        padding: 20px;
        margin: 8px 0;
        user-select: none;
      }

      .main-window .cover-box > img {
        width: 100%;
      }
      
      .main-window > .cover-panel > .lyrics-title-box {
        margin-top: -10px;
      }

      .main-window .lyrics-title-box {
        padding: 10px;
      }

      .main-window .lyrics-title-box h1 {
        font-size: 1.5rem;
        line-height: 1.45;
        margin: 0;
        font-weight: normal;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .main-window .lyrics-title-box h2 {
        font-size: 1.125rem;
        line-height: 1.4;
        margin: 0;
        font-weight: normal;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .main-window > .cover-panel .lyric {
        padding: 0 10px;
        font-size: 0.875rem;
        line-height: 1.4;
      }

      .main-window > .cover-panel .lyric.translation {
        font-size: 0.75rem;
      }

      .main-window > .lyrics-panel {
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .main-window > .lyrics-panel > .lyrics-title-box {
        margin-top: 10px;
        margin-bottom: -10px;
      }

      .main-window .lyrics-scroll-box {
        flex: 1 1 auto;
        margin: 10px;
        padding: 10px 0;
        overflow-y: scroll;
        line-height: 1.18;
      }

      .main-window .lyrics-scroll-box > .lyrics {
        position: relative;
      }

      .main-window .lyrics-scroll-box .lyric {
        margin: 1rem 0;
        font-size: 0.875rem;
        transition: font-size 250ms;
        transition-delay: 250ms;
      }

      .main-window .lyrics-scroll-box .lyric:first-child {
        margin-top: 0;
      }

      .main-window .lyrics-scroll-box .lyric:last-child {
        margin-bottom: 0;
      }
      
      .main-window .lyrics-scroll-box .lyric.current {
        font-size: 1.125rem;
        color: var(--kokoro-primary-highlight);
      }

      .main-window .lyrics-scroll-box .lyric.current .translation {
        font-size: 0.875rem;
      }
      
      .main-window .lyrics-scroll-box .lyric .translation {
        margin-top: 2px;
        font-size: 0.75rem;
      }
      
      .main-window .lyrics-control-box {
        box-sizing: border-box;
        height: 40px;
        min-height: 40px;
        text-align: right;
        padding: 10px;
        font-size: 16px;
      }

      .main-window .lyrics-control-box .btn {
        cursor: pointer;
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
        transition: left 200ms, top 200ms;
        z-index: 1;
      }

      .playlist {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: calc(100% - 36px);
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
        height: 2.875rem;
        padding: 0.25rem 10px;
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
        margin: 0.375rem 0;
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

      .playlist .playlist-item > .title {
        font-size: 0.875rem;
        line-height: 1.375rem;
        margin-right: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .playlist .playlist-item > .artist {
        font-size: 0.75rem;
        line-height: 1rem;
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
        line-height: 2.375rem;
        height: 2.375rem;
        font-size: 1rem;
        visibility: hidden;
        transform: rotate(-180deg);
        transition: transform 250ms;
      }

      .playlist .playlist-item > .remove > .icon {
        vertical-align: top;
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
        z-index: -1;
      }

      .main-window > div.hide {
        display: none;
      }

      .small-window {
        position: fixed;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        background-color: #fbfbfb;
        border: 1px #bbb solid;
        box-shadow: 0 0.3px 0.96px #666;
        color: var(--kokoro-primary-color);
        transform: scale(0.5);
        transition: transform 250ms;
      }

      .small-window.dark {
        border: none;
        background-color: #000;
        box-shadow: 0 0 3px #eee;
      }

      .small-window:hover, .small-window.dragging, .small-window.dragging.disconnected:hover {
        transform: scale(1);
      }

      .small-window.disconnected:hover {
        transform: scale(0.5);
      }

      .small-window.disconnected {
        opacity: 0.85;
        backdrop-filter: blur(4px);
      }

      .small-window > .cover-box {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0.1;
      }

      .small-window.disconnected > .cover-box {
        display: none;
      }

      .small-window.dark > .cover-box {
        opacity: 0.4;
        filter: blur(40px);
      }

      .small-window > .control-box {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: -1px;
        display: grid;
        grid-template-columns: repeat(2, 50%);
        grid-template-rows: repeat(2, 50%);
        transform: rotate(45deg);
      }

      .small-window > .control-box .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        cursor: pointer;
      }

      .small-window > .control-box .btn .icon {
        transform: rotate(-45deg);
      }

      .small-window > .control-box > .btn {
        border-right: 1px #bbb solid;
        border-bottom: 1px #bbb solid;
      }

      .small-window.dark > .control-box > .btn {
        border: none;
        box-shadow: 0 0 2px;
      }

      .small-window > .control-box > .move-handle {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(-45deg) scale(2.3);
        width: 54px;
        height: 54px;
        border-radius: 50%;
        border: 1px #bbb solid;
        margin: 0;
        background: radial-gradient(#fff, rgba(255, 255, 255, 0.99) 70%, rgba(255, 255, 255, 0.8));
        overflow: hidden;
        transition: transform 250ms;
        cursor: grab;
      }

      .small-window > .control-box > .move-handle .btn .icon {
        transform: none;
      }

      .small-window.dark > .control-box > .move-handle {
        border: none;
        box-shadow: 0 0 4px;
      }

      .small-window.dark > .control-box > .move-handle {
        background: #000;
      }

      .small-window:hover > .control-box > .move-handle {
        transform: translate(-50%, -50%) rotate(-45deg) scale(1);
      }

      .small-window.disconnected:hover > .control-box > .move-handle {
        transform: translate(-50%, -50%) rotate(-45deg) scale(2.3);
      }

      .small-window.spin-rev > .control-box > .move-handle > .btn {
        animation: spin-rev 45s linear infinite;
      }

      .small-window > .control-box > .move-handle > .btn {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        font-size: 28px;
        cursor: inherit;
      }

      .small-window > .control-box > .move-handle > .move-handle-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0.06;
        z-index: -1;
      }

      .small-window.dark > .control-box > .move-handle > .move-handle-bg {
        opacity: 0.94;
        filter: blur(36px);
      }

      .small-window.spin-rev > .control-box > .move-handle > .move-handle-bg {
        animation: spin-rev 45s linear infinite;
      }

      .small-window.disconnected > .control-box > .move-handle > .move-handle-bg {
        display: none;
      }

      .small-window-mobile {
        position: fixed;
        width: 30px;
        height: 20px;
        background: var(--kokoro-black);
        backdrop-filter: blur(4px);
        color: var(--kokoro-white);
        font-size: 12px;
        display: none;
        cursor: pointer;
      }

      .small-window-mobile.left {
        left: 0;
        border-radius: 0 10px 10px 0;
      }

      .small-window-mobile.right {
        right: 0;
        border-radius: 10px 0 0 10px;
      }

      .small-window-mobile.dark {
        background: var(--kokoro-white);
        color: var(--kokoro-black);
      }

      .small-window-mobile > .icon {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 20px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: scale(0.9);
      }

      .small-window-mobile.left > .icon {
        right: 0;
      }

      .small-window-mobile.right > .icon {
        left: 0;
      }

      .main-window.mobile {
        display: none;
        flex-direction: column;
        justify-content: space-between;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: auto;
        height: 100%;
        visibility: visible;
        border-radius: 0;
        transition: left 250ms, right 250ms;
        z-index: 9999;
      }

      .main-window.mobile.hide {
        left: calc(100% + 5px);
        right: calc(-100% - 5px);
      }

      .main-window.mobile .cover-box .btn {
        font-size: 24px;
        position: relative;
        left: -15px;
        top: -4px;
        cursor: pointer;
      }

      .mobile .disconnected-panel .btn {
        font-size: 24px;
        position: absolute;
        top: 34px;
        left: 20px;
        cursor: pointer;
      }

      .main-window.mobile .cover-box img {
        border-radius: 50%;
        position: absolute;
        width: 100%;
        animation: spin 45s linear infinite;
      }

      .main-window.mobile .underlay {
        border-radius: 0;
      }

      .main-window.mobile .cover-box {
        width: auto;
        height: 0;
        padding: 28px 0 calc(100% - 28px) 0;
        margin-left: 28px;
        margin-right: 28px;
        line-height: 0;
        position: relative;
      }

      .main-window.mobile .lyrics-title-box {
        flex: 1 1 auto;
        max-height: 200px;
        box-sizing: border-box;
      }

      .main-window.mobile > .lyrics-panel > .back {
        font-size: 24px;
        padding: 10px;
      }

      .main-window.mobile > .lyrics-panel > .lyrics-title-box {
        margin-top: 0;
      }

      .main-window.mobile > .control-box {
        margin: 10px 0;
      }

      .main-window.mobile > .control-box kokoro-progress {
        position: absolute;
        top: 0;
        left: -10px;
        right: -10px;
        transform: translateY(-50%);
      }

      .main-window.mobile > .control-box .volume-playback-panel > .volume-playback-panel-close {
        top: 50%;
        transform: translateY(-50%);
      }

      .mobile .playlist-panel.hide {
        top: 100%;
        left: 0;
      }

      .mobile .playlist-panel {
        top: 20%;
        border-radius: 15px 15px 0 0;
      }

      .mobile .playlist > .playlist-item-box:hover {
        transform: scale(1);
      }

      .mobile .playlist {
        width: calc(100% - 52px);
        margin: 60px 26px 26px 26px;
        padding: 0;
      }

      .mobile .playlist-panel > .playlist-close {
        top: 20px;
        left: 26px;
      }

      .mobile .playlist-panel > .playlist-clear {
        top: 20px;
        left: auto;
        right: 26px;
      }

      .mobile .playlist-panel-mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: pointer;
      }

      .mobile .playlist-panel-mask.hide {
        display: none;
      }

      .mobile .playlist > .playlist-item-box > .playlist-item {
        display: block;
      }

      .mobile .playlist > .playlist-item-box > .playlist-item > .remove {
        visibility: visible;
        transform: none !important;
      }

      @keyframes spin {
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes spin-rev {
        100% {
          transform: rotate(-360deg);
        }
      }

      @media screen and (max-width: 500px) {
        .small-window, .main-window {
          display: none;
        }

        .small-window-mobile {
          display: block;
        }

        .main-window.mobile {
          display: flex;
        }
      }

      kokoro-desktop-lyrics.hide {
        display: none;
      }
    `
  }

  get paused () {
    return !this.currentSong || this.playing.paused
  }

  get isConnected () {
    return !!this.context.kokoro
  }

  get isMobile () {
    return (document.documentElement || document.body).clientWidth <= 500
  }

  constructor () {
    super()
    this.drag = this.drag.bind(this)
    this.stopDragging = this.stopDragging.bind(this)
    this.onLyricsUserScroll = this.onLyricsUserScroll.bind(this)
    this.dragToGoBack = this.dragToGoBack.bind(this)
    this.stopDragToGoBack = this.stopDragToGoBack.bind(this)
    this.hideLyricsIfClicked = this.hideLyricsIfClicked.bind(this)
    this.lastLyricsUserScrollTime = Date.now()
    this.left = 0
    this.top = 100
    this.shouldShowSmallWindow = true
    this.shouldMobileShowMainWindow = false
    this.mobileDefaultSide = 'left'
    this.right = (document.documentElement || document.body).clientWidth - 122
    this.bottom = (document.documentElement || document.body).clientHeight - 100 - 122
    this.isDesktopLyricsShowing = false
    this.desktopLyricsVerticalCenter = 150
    this.desktopLyricsColorSchemes = [
      { name: '夕阳', value: 'linear-gradient(-1deg, #e92201, #fb9c17, #e92201)' },
      { name: '蓝天', value: 'linear-gradient(-1deg, #0145d3, #118cfa, #0145d3)' },
      { name: '星野', value: 'linear-gradient(-1deg, #a5c9e5, #9da9eb, #c6bde2)' },
      { name: '山峦', value: 'linear-gradient(-1deg, #1dbf76, #67d74d, #1dbf76)' }
    ]
    this.desktopLyricsColorSchemeIndex = 0
    this.desktopLyricsFontSize = 30
    this.desktopLyricsMobileFontSize = 14
    this.language = navigator.languages?.length ? navigator.languages[0] : navigator.language
  }

  firstUpdated (_) {
    if (this.isMobile) {
      if (this.mobileDefaultSide === 'right') {
        this.right = 0
        this.left = (document.documentElement || document.body).clientWidth - 122
      } else {
        this.left = 0
        this.right = (document.documentElement || document.body).clientWidth - 122
      }
      this.shouldShowSmallWindow = true
    } else if (this.left + this.right !== (document.documentElement || document.body).clientWidth - 122) {
      if (this.right === 0) {
        this.left = (document.documentElement || document.body).clientWidth - 122
      } else {
        this.shouldShowSmallWindow = false
      }
    }
    if (this.shouldShowSmallWindow &&
      this.top + this.bottom !== (document.documentElement || document.body).clientHeight - 122) {
      if (this.top !== 100) {
        this.bottom = (document.documentElement || document.body).clientHeight - this.top - 122
      } else {
        this.top = (document.documentElement || document.body).clientHeight - this.bottom - 122
      }
    }
    this.cursorX = this.left
    this.shrinkToLeft = this.cursorX < ((document.documentElement || document.body).clientWidth / 2)
    this.desktopLyricsHorizontalCenter = (document.documentElement || document.body).clientWidth / 2
    this.shadowRoot.querySelector('#lyrics-scroll')
      .addEventListener('wheel', this.onLyricsUserScroll)
    this.shadowRoot.querySelector('#lyrics-scroll-mobile')
      .addEventListener('wheel', this.onLyricsUserScroll)
    this.shadowRoot.querySelector('#lyrics-scroll')
      .addEventListener('touchmove', this.onLyricsUserScroll)
    this.shadowRoot.querySelector('#lyrics-scroll-mobile')
      .addEventListener('touchmove', this.onLyricsUserScroll)
  }

  onLyricsUserScroll () {
    this.lastLyricsUserScrollTime = Date.now()
  }

  updated (changedProperties) {
    if (changedProperties.has('playing') || changedProperties.has('lyrics') || changedProperties.has('lang')) {
      this.parsedLyrics = parseLyrics(this.lyrics,
        this.playing?.currentTime, this.playing?.totalTime, this.language)
      this.scrollLyricsToCurrent()
    }
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    this.shadowRoot.querySelector('#lyrics-scroll')
      .removeEventListener('DOMMouseScroll', this.onLyricsUserScroll)
    this.shadowRoot.querySelector('#lyrics-scroll-mobile')
      .removeEventListener('DOMMouseScroll', this.onLyricsUserScroll)
    this.shadowRoot.querySelector('#lyrics-scroll')
      .removeEventListener('touchmove', this.onLyricsUserScroll)
    this.shadowRoot.querySelector('#lyrics-scroll-mobile')
      .removeEventListener('touchmove', this.onLyricsUserScroll)
  }

  requestUpdate (...args) {
    super.requestUpdate(...args)
    if (args.length === 0) {
      this.shadowRoot.querySelector('kokoro-desktop-lyrics')?.requestUpdate()
    }
  }

  isCurrentSong (song) {
    return SrcUtil.same(this.currentSong?.src, song.src)
  }

  render () {
    return html`
      <style>
        .main-window > .underlay > .background,
        .small-window > .cover-box,
        .small-window > .control-box > .move-handle > .move-handle-bg {
          background: url("${this.currentSong?.cover}") no-repeat scroll center center / cover;
        }
        :host {
          --kokoro-white: #cecece;
          --kokoro-black: rgba(0, 0, 0, 0.8);
          --kokoro-primary-color: ${this.darkMode ? '#cecece' : 'rgba(0, 0, 0, 0.8)'};
          --kokoro-primary-highlight: ${this.darkMode ? '#fff' : '#000'};
          --kokoro-secondary-color: ${this.darkMode ? '#8e8e8e' : 'rgba(0, 0, 0, 0.4)'};
          --kokoro-border-radius: 0;
        }
        .main-window {
          visibility: ${this.shouldShowSmallWindow ? 'hidden' : 'visible'};
        }
        .small-window {
          visibility: ${this.shouldShowSmallWindow ? 'visible' : 'hidden'};
          transform-origin: ${this.shrinkToLeft ? 'left' : 'right'} center;
        }
      </style>
      <div
        class="main-window ${this.darkMode ? 'dark' : ''} ${this.isConnected ? '' : 'disconnected'}"
        style="top: ${this.top}px; left: ${this.left}px"
      >
        <div class="handle-bar">
          <div
            class="move-handle ${this.dragging ? 'dragging' : ''}"
            @mousedown="${this.startDragging}"
            @touchstart="${this.startDragging}"
          ></div>
        </div>
        <div class="disconnected-panel ${this.isConnected ? 'hide' : ''}">
          ${locale.disconnected}
        </div>
        <div class="control-box ${this.isConnected ? '' : 'hide'}">
          <div class="control-panel panel ${this.isVolumeControlShowing ? 'hide' : ''}">
            <a class="btn" @click="${this.toggleDesktopLyrics}"
            ><i class="icon icon-lyrics${this.isDesktopLyricsShowing ? '-on' : ''}"></i></a>
            <a class="btn" @click="${this.nextPlayOrder}"><i class="icon icon-${this.playOrder === PLAY_ORDER_SINGLE
        ? 'solo' : this.playOrder === PLAY_ORDER_SHUFFLE ? 'shuffle' : 'loop'}"></i></a>
            <a class="btn" @click="${this.prev}"><i class="icon icon-previous"></i></a>
            <a class="btn play" @click="${this.togglePlay}"><i
              class="icon icon-${this.paused ? 'play' : 'pause'}-circle"
            ></i></a>
            <a class="btn" @click="${this.next}"><i class="icon icon-next"></i></a>
            <a class="btn" @click="${() => { this.isVolumeControlShowing = !this.isVolumeControlShowing }}"
            ><i class="icon icon-volume"></i></a>
            <a class="btn" @click="${this.togglePlaylist}"
            ><i class="icon icon-playlist"></i></a>
          </div>
          <div class="volume-playback-panel panel ${this.isVolumeControlShowing ? '' : 'hide'}">
            <a class="btn volume"
               @mouseenter="${this.showVolumeTrack}"
               @mouseleave="${this.closeVolumeTrack}"
            >
              <i class="icon icon-volume"></i>
              <kokoro-track
                id="volume-track"
                .played="${this.player?.volume}"
                .buffered="${[0, 1]}"
                @kokoro-change="${(e) => this.setVolume(e.detail.progress)}"
              ></kokoro-track>
            </a>
            <a class="volume-playback-panel-close"
               @click="${() => { this.isVolumeControlShowing = !this.isVolumeControlShowing }}"
            ><i class="icon icon-close"></i></a>
          </div>
          <kokoro-progress
            .played="${this.played}"
            .buffered="${this.buffered}"
            .currentTime="${this.playing?.currentTime}"
            .totalTime="${this.playing?.totalTime}"
            @kokoro-change="${(e) => { if (e.detail.commit) this.setCurrentProgress(e.detail.progress) }}"
          ></kokoro-progress>
        </div>
        <div class="cover-panel ${this.isLyricsShowing || !this.isConnected ? 'hide' : ''}"
             @click="${() => { this.isLyricsShowing = !this.isLyricsShowing }}"
        >
          <div class="cover-box">
            ${this.currentSong ? html`
              <img src="${this.currentSong.cover}" />
            ` : ''}
          </div>
          <div class="lyrics-title-box">
            <h1>${this.currentSong?.title}</h1>
            <h2>${this.currentSong?.artist}</h2>
          </div>
          <div class="lyric">${this.parsedLyrics?.currentSentence}</div>
          <div class="lyric translation">${this.parsedLyrics?.currentSentenceTranslation}</div>
        </div>
        <div class="lyrics-panel ${this.isLyricsShowing && this.isConnected ? '' : 'hide'}"
             @click="${() => { this.isLyricsShowing = !this.isLyricsShowing }}"
        >
          <div class="lyrics-title-box">
            <h1>${this.currentSong?.title}</h1>
            <h2>${this.currentSong?.artist}</h2>
          </div>
          <div class="lyrics-scroll-box" id="lyrics-scroll">
            <div class="lyrics" @click="${(e) => { e.stopPropagation() }}">
              ${this.parsedLyrics?.lyrics.map((lyric) => html`
                <div
                  class="lyric ${lyric.timestamp === this.parsedLyrics?.currentSentenceStart ? 'current' : ''}"
                >
                  <div>${lyric.content}</div>
                  ${lyric.translation ? html`<div class="translation">${lyric.translation}</div>` : ''}
                </div>
              `) || locale.noLyrics}
            </div>
          </div>
          ${this.langAvailable?.length ? html`
            <div class="lyrics-control-box">
              <a class="btn" @click="${(e) => { e.stopPropagation(); this.nextLang() }}"
              >${this.parsedLyrics?.langName || this.parsedLyrics?.lang || html`<i class="icon icon-translate"></i>`}</a>
            </div>
          ` : ''}
        </div>
        <div class="playlist-panel ${this.isConnected && this.isPlaylistShowing ? '' : 'hide'}">
          <div class="playlist">
            ${this.playlist?.map((song, index) => html`
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
            @click="${this.togglePlaylist}"
          ><i class="icon icon-close"></i></a>
          ${this.playlist?.length ? html`
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
      <div class="small-window ${
        this.isConnected && !this.paused ? 'spin-rev' : ''
      } ${this.darkMode ? 'dark' : ''} ${this.isConnected ? '' : 'disconnected'
      } ${this.dragging ? 'dragging' : ''}"
           style="top: ${this.top}px; ${this.shrinkToLeft
             ? `left: ${this.left}px;` : `right: ${this.right}px`}"
      >
        <div class="cover-box"></div>
        <div class="control-box">
          <a class="btn" @click="${this.togglePlay}"><i
            class="icon icon-${this.paused ? 'play' : 'pause'}"
          ></i></a>
          <a class="btn" @click="${this.next}"><i class="icon icon-next"></i></a>
          <a class="btn" @click="${this.prev}"><i class="icon icon-previous"></i></a>
          <a class="btn" @click="${this.toggleDesktopLyrics}"
          ><i class="icon icon-lyrics${this.isDesktopLyricsShowing ? '-on' : ''}"></i></a>
          <div
            class="move-handle ${this.dragging ? 'dragging' : ''}"
            @mousedown="${this.startDragging}"
            @touchstart="${this.startDragging}"
          >
            <a class="btn"><i class="icon icon-note"></i></a>
            <div class="move-handle-bg"></div>
          </div>
        </div>
      </div>
      <div
        class="small-window-mobile ${this.shrinkToLeft
          ? 'left' : 'right'} ${this.darkMode ? 'dark' : ''}"
        style="top: ${this.top}px"
        @mousedown="${this.startDragging}"
        @touchstart="${this.startDragging}"
        @click="${this.toggleMainWindow}"
      >
        <i class="icon icon-note"></i>
      </div>
      <div
        class="main-window mobile ${this.darkMode ? 'dark' : ''
        } ${this.isConnected ? '' : 'disconnected'} ${this.shouldMobileShowMainWindow ? '' : 'hide'}"
        style="${this.shouldMobileShowMainWindow
          ? `${this.mobileLeft ? 'transition: none;' : ''} left: ${
          this.mobileLeft < 50 ? 0 : this.mobileLeft}px; right: calc(-${
          this.mobileLeft < 50 ? 0 : this.mobileLeft}px)` : ''}"
        @touchstart="${this.startDragToGoBack}"
      >
        <div class="disconnected-panel ${this.isConnected ? 'hide' : ''}">
          ${locale.disconnected}
          <a class="btn" @click="${this.toggleMainWindow}"><i class="icon icon-back"></i></a>
        </div>
        <div class="cover-panel ${this.isLyricsShowing || !this.isConnected ? 'hide' : ''}"
             @click="${() => { this.isLyricsShowing = !this.isLyricsShowing }}"
        >
          <div class="cover-box ${this.isConnected ? '' : 'hide'}">
            ${this.currentSong ? html`
              <img src="${this.currentSong.cover}" />
            ` : ''}
            <a class="btn" @click="${this.toggleMainWindow}"><i class="icon icon-back"></i></a>
          </div>
          <div class="lyrics-title-box ${this.isConnected ? '' : 'hide'}">
            <h1>${this.currentSong?.title}</h1>
            <h2>${this.currentSong?.artist}</h2>
          </div>
          <div class="lyric">${this.parsedLyrics?.currentSentence}</div>
          <div class="lyric translation">${this.parsedLyrics?.currentSentenceTranslation}</div>
        </div>
        <div class="lyrics-panel ${this.isLyricsShowing && this.isConnected ? '' : 'hide'}"
             @click="${() => { this.isLyricsShowing = !this.isLyricsShowing }}"
        >
          <div class="back">
            <a class="btn" @click="${this.toggleMainWindow}"><i class="icon icon-back"></i></a>
          </div>
          <div class="lyrics-title-box">
            <h1>${this.currentSong?.title}</h1>
            <h2>${this.currentSong?.artist}</h2>
          </div>
          <div class="lyrics-scroll-box" id="lyrics-scroll-mobile">
            <div
              class="lyrics"
              @click="${(e) => { e.stopPropagation() }}"
              @touchstart="${(e) => { this.touchYStart = e.changedTouches[0].clientY }}"
              @touchend="${this.hideLyricsIfClicked}"
            >
              ${this.parsedLyrics?.lyrics.map((lyric) => html`
                <div
                  class="lyric ${lyric.timestamp === this.parsedLyrics?.currentSentenceStart ? 'current' : ''}"
                >
                  <div>${lyric.content}</div>
                  ${lyric.translation ? html`<div class="translation">${lyric.translation}</div>` : ''}
                </div>
              `) || '暂无歌词'}
            </div>
          </div>
          ${this.langAvailable?.length ? html`
            <div class="lyrics-control-box">
              <a class="btn" @click="${(e) => { e.stopPropagation(); this.nextLang() }}"
              >${this.parsedLyrics?.langName || this.parsedLyrics?.lang || html`<i class="icon icon-translate"></i>`}</a>
            </div>  
          ` : ''}
        </div>
        <div class="control-box ${this.isConnected ? '' : 'hide'}">
          <div class="control-panel panel ${this.isVolumeControlShowing ? 'hide' : ''}">
            <a class="btn" @click="${this.toggleDesktopLyrics}"
            ><i class="icon icon-lyrics${this.isDesktopLyricsShowing ? '-on' : ''}"></i></a>
            <a class="btn" @click="${this.nextPlayOrder}"><i class="icon icon-${this.playOrder === PLAY_ORDER_SINGLE
      ? 'solo' : this.playOrder === PLAY_ORDER_SHUFFLE ? 'shuffle' : 'loop'}"></i></a>
            <a class="btn" @click="${this.prev}"><i class="icon icon-previous"></i></a>
            <a class="btn play" @click="${this.togglePlay}"><i
              class="icon icon-${this.paused ? 'play' : 'pause'}-circle"
            ></i></a>
            <a class="btn" @click="${this.next}"><i class="icon icon-next"></i></a>
            <a class="btn" @click="${() => { this.isVolumeControlShowing = !this.isVolumeControlShowing }}"
            ><i class="icon icon-volume"></i></a>
            <a class="btn" @click="${this.togglePlaylist}"
            ><i class="icon icon-playlist"></i></a>
          </div>
          <div class="volume-playback-panel panel ${this.isVolumeControlShowing ? '' : 'hide'}">
            <a class="btn volume"
               @mouseenter="${this.showVolumeTrack}"
               @mouseleave="${this.closeVolumeTrack}"
            >
              <i class="icon icon-volume"></i>
              <kokoro-track
                id="volume-track"
                .played="${this.player?.volume}"
                .buffered="${[0, 1]}"
                @kokoro-change="${(e) => this.setVolume(e.detail.progress)}"
              ></kokoro-track>
            </a>
            <a class="volume-playback-panel-close"
               @click="${() => { this.isVolumeControlShowing = !this.isVolumeControlShowing }}"
            ><i class="icon icon-close"></i></a>
          </div>
          <kokoro-progress
            .played="${this.played}"
            .buffered="${this.buffered}"
            .currentTime="${this.playing?.currentTime}"
            .totalTime="${this.playing?.totalTime}"
            @kokoro-change="${(e) => { if (e.detail.commit) this.setCurrentProgress(e.detail.progress) }}"
          ></kokoro-progress>
        </div>
        <div
          class="playlist-panel-mask ${this.isConnected && this.isPlaylistShowing ? '' : 'hide'}"
          @click="${this.togglePlaylist}"
        ></div>
        <div class="playlist-panel ${this.isConnected && this.isPlaylistShowing ? '' : 'hide'}">
          <div class="playlist">
            ${this.playlist?.map((song, index) => html`
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
            @click="${this.togglePlaylist}"
          ><i class="icon icon-close"></i></a>
          ${this.playlist?.length ? html`
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
      <kokoro-desktop-lyrics
        class="${this.isDesktopLyricsShowing && this.isConnected && this.currentSong ? '' : 'hide'}"
        .lyrics="${this.parsedLyrics}"
        .currentTime="${this.playing?.currentTime || 0}"
        .verticalCenter="${this.desktopLyricsVerticalCenter}"
        .horizontalCenter="${this.desktopLyricsHorizontalCenter}"
        .colorSchemes="${this.desktopLyricsColorSchemes}"
        .colorSchemeIndex="${this.desktopLyricsColorSchemeIndex}"
        .fontSize="${this.desktopLyricsFontSize}"
        .mobileFontSize="${this.desktopLyricsMobileFontSize}"
        .paused="${this.paused}"
        .langAvailable="${this.langAvailable}"
        @kokoro-action="${(e) => this[e.detail.action]()}"
        @kokoro-change="${(e) => { this.language = e.detail.lang }}"
      ></kokoro-desktop-lyrics>
    `
  }

  hideLyricsIfClicked (e) {
    if (Math.abs(e.changedTouches[0].clientY - this.touchYStart) < 30) {
      setTimeout(() => { this.isLyricsShowing = !this.isLyricsShowing })
    }
  }

  toggleDesktopLyrics () {
    this.isDesktopLyricsShowing = !this.isDesktopLyricsShowing
  }

  toggleMainWindow (e) {
    if (e instanceof window.Event) e.stopPropagation()
    this.shouldMobileShowMainWindow = !this.shouldMobileShowMainWindow
    if (this.shouldMobileShowMainWindow) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    this.mobileLeft = 0
  }

  startDragging (e) {
    this.dragging = true
    e.stopPropagation()
    const e1 = (typeof window.TouchEvent !== 'undefined' && e instanceof window.TouchEvent)
      ? e.changedTouches[0]
      : e
    this.cursorX = e1.clientX
    this.shrinkToLeft = this.cursorX < ((document.documentElement || document.body).clientWidth / 2)
    this.cursorY = e1.clientY
    this.drag(e)
    if (e.type === 'mousedown') {
      document.addEventListener('mousemove', this.drag)
      document.addEventListener('mouseup', this.stopDragging)
    }
    if (e.type === 'touchstart') {
      document.addEventListener('touchmove', this.drag, { passive: false })
      document.addEventListener('touchend', this.stopDragging)
      document.addEventListener('touchcancel', this.stopDragging)
    }
  }

  drag (e) {
    if (e.type === 'touchmove') e.preventDefault()
    e = (typeof window.TouchEvent !== 'undefined' && e instanceof window.TouchEvent)
      ? e.changedTouches[0]
      : e
    this.left += e.clientX - this.cursorX
    this.right -= e.clientX - this.cursorX
    this.top += e.clientY - this.cursorY
    this.cursorX = e.clientX
    this.shrinkToLeft = this.cursorX < ((document.documentElement || document.body).clientWidth / 2)
    this.cursorY = e.clientY
    if (this.isMobile) {
      this.shouldShowSmallWindow = true
      return
    }
    if (!this.shouldShowSmallWindow) {
      const ssw = this.left <= -62.5 || this.left >= (document.documentElement || document.body).clientWidth - 272.5
      if (ssw) {
        this.left = this.cursorX - 61
        this.top = this.cursorY - 61
        this.right = (document.documentElement || document.body).clientWidth - this.cursorX - 61
        this.shouldShowSmallWindow = true
      }
    } else {
      const ssw = this.left <= 65 || this.left >= (document.documentElement || document.body).clientWidth - 187
      if (!ssw) {
        this.left = this.cursorX - 167.5
        this.top = this.cursorY - 16
        this.shouldShowSmallWindow = false
      }
    }
  }

  stopDragging () {
    this.dragging = false
    if (this.top < 0) this.top = 0
    const bottomSafeArea = this.isMobile
      ? (document.documentElement || document.body).clientHeight - 20
      : this.shouldShowSmallWindow
        ? (document.documentElement || document.body).clientHeight - 122
        : (document.documentElement || document.body).clientHeight - 36
    if (this.top > bottomSafeArea) {
      this.top = bottomSafeArea
    }
    if (this.shouldShowSmallWindow && this.shrinkToLeft) {
      this.left = 0
      this.right = (document.documentElement || document.body).clientWidth - 122
    }
    if (this.shouldShowSmallWindow && !this.shrinkToLeft) {
      this.right = 0
      this.left = (document.documentElement || document.body).clientWidth - 122
    }
    document.removeEventListener('mousemove', this.drag)
    document.removeEventListener('mouseup', this.stopDragging)
    document.removeEventListener('touchmove', this.drag)
    document.removeEventListener('touchend', this.stopDragging)
    document.removeEventListener('touchcancel', this.stopDragging)
  }

  togglePlaylist () {
    this.isPlaylistShowing = !this.isPlaylistShowing
    const selector = this.isMobile ? '.mobile .playlist' : '.playlist'
    if (this.isPlaylistShowing && typeof this.index === 'number') {
      if (this.index === 0) {
        this.shadowRoot.querySelector(selector).scrollTop = 0
      } else {
        this.shadowRoot.querySelector(`${selector} > .playlist-item-box:nth-child(${this.index})`)
          .scrollIntoView(true)
      }
    }
  }

  scrollLyricsToCurrent () {
    if (Date.now() - this.lastLyricsUserScrollTime < 3000) return
    if (this.isLyricsScrollAnimating) return
    this.isLyricsScrollAnimating = true
    const scrollDom = this.isMobile
      ? this.shadowRoot.querySelector('#lyrics-scroll-mobile')
      : this.shadowRoot.querySelector('#lyrics-scroll')
    if (!scrollDom) return
    const needScrollToDom = scrollDom.querySelector('.lyric.current')
    if (!needScrollToDom) return
    const scroll = () => {
      let currentY = scrollDom.scrollTop
      const top = 0
      const bottom = scrollDom.scrollHeight - scrollDom.clientHeight
      const needScrollTop = Math.max(top, Math.min(bottom,
        needScrollToDom.offsetTop + needScrollToDom.offsetHeight / 2 -
        scrollDom.clientHeight * 0.4)) - currentY
      if (needScrollTop > 1 || needScrollTop < -1) {
        currentY += needScrollTop > 0
          ? Math.ceil(needScrollTop / 15)
          : Math.floor(needScrollTop / 15)
        scrollDom.scrollTop = currentY
        window.requestAnimationFrame(scroll)
      } else {
        this.isLyricsScrollAnimating = false
      }
    }
    window.requestAnimationFrame(scroll)
  }

  startDragToGoBack (e) {
    if (!window.TouchEvent || !(e instanceof window.TouchEvent)) return
    e.stopPropagation()
    const e1 = e.changedTouches[0]
    this.cursorX = e1.clientX
    this.mobileLeft = 0
    document.addEventListener('touchmove', this.dragToGoBack)
    document.addEventListener('touchend', this.stopDragToGoBack)
    document.addEventListener('touchcancel', this.stopDragToGoBack)
  }

  dragToGoBack (e) {
    if (!window.TouchEvent || !(e instanceof window.TouchEvent)) return
    e = e.changedTouches[0]
    this.mobileLeft += e.clientX - this.cursorX
    if (this.mobileLeft < 0) this.mobileLeft = 0
    this.cursorX = e.clientX
  }

  stopDragToGoBack () {
    if (this.mobileLeft < (document.documentElement || document.body).clientWidth / 2) {
      this.mobileLeft = 0
    } else {
      this.toggleMainWindow()
    }
    document.removeEventListener('touchmove', this.dragToGoBack)
    document.removeEventListener('touchend', this.stopDragToGoBack)
    document.removeEventListener('touchcancel', this.stopDragToGoBack)
  }

  nextLang () {
    let index = this.langAvailable.findIndex((lang) => lang.lang === this.parsedLyrics?.lang)
    index++
    if (index === this.langAvailable.length) index = -1
    this.language = this.langAvailable[index]?.lang || null
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
    currentSong: state.playing.song,
    lyrics: state.playing.song?.lyrics,
    langAvailable: getLangAvailable(state.playing.song?.lyrics),
    pnKindAvailable: [],
    index: state.playlist.orderedIndexOfPlaying,
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
