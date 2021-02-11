// eslint-disable-next-line camelcase
export const zh_Hans = {
  playNow: '立即播放',
  playNext: '下一首播放',
  playAll: '播放全部',
  added: '已添加',
  addToPlaylist: '添加到列表',
  banner: '心铃 - Kokoro -',
  disconnected: 'Kokoro 播放器未连接',
  noLyrics: '暂无歌词'
}

export const en = {
  playNow: 'Play Now',
  playNext: 'Play Next',
  playAll: 'Play All',
  added: 'Added',
  addToPlaylist: 'Add to Playlist',
  banner: 'Kokoro - Music Your Website',
  disconnected: 'Kokoro Disconnected',
  noLyrics: 'No lyrics'
}

export const using = Object.assign({}, zh_Hans)

export function use (locale) {
  for (const key of Object.keys(using)) {
    using[key] = locale[key]
  }
}

export default using
