import { isPrefixedValue } from 'css-in-js-utils'

const FILTER_REGEX = /filter\(/g
// http://caniuse.com/#feat=css-filter-function
const prefixes = ['-webkit-', '']

export default function filter(property, value) {
  if (
    typeof value === 'string' &&
    !isPrefixedValue(value) &&
    value.indexOf('filter(') !== -1
  ) {
    return prefixes.map((prefix) =>
      value.replace(FILTER_REGEX, `${prefix}filter(`)
    )
  }
}
