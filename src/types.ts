import { Languages } from './languages'

export type TextMetaResult = {
  abbreviations: string[]
  comments: string[]
  optionalData: string[]
  wordClassDefinitions: string[]
}

export type Translation = { text: string; meta: TextMetaResult }

export type TranslationResult = {
  translateFrom: Translation
  translateTo: Translation
}

export type TranslationInput = {
  sourceLanguage: Languages
  targetLanguage: Languages
  term: string
}
