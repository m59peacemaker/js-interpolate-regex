var esc = require('escape-string-regexp')

var Regex = function (left, right, matchEmpty) {
  matchEmpty = matchEmpty === false ? false : true
  var _ = matchEmpty ? '*' : '+'
  var l = esc(left)
  var r = esc(right)
  var start = '(?:' + l + ')'
  var middle = '(.' + _ + '?)'
  var end = r
  return new RegExp(start + middle + end, 'g')
  // return new RegExp(`(?:${l})(.${_}?)${r}`, 'g')
}

module.exports = Regex
