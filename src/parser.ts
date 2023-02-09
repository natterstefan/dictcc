import cheerio from 'cheerio'
import fetch from 'node-fetch'

import { Translation, TranslationInput } from './types'
import { getTextMeta, getTranslatedText } from './utils'

export const createDictccUrl = ({
  sourceLanguage,
  targetLanguage,
  term,
}: TranslationInput) => {
  /**
   * https://de-en.dict.cc?s=Begriff: translates de -> en
   * http://deen.dict.cc?s=Begriff: translates in both directions
   */
  const url = new URL(`https://${sourceLanguage}${targetLanguage}.dict.cc`)
  url.searchParams.set('s', term)

  return url.href
}

export const getHtmlString = async (url: string) => (await fetch(url)).text()

/**
 * The result pages define two JavaScript variables containing the translation
 * strings of the request: `c1Arr` and `c2Arr`. We get the two arrays and
 * parse the data for internal use.
 *
 * ATTENTION: parsing these variables from the page can fail anytime, if dict.cc
 * changes the HTML they render.
 */
export const getTranslationsArray = (html: string): (string[] | undefined)[] =>
  Array.from(
    html.matchAll(/var c[\d]Arr = new Array\((.*)\);/g),
    m => m[1],
  ).map(language => JSON.parse(`[${language.replaceAll(`\\'`, "'")}]`))

/**
 * The result pages define two JavaScript variables containing the translation
 * ids (table rows)
 *
 * ATTENTION: parsing these variables from the page can fail anytime, if dict.cc
 * changes the HTML they render.
 */
export const getTranslationsIds = (html: string): string[] =>
  (
    Array.from(html.matchAll(/var idArr = new Array\((.*)\);/g), m => m[1]).map(
      translationId => JSON.parse(`[${translationId.replaceAll(`\\'`, "'")}]`),
    )[0] ?? []
  ).slice(1)

/**
 * We could use only the results of `getTranslationsArray` to show the
 * translation of a given term. But the HTML contains more information about
 * the given translated term (e.g. synonyms, etc.).
 *
 * To make them available we load the HTML string with cheerio and and get
 * not only the translation but also - what we call - meta data.
 */
export const getTranslationsColumns = (html: string) => {
  const $ = cheerio.load(html)

  const translationsLeft: Translation[] = []
  const translationsRight: Translation[] = []

  $('td.td7nl').each((i, elem) => {
    // the element contains a dfn element, which links to a specific subject on
    // dict.cc (e.g. https://www.dict.cc/?s=subject:ling.). We remove this as
    // well.
    $(elem)
      .find('dfn')
      .each((_i, el) => {
        $(el).remove()
      })

    const rawText = $(elem).text()

    const text = getTranslatedText(rawText)
    const meta = getTextMeta(rawText)

    if (i % 2 === 0) {
      translationsRight.push({ text, meta })
    } else {
      translationsLeft.push({ text, meta })
    }
  })

  return {
    translationsLeft,
    translationsRight,
  }
}

export const getTranslationsAudioUrls = (
  translationsIds: string[],
  sourceLanguage: string,
  targetLanguage: string,
) =>
  translationsIds.map(
    translationId =>
      `https://audio.dict.cc/speak.audio.v2.php?type=mp3&id=${translationId}&lang=${targetLanguage}_rec_ip&lp=${sourceLanguage.toUpperCase()}${targetLanguage.toUpperCase()}`,
  )
