# textlint-plugin-xliff

XLIFF support for [textlint](https://github.com/textlint/textlint "textlint").

## 💥ATTENTION

**This project is of very low priority. Do not expect maintenance.**

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Supported extensions

- `.xlf`

## Installation

**There are currently no plans to release it in npm registry.**

Please use the pre-built archive from the release.

## Usage

```json
{
  "plugins": {
    "xliff": true
  }
}
```

## Running Tests

To run tests, run the following command:

```bash
npm test
```

## FAQ

#### Can't handle gettext(.po)?

**No.** But you can convert it with tools.

See also: [Translate Toolkit](https://toolkit.translatehouse.org/)

## Authors

- [Minoru Maekawa](https://github.com/err931)

## Acknowledgements

- Linter and formatter, powered by [Deno](https://deno.land/)
- This code is based on [@textlint/textlint-plugin-markdown](https://github.com/textlint/textlint/tree/master/packages/@textlint/textlint-plugin-markdown)
- Have a good day! 🥂
