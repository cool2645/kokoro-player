import { Lrc, Runner } from 'lrc-kit'

export const parseLrcLyrics = (function () {
  let originalLyrics = null
  let originalTranslationLyrics = null
  let parsedLyrics = null
  let parsedTranslationLyrics = null
  let lrcRunner
  let translationLrcRunner
  return (lyrics, time, totalTime, lang) => {
    if (!lyrics) return null
    if (!originalLyrics || lyrics.value !== originalLyrics) {
      originalLyrics = lyrics.value
      parsedLyrics = Lrc.parse(lyrics.value)
      parsedLyrics.lyrics.sort((a, b) => (a.timestamp - b.timestamp))
      lrcRunner = new Runner(parsedLyrics)
    }
    let transLyrics
    if (lang && lyrics.translations) {
      transLyrics = lyrics.translations.find((l) => l.lang.toLowerCase() === lang.toLowerCase())
      if (!transLyrics) {
        lang = lang.split('-')[0].split('_')[0].toLowerCase()
        transLyrics = lyrics.translations.find((l) => l.lang.toLowerCase().startsWith(lang))
      }
      if (transLyrics && transLyrics.value !== originalTranslationLyrics) {
        originalTranslationLyrics = transLyrics.value
        parsedTranslationLyrics = Lrc.parse(transLyrics.value)
        parsedTranslationLyrics.lyrics.sort((a, b) => (a.timestamp - b.timestamp))
        translationLrcRunner = new Runner(parsedTranslationLyrics)
      }
    }
    if (lang !== undefined && !transLyrics) {
      originalTranslationLyrics = null
      parsedTranslationLyrics = null
      translationLrcRunner = null
    }
    lrcRunner.timeUpdate(time)
    if (translationLrcRunner) translationLrcRunner.timeUpdate(time)
    const currentLyric = lrcRunner.curLyric()
    let nextLyric
    if (lrcRunner.curIndex() + 1 >= parsedLyrics.lyrics.length) {
      nextLyric = { timestamp: totalTime, content: '' }
    } else {
      nextLyric = lrcRunner.getLyric(lrcRunner.curIndex() + 1)
    }
    for (let i = 0; i < parsedLyrics.lyrics.length; i++) {
      if (transLyrics) {
        const trans = parsedTranslationLyrics.lyrics[i]
        if (trans) {
          parsedLyrics.lyrics[i].translation = trans.content
        }
      } else if (lang !== undefined) {
        delete parsedLyrics.lyrics[i].translation
      }
    }
    return {
      lyrics: parsedLyrics.lyrics,
      lang: transLyrics?.lang || null,
      langName: transLyrics?.name || null,
      currentSentence: currentLyric.content,
      currentSentenceStart: currentLyric.timestamp,
      currentSentenceEnd: nextLyric.timestamp,
      currentSentenceTranslation: translationLrcRunner ? translationLrcRunner.curLyric().content : null,
      nextSentence: nextLyric.content,
      nextSentenceTranslation: translationLrcRunner
        ? translationLrcRunner.curIndex() + 1 >= parsedTranslationLyrics.lyrics.length
          ? '' : translationLrcRunner.getLyric(translationLrcRunner.curIndex() + 1)
        : null
    }
  }
})()

export const parseLyrics = (lyrics, currentTime, totalTime, lang, pnKind) => {
  if (!lyrics) return null
  if (lyrics.type === 'lrc') {
    return parseLrcLyrics(lyrics, currentTime, totalTime, lang)
  }
  console.error(`Unsupported lyrics type: ${lyrics.type}`)
  return null
}

export const getLangAvailable = (lyrics) => {
  if (!lyrics) return null
  if (lyrics.type === 'lrc') {
    if (!lyrics.translations) return []
    return lyrics.translations.map((t) => ({ lang: t.lang, name: t.name }))
  }
  console.error(`Unsupported lyrics type: ${lyrics.type}`)
  return []
}
