import { createDictccUrl } from '@/parser'
import { TranslationInput } from '@/types'

import translate, { Languages } from '..'

describe('dictcc', () => {
  it.each<TranslationInput>([
    {
      fromLanguage: Languages.de,
      toLanguage: Languages.en,
      term: 'Begriff',
    },
    { fromLanguage: Languages.de, toLanguage: Languages.es, term: 'Begriff' },
    { fromLanguage: Languages.de, toLanguage: Languages.fr, term: 'Begriff' },
    { fromLanguage: Languages.de, toLanguage: Languages.ro, term: 'Begriff' },

    {
      fromLanguage: Languages.de,
      toLanguage: Languages.en,
      term: 'Abkürzung',
    },

    {
      fromLanguage: Languages.de,
      toLanguage: Languages.en,
      term: 'Österreichische Küche',
    },

    { fromLanguage: Languages.en, toLanguage: Languages.de, term: 'term' },
    { fromLanguage: Languages.en, toLanguage: Languages.de, term: 'Tuesday' },

    { fromLanguage: Languages.fr, toLanguage: Languages.de, term: 'terme' },
  ])(
    'returns $fromLanguage->$toLanguage translations for the term "$term"',
    async input => {
      const { data, error } = await translate(input)
      expect({ url: createDictccUrl(input), data, error }).toMatchSnapshot()
    },
  )

  it.each<TranslationInput>([
    {
      fromLanguage: Languages.de,
      toLanguage: Languages.fi,
      term: 'hello',
    },
  ])(
    'handles response for translation request with incorrect word (e.g. $fromLanguage->$toLanguage with "$term")',
    async input => {
      const { data, error } = await translate(input)
      expect(data).toMatchSnapshot()
      expect(error).toBeUndefined()
    },
  )

  it.each<TranslationInput>([
    { fromLanguage: 'asdf' as any, toLanguage: Languages.de, term: 'Begriff' },
    { fromLanguage: Languages.de, toLanguage: 'asdf' as any, term: 'Begriff' },
  ])(
    'return error for $fromLanguage->$toLanguage translations',
    async ({ fromLanguage, toLanguage, term }) => {
      const { data, error } = await translate({
        fromLanguage,
        toLanguage,
        term,
      })
      expect(data).toBeUndefined()
      expect(error).toBeInstanceOf(Error)
      expect(error?.message).toBe(
        `The language ${fromLanguage} or ${toLanguage} is not supported!`,
      )
    },
  )
})
