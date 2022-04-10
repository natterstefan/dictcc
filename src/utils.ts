import { TextMetaResult, Translation, Translations } from './types'

/**
 * List of availabe brackets on dict.cc:
 * @see https://defr.contribute.dict.cc/guidelines/
 */
export const getTextMeta = (text: string): TextMetaResult => {
  const abbreviations = Array.from(text.matchAll(/<(.*?)>/g), m => m[1])
  const comments = Array.from(text.matchAll(/\[(.*?)\]/g), m => m[1])
  const optionalData = Array.from(text.matchAll(/\((.*?)\)/g), m => m[1])
  const wordClassDefinitions = Array.from(
    text.matchAll(/\{(.*?)\}/g),
    m => m[1],
  )

  return { abbreviations, comments, optionalData, wordClassDefinitions }
}

/**
 * List of availabe brackets on dict.cc:
 * @see https://defr.contribute.dict.cc/guidelines/
 */
export const getTranslatedText = (text: string) =>
  text
    // remove any number and content in brackets and the brackets as well
    .replace(/\d|\[.+\]|<.+>|\{.+\}|\(.+\)/g, '')
    .trim()

export const prepareData = (
  from: Translation[],
  to: Translation[],
): Translations[] =>
  from.map((element, index) => ({
    sourceTranslation: element,
    targetTranslation: to[index],
  }))
