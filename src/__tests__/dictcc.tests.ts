import { createDictccUrl } from '@/parser'
import { TranslationInput } from '@/types'

import translate, { Languages } from '..'

describe('dictcc', () => {
  it.each<TranslationInput>([
    {
      sourceLanguage: Languages.de,
      targetLanguage: Languages.en,
      term: 'Begriff',
    },
    {
      sourceLanguage: Languages.de,
      targetLanguage: Languages.es,
      term: 'Begriff',
    },
    {
      sourceLanguage: Languages.de,
      targetLanguage: Languages.fr,
      term: 'Begriff',
    },
    {
      sourceLanguage: Languages.de,
      targetLanguage: Languages.ro,
      term: 'Begriff',
    },

    {
      sourceLanguage: Languages.de,
      targetLanguage: Languages.en,
      term: 'Abkürzung',
    },

    {
      sourceLanguage: Languages.de,
      targetLanguage: Languages.en,
      term: 'österreichisch',
    },

    {
      sourceLanguage: Languages.en,
      targetLanguage: Languages.de,
      term: 'term',
    },
    {
      sourceLanguage: Languages.en,
      targetLanguage: Languages.de,
      term: 'Tuesday',
    },

    {
      sourceLanguage: Languages.fr,
      targetLanguage: Languages.de,
      term: 'terme',
    },
  ])(
    'returns $sourceLanguage->$targetLanguage translations for the term "$term"',
    async input => {
      const { data, error } = await translate(input)
      expect({ url: createDictccUrl(input), data, error }).toMatchSnapshot()
    },
  )

  it.each<TranslationInput>([
    {
      sourceLanguage: Languages.de,
      targetLanguage: Languages.fi,
      term: 'hello',
    },
  ])(
    'handles response for translation request with incorrect word (e.g. $sourceLanguage->$targetLanguage with "$term")',
    async input => {
      const { data, error } = await translate(input)
      expect(data).toMatchSnapshot()
      expect(error).toBeUndefined()
    },
  )

  it.each<TranslationInput>([
    {
      sourceLanguage: 'asdf' as any,
      targetLanguage: Languages.de,
      term: 'Begriff',
    },
    {
      sourceLanguage: Languages.de,
      targetLanguage: 'asdf' as any,
      term: 'Begriff',
    },
  ])(
    'return error for $sourceLanguage->$targetLanguage translations',
    async ({ sourceLanguage, targetLanguage, term }) => {
      const { data, error } = await translate({
        sourceLanguage,
        targetLanguage,
        term,
      })
      expect(data).toBeUndefined()
      expect(error).toBeInstanceOf(Error)
      expect(error?.message).toBe(
        `The language ${sourceLanguage} or ${targetLanguage} is not supported!`,
      )
    },
  )
})
