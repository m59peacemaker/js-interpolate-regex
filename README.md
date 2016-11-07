# interpolate-regex

Useful for basic templating by interpolating values into placeholders. Takes a left and right delimiter and returns a regex object for matching them and capturing the contents.

## install

```sh
npm install interpolate-regex
```

## example

```js
const Regex = require('interpolate-regex')

const data = {place: 'world'}
'Hello, {{place}}'.replace(Regex('{{', '}}'), (_, contents) => {
  console.log(contents) // -> 'place'
  return data[contents] // -> 'world'
}) // -> 'Hello, world'
```

## API

### `Regex(left, right, matchEmpty)`

- `left: string` left delimiter
- `right: string` right delimiter
- `matchEmpty: boolean, true` match when there is nothing in between delimiters
