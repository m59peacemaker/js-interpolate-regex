# interpolate-regex

Function that takes a left and right delimiter and returns a regex object to match.

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
- `matchEmpty: boolean, false` match when there is nothing in between delimiters
