import Kokoro, {
  ILyrics, ISong, PLAY_ORDER_LOOP, PLAY_ORDER_SHUFFLE, PLAY_ORDER_SINGLE
} from 'kokoro'
import { LitElement } from "lit-element"

export {
  Kokoro,
  PLAY_ORDER_SHUFFLE, PLAY_ORDER_LOOP, PLAY_ORDER_SINGLE
}

export declare class Provider extends LitElement {
  static connect(kokoro: Kokoro): Provider
  connect(kokoro: Kokoro): void
  disconnect(): void
}

export interface DesktopLyricsColorScheme {
  name: string
  value: string
}

export declare class Player extends LitElement {
  language?: string
  pnKind?: string
  darkMode?: boolean
  isDesktopLyricsShowing?: boolean
  top?: number
  left?: number
  right?: number
  bottom?: number
  mobileDefaultSide?: 'left' | 'right'
  desktopLyricsVerticalCenter?: number
  desktopLyricsColorSchemes?: DesktopLyricsColorScheme[]
  desktopLyricsColorSchemeIndex?: number
}

export interface Card {
  primaryColor?: string
  secondaryColor?: string
  backgroundColor?: string
  type?: 'classical' | 'flat'
}

export declare class SingleCard extends LitElement implements ISong, Card {
  title: string
  artist?: string
  album?: string
  src: string | string[]
  cover?: string
  lyrics?: ILyrics
  primaryColor?: string
  secondaryColor?: string
  backgroundColor?: string
  type?: 'classical' | 'flat'
}

export declare class PlaylistCard extends LitElement implements Card {
  title: string
  songs: ISong[]
  primaryColor?: string
  secondaryColor?: string
  backgroundColor?: string
  type?: 'classical' | 'flat'
}

export interface Locale {
  playNow: string
  playNext: string
  playAll: string
  added: string
  addToPlaylist: string
  banner: string
  disconnected: string
  noLyrics: string
}
export interface locale {
  using: Locale
  zh_Hans: Locale
  en: Locale
  use: (l: Locale) => void
}
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'kokoro-player': any
      'kokoro-single-card': any,
      'kokoro-playlist-card': any
    }
  }
}
