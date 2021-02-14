import './iconfont/iconfont.css'

import Kokoro, { PLAY_ORDER_SHUFFLE, PLAY_ORDER_LOOP, PLAY_ORDER_SINGLE } from 'kokoro'

import Player from './components/player'
import SingleCard from './components/single-card'
import PlaylistCard from './components/playlist-card'
import Provider from './utils/provider'
import * as locale from './utils/locale'
export {
  Kokoro, Player, SingleCard, PlaylistCard, Provider,
  locale, PLAY_ORDER_SHUFFLE, PLAY_ORDER_LOOP, PLAY_ORDER_SINGLE
}
export default {
  Kokoro,
  PLAY_ORDER_SHUFFLE,
  PLAY_ORDER_LOOP,
  PLAY_ORDER_SINGLE,
  Provider,
  locale
}
