# dictcc

[![npm version](https://badge.fury.io/js/dictcc.svg)](https://www.npmjs.com/package/dictcc)
[![Node CI](https://github.com/natterstefan/dictcc/actions/workflows/ci.yml/badge.svg)](https://github.com/natterstefan/dictcc/actions/workflows/ci.yml)
[![GitHub issues](https://img.shields.io/github/issues/natterstefan/dictcc)](https://github.com/natterstefan/dictcc/issues)
[![GitHub license](https://img.shields.io/github/license/natterstefan/dictcc)](https://github.com/natterstefan/dictcc/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/natterstefan/dictcc/issues/new/choose)

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
 * `translate` translates a `term` from a language (`sourceLanguage`) into another
 * language (`targetLanguage`).
 *
 *  `Languages` represents supported languages
 */
import translate, { Languages } from 'dictcc'

const getTranslation = async () => {
  const { data, error, url } = await translate({
    sourceLanguage: Languages.en,
    targetLanguage: Languages.de,
    term: 'home',
  })

  return data
}
```

A result looks something like this:

```json
[
  {
    "sourceTranslation": {
      "text": "home",
      "meta": {
        "abbreviations": [],
        "comments": ["at home"],
        "optionalData": [],
        "wordClassDefinitions": ["adv"]
      }
    },
    "targetTranslation": {
      "text": "daheim",
      "meta": {
        "abbreviations": [],
        "comments": ["bes. südd., österr. u. schweiz."],
        "optionalData": [],
        "wordClassDefinitions": []
      }
    },
    "targetTranslationAudioUrl": "https://www.example.com/audio/daheim.mp3"
  }
]
```

## License

[MIT](./LICENSE)

## Contributors ✨

Thanks goes to these wonderful people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://natterstefan.me/"><img src="https://avatars.githubusercontent.com/u/1043668?v=4?s=100" width="100px;" alt="Stefan Natter"/><br /><sub><b>Stefan Natter</b></sub></a><br /><a href="#ideas-natterstefan" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/natterstefan/dictcc/commits?author=natterstefan" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://sjdonado.github.io/"><img src="https://avatars.githubusercontent.com/u/27580836?v=4?s=100" width="100px;" alt="Juan Rodriguez"/><br /><sub><b>Juan Rodriguez</b></sub></a><br /><a href="https://github.com/natterstefan/dictcc/commits?author=sjdonado" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!
