# dictcc

`dictcc` is a client for the [dict.cc](https://dict.cc/) dictionary service. It
returns a list of translations for a given term for a given source and target
language.

## Installation

```bash
npm i dictcc

# or
yarn add dictcc
```

## Usage Example

```js
/**
 * `translate` translates a `term` from a language `fromLang` into another
 * language `toLang`.
 *
 *  `Languages` represents supported languages
 */
import translate, { Languages } from 'dictcc'

const getTranslation = async () => {
  const { data, error } = await translate({
    fromLang: Languages.en,
    toLang: Languages.de,
    term: 'term',
  })

  return data
}
```

## License

[MIT](./LICENSE)
