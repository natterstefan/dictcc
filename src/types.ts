import { Languages } from './config'

export type Translation = { text: string; meta: string[] | undefined }

export type TranslationResult = {
  translateFrom: Translation
  translateTo: Translation
}

export type TranslationInput = {
  fromLang: Languages
  toLang: Languages
  term: string
}
