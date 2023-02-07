import { Languages } from './languages'
import {
  getHtmlString,
  getTranslationsColumns,
  getTranslationsArray,
  getTranslationsIds,
  getTranslationsAudioUrls,
  createDictccUrl,
} from './parser'
import { TranslationInput, TranslationResult } from './types'
import { prepareData } from './utils'

export default async (input: TranslationInput): Promise<TranslationResult> => {
  const { sourceLanguage, targetLanguage, term } = input

  // this should ideally never happen as the input is typed.
  if (!Languages[sourceLanguage] || !Languages[targetLanguage]) {
    return {
      data: undefined,
      url: undefined,
      error: new Error(
        `The language ${sourceLanguage} or ${targetLanguage} is not supported!`,
      ),
    }
  }

  const url = createDictccUrl(input)

  try {
    const body = await getHtmlString(url)
    const translations = getTranslationsArray(body)
    const translationsIds = getTranslationsIds(body)

    /**
     * There are no translations available for this term in the given languages.
     */
    if (!translations[0] || !translations[1]) {
      return {
        data: [],
        url,
        error: undefined,
      }
    }

    const { translationsLeft, translationsRight } = getTranslationsColumns(body)
    const audioUrls = getTranslationsAudioUrls(
      translationsIds,
      sourceLanguage,
      targetLanguage,
    )

    /**
     * Sometimes the from-translation is in the right-column and sometimes
     * it is in the left-column. We determine which one is which by looking
     * up the search term in the list of translated words.
     */
    let data
    if (translations[0].includes(term)) {
      data = prepareData(translationsRight, translationsLeft, audioUrls)
    } else {
      data = prepareData(translationsLeft, translationsRight, audioUrls)
    }

    return {
      data,
      url,
      error: undefined,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: undefined,
        url,
        error,
      }
    }
  }

  return {
    data: undefined,
    url,
    error: new Error('Unknown error'),
  }
}
