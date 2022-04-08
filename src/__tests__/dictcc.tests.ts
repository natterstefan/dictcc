import translate, { Languages } from '..'

type Data = { fromLang: Languages; toLang: Languages; term: string }

describe('dictcc', () => {
  it.each<Data>([
    { fromLang: Languages.de, toLang: Languages.en, term: 'Begriff' },
    {
      fromLang: Languages.de,
      toLang: Languages.en,
      term: 'Österreichische Küche',
    },
    { fromLang: Languages.de, toLang: Languages.fr, term: 'Begriff' },
    { fromLang: Languages.en, toLang: Languages.de, term: 'term' },
    { fromLang: Languages.fr, toLang: Languages.de, term: 'terme' },
  ])(
    'returns $fromLang->$toLang translations for the term "$term"',
    async ({ fromLang, toLang, term }) => {
      const { data, error } = await translate({ fromLang, toLang, term })
      expect(data).toMatchSnapshot()
      expect(error).toBeUndefined()
    },
  )

  it.each<Data>([
    { fromLang: 'asdf' as any, toLang: Languages.de, term: 'Begriff' },
    { fromLang: Languages.de, toLang: 'asdf' as any, term: 'Begriff' },
  ])(
    'return error for $fromLang->$toLang translations',
    async ({ fromLang, toLang, term }) => {
      const { data, error } = await translate({ fromLang, toLang, term })
      expect(data).toBeUndefined()
      expect(error).toBeInstanceOf(Error)
      expect(error?.message).toBe(
        `Either ${fromLang} or ${toLang} value is not supported!`,
      )
    },
  )
})
