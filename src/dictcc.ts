import cheerio from 'cheerio'
import fetch from 'node-fetch'

import { Languages } from './config'
import { Translation, TranslationInput, TranslationResult } from './types'
import { getDictccUrl, getTextMeta, getTranslatedText } from './utils'

export default async ({
  fromLang,
  toLang,
  term,
}: TranslationInput): Promise<{
  data: TranslationResult[] | undefined
  error: Error | undefined
}> => {
  // this should ideally never happen as the input is typed.
  if (!Languages[fromLang] || !Languages[toLang]) {
    return {
      data: undefined,
      error: new Error(
        `Either ${fromLang} or ${toLang} value is not supported!`,
      ),
    }
  }

  try {
    const url = getDictccUrl({ fromLang, toLang, term })
    const response = await fetch(url)
    const body = await response.text()

    const $ = cheerio.load(body)
    const translateFrom: Translation[] = []
    const translateTo: Translation[] = []

    $('td.td7nl').each((i, elem) => {
      const rawText = $(elem).text()
      const text = getTranslatedText(rawText)
      const meta = getTextMeta(rawText)

      if (i % 2 === 0) {
        // right column
        translateTo.push({ text, meta })
      } else {
        // left column
        translateFrom.push({ text, meta })
      }
    })

    return {
      data: translateFrom.map((element, index) => ({
        translateFrom: element,
        translateTo: translateTo[index],
      })),
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
