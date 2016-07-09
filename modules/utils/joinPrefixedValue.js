// returns a style object with a single concated prefixed value string
export default (property, value, replacer = (prefix, value) => prefix + value) => ({
  [property]: [ '-webkit-', '-moz-', '' ].map(prefix => replacer(prefix, value))
})
