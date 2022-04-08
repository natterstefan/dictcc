import { TranslationInput } from './types'

const removeBrackets = (text: string) => text.replace(/\[|\]|\{|\}/g, '')

export const getTextMeta = (text: string) =>
  text
    .match(/\[.+\]|\{.+\}/g)
    ?.map(t => {
      if (t.includes('] [')) {
        return t.split('] [').map(e => removeBrackets(e))
      }
      return removeBrackets(t)
    })
    .flat()

export const getTranslatedText = (text: string) =>
  text
    .replace(/\d/g, '')
    .replace(/\[.+\]/g, '')
    .replace(/\{.+\}/g, '')
    .trim()

export const getDictccUrl = ({ fromLang, toLang, term }: TranslationInput) => {
  const url = new URL(`https://${fromLang}-${toLang}.dict.cc`)
  url.searchParams.set('s', term)

  return url.href
}
