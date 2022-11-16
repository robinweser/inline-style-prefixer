import { isPrefixedValue } from 'css-in-js-utils'

const CALC_REGEX = /calc\(/g
const prefixes = ['-webkit-', '-moz-', '']

export default function calc(property, value) {
  if (
    typeof value === 'string' &&
    !isPrefixedValue(value) &&
    value.indexOf('calc(') !== -1
  ) {
    return prefixes.map((prefix) => value.replace(CALC_REGEX, `${prefix}calc(`))
  }
}
