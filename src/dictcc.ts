import { Languages } from './languages'
import {
  getHtmlString,
  getTranslationsColumns,
  getTranslationsArray,
} from './parser'
import { TranslationInput, TranslationResult } from './types'
import { prepareData } from './utils'

export default async (
  input: TranslationInput,
): Promise<{
  data: TranslationResult[] | undefined
  error: Error | undefined
}> => {
  const { fromLanguage, toLanguage, term } = input

  // this should ideally never happen as the input is typed.
  if (!Languages[fromLanguage] || !Languages[toLanguage]) {
    return {
      data: undefined,
      error: new Error(
        `The language ${fromLanguage} or ${toLanguage} is not supported!`,
      ),
    }
  }

  try {
    const body = await getHtmlString(input)
    const translations = getTranslationsArray(body)

    /**
     * There are no translations available for this term in the given languages.
     */
    if (!translations[0] || !translations[1]) {
      return {
        data: [],
        error: undefined,
      }
    }

    const { translationsLeft, translationsRight } = getTranslationsColumns(body)

    /**
     * Sometimes the from-translation is in the right-column and sometimes
     * it is in the left-column. We determine which one is which by looking
     * up the search term in the list of translated words.
     */
    let data
    if (translations[0].includes(term)) {
      data = prepareData(translationsRight, translationsLeft)
    } else {
      data = prepareData(translationsLeft, translationsRight)
    }

    return {
      data,
      error: undefined,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: undefined,
        error,
      }
    }
  }

  return {
    data: undefined,
    error: new Error('Unknown error'),
  }
}
