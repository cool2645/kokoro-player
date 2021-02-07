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
    if (lang && lyrics.translations) {
      const transLyrics = lyrics.translations.find((l) => l.lang === lang)
      if (transLyrics && transLyrics.value !== originalTranslationLyrics) {
        originalTranslationLyrics = transLyrics.value
        parsedTranslationLyrics = Lrc.parse(transLyrics.value)
        parsedTranslationLyrics.lyrics.sort((a, b) => (a.timestamp - b.timestamp))
        translationLrcRunner = new Runner(parsedTranslationLyrics)
      }
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
    return {
      lyrics: parsedLyrics,
      currentSentence: currentLyric.content,
      currentSentenceStart: currentLyric.timestamp,
      currentSentenceEnd: nextLyric.timestamp,
      currentSentenceTranslation: translationLrcRunner ? translationLrcRunner.curLyric() : null,
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
    return lyrics.translations.map((t) => t.lang)
  }
  console.error(`Unsupported lyrics type: ${lyrics.type}`)
  return []
}
