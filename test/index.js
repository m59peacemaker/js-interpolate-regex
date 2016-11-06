const test = require('tape')
const Regex = require('../')

test('matches with {{ }}', t => {
  const regex = Regex('{{', '}}')
  t.equal('{{foo}}'.replace(regex, 'abc'), 'abc')
  t.equal('A {{foo}} bee {{foo}}.'.replace(regex, 'abc'), 'A abc bee abc.')
  t.equal(
    'a{ { b { c d{ {} {{foo}} { {foo} {{'.replace(regex, '  abc  '),
    'a{ { b { c d{ {}   abc   { {foo} {{'
  )
  t.equal(
    `
      A {{foo}}

      B {{bar}}
    `.replace(regex, 'abc'),
    `
      A abc

      B abc
    `
  )
  t.end()
})

test('matches with ( )', t => {
  const regex = Regex('(', ')')
  t.equal('(foo)'.replace(regex, 'abc'), 'abc')
  t.equal('A (foo) bee (foo).'.replace(regex, 'abc'), 'A abc bee abc.')
  t.end()
})

test('matches with ${ }', t => {
  const regex = Regex('${', '}')
  t.equal('${foo}'.replace(regex, 'abc'), 'abc')
  t.equal('A ${foo} bee ${foo}.'.replace(regex, 'abc'), 'A abc bee abc.')
  t.equal(
    'a$ $ b $ c d$ {} $${foo} $ {foo} ${'.replace(regex, '  abc '),
    'a$ $ b $ c d$ {} $  abc  $ {foo} ${'
  )
  t.end()
})

test('matches with ^[ ]', t => {
  const regex = Regex('^[', ']')
  t.equal('^[foo]'.replace(regex, 'abc'), 'abc')
  t.equal('A ^[foo] bee ^[foo].'.replace(regex, 'abc'), 'A abc bee abc.')
  t.equal(
    'a^ ^ b ^ c d^ [] ^^[foo] ^ [foo] ^['.replace(regex, '  abc '),
    'a^ ^ b ^ c d^ [] ^  abc  ^ [foo] ^['
  )
  t.end()
})

test('does not match empty by default', t => {
  const regex = Regex('{{', '}}')
  t.equal('{{}}'.replace(regex, 'abc'), '{{}}')
  t.end()
})

test('matches empty when matchEmpty = true', t => {
  const regex = Regex('{{', '}}', true)
  t.equal('{{}}'.replace(regex, 'abc'), 'abc')
  t.end()
})

test('empty placeholder captures empty string as contents', t => {
  const regex = Regex('{{', '}}', true)
  t.equal('{{}}'.replace(regex, (_, contents) => contents), '')
  t.end()
})

test('captures placeholder contents', t => {
  const regex = Regex('((', '))')
  let c
  'abc ((foo)).'.replace(regex, (_, contents) => {
    c = contents
    return ''
  })
  t.equal(c, 'foo')
  t.end()
})

test('README example', t => {
  const data = {place: 'world'}
  const result = 'Hello, {{place}}'.replace(Regex('{{', '}}'), (_, contents) => {
    console.log(contents) // -> 'place'
    return data[contents] // -> 'world'
  }) // -> 'Hello, world'
  t.equal(result, 'Hello, world')
  t.end()
})
