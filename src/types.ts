import { Languages } from './languages'

export type TextMetaResult = {
  abbreviations: string[]
  comments: string[]
  optionalData: string[]
  wordClassDefinitions: string[]
}

export type Translation = { text: string; meta: TextMetaResult }

export type TranslationInput = {
  sourceLanguage: Languages
  targetLanguage: Languages
  term: string
}

export type Translations = {
  sourceTranslation: Translation
  targetTranslation: Translation
}

export type TranslationResult = {
  data: Translations[] | undefined
  error: Error | undefined
  url: string | undefined
}
