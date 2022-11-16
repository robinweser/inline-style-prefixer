import { isPrefixedValue } from 'css-in-js-utils'

const CROSS_FADE_REGEX = /cross-fade\(/g
// http://caniuse.com/#search=cross-fade
const prefixes = ['-webkit-', '']

export default function crossFade(property, value) {
  if (
    typeof value === 'string' &&
    !isPrefixedValue(value) &&
    value.indexOf('cross-fade(') !== -1
  ) {
    return prefixes.map((prefix) =>
      value.replace(CROSS_FADE_REGEX, `${prefix}cross-fade(`)
    )
  }
}
