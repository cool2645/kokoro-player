import { Router } from '@vaadin/router'

import { Kokoro, Provider, PLAY_ORDER_LOOP } from '../'
import { routes } from './nav'
import './solo'
import './playlist'
import './source'

window.player = new Kokoro()
window.customElements.define('kokoro-provider', Provider.connect(window.player))
window.player.setPlaylist([{
  title: '冬眠',
  artist: '司南',
  album: '冬眠',
  src: 'https://cdn.innocent.love/%E5%8F%B8%E5%8D%97%20-%20%E5%86%AC%E7%9C%A0.mp3',
  cover: 'https://cdn.innocent.love/%E5%8F%B8%E5%8D%97%20-%20%E5%86%AC%E7%9C%A0.jpg'
}, {
  title: '我乐意',
  artist: '玖笙',
  album: '我乐意',
  src: 'https://cdn.innocent.love/%E7%8E%96%E7%AC%99%20-%20%E6%88%91%E4%B9%90%E6%84%8F.mp3',
  cover: 'https://cdn.innocent.love/%E7%8E%96%E7%AC%99%20-%20%E6%88%91%E4%B9%90%E6%84%8F.jpg'
}, {
  title: '绿茶',
  artist: '孙羽幽',
  album: '孙羽幽翻唱集',
  src: 'https://cdn.innocent.love/%E5%AD%99%E7%BE%BD%E5%B9%BD%20-%20%E7%BB%BF%E8%8C%B6.mp3',
  cover: 'https://cdn.innocent.love/%E5%AD%99%E7%BE%BD%E5%B9%BD%20-%20%E7%BB%BF%E8%8C%B6.jpg'
}, {
  title: 'あの頃～ジンジンバオヂュオニー～ (zerokoi ver.)',
  artist: 'whiteeeen',
  album: 'ゼロ恋',
  src: 'https://cdn.innocent.love/whiteeeen%20-%20%E3%81%82%E3%81%AE%E9%A0%83%EF%BD%9E%E3%82%B7%E3%82%99%E3%83%B3%E3%82%B7%E3%82%99%E3%83%B3%E3%83%8F%E3%82%99%E3%82%AA%E3%83%81%E3%82%99%E3%83%A5%E3%82%AA%E3%83%8B%E3%83%BC%EF%BD%9E%20(zerokoi%20ver.).mp3',
  cover: 'https://cdn.innocent.love/whiteeeen%20-%20%E3%81%82%E3%81%AE%E9%A0%83%EF%BD%9E%E3%82%B7%E3%82%99%E3%83%B3%E3%82%B7%E3%82%99%E3%83%B3%E3%83%8F%E3%82%99%E3%82%AA%E3%83%81%E3%82%99%E3%83%A5%E3%82%AA%E3%83%8B%E3%83%BC%EF%BD%9E%20(zerokoi%20ver.).jpg'
}, {
  title: '你的答案',
  artist: '阿冗',
  album: '你的答案',
  src: 'https://cdn.innocent.love/%E9%98%BF%E5%86%97%20-%20%E4%BD%A0%E7%9A%84%E7%AD%94%E6%A1%88.mp3',
  cover: 'https://cdn.innocent.love/%E9%98%BF%E5%86%97%20-%20%E4%BD%A0%E7%9A%84%E7%AD%94%E6%A1%88.jpg'
}, {
  title: '真的爱你',
  artist: 'Beyond',
  album: 'Beyond 25th Anniversary',
  src: 'https://cdn.innocent.love/Beyond%20-%20%E7%9C%9F%E7%9A%84%E7%88%B1%E4%BD%A0.flac',
  cover: 'https://cdn.innocent.love/Beyond%20-%20%E7%9C%9F%E7%9A%84%E7%88%B1%E4%BD%A0.jpg'
}, {
  title: 'ひだまりデイズ',
  artist: '妹S(シスターズ)',
  album: 'ひだまりデイズ',
  src: 'https://cdn.innocent.love/%E5%A6%B9S(%E3%82%B7%E3%82%B9%E3%82%BF%E3%83%BC%E3%82%B9%E3%82%99)%20-%20%E3%81%B2%E3%81%9F%E3%82%99%E3%81%BE%E3%82%8A%E3%83%86%E3%82%99%E3%82%A4%E3%82%B9%E3%82%99.flac',
  cover: 'https://cdn.innocent.love/%E5%A6%B9S(%E3%82%B7%E3%82%B9%E3%82%BF%E3%83%BC%E3%82%B9%E3%82%99)%20-%20%E3%81%B2%E3%81%9F%E3%82%99%E3%81%BE%E3%82%8A%E3%83%86%E3%82%99%E3%82%A4%E3%82%B9%E3%82%99.jpg'
}], 0, PLAY_ORDER_LOOP)

const router = new Router(document.getElementById('app'))
router.setRoutes(routes)
