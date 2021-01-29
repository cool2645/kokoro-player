import { Router } from '@vaadin/router'

import { Kokoro, Provider, PLAY_ORDER_LOOP } from '../'
import { routes } from './nav'
import './solo'
import './playlist'
import './lyrics'
import './source'

window.player = new Kokoro()
window.customElements.define('kokoro-provider', Provider.connect(window.player))
window.player.setPlaylist([{
  title: '你的答案',
  artist: '阿冗',
  album: '你的答案',
  src: 'https://cdn.innocent.love/%E9%98%BF%E5%86%97%20-%20%E4%BD%A0%E7%9A%84%E7%AD%94%E6%A1%88.mp3',
  cover: 'https://cdn.innocent.love/%E9%98%BF%E5%86%97%20-%20%E4%BD%A0%E7%9A%84%E7%AD%94%E6%A1%88.jpg'
}], 0, PLAY_ORDER_LOOP)

const router = new Router(document.getElementById('app'))
router.setRoutes(routes)
