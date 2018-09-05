/* @flow */
import isPrefixedValue from 'css-in-js-utils/lib/isPrefixedValue'

// http://caniuse.com/#search=cross-fade
const prefixes = ['-webkit-', '']

export default function crossFade(
  property: string,
  value: any
): ?Array<string> {
  if (
    typeof value === 'string' &&
    !isPrefixedValue(value) &&
    value.indexOf('cross-fade(') > -1
  ) {
    return prefixes.map(prefix =>
      value.replace(/cross-fade\(/g, `${prefix}cross-fade(`)
    )
  }
}
