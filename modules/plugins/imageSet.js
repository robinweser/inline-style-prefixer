/* @flow */
import isPrefixedValue from 'css-in-js-utils/lib/isPrefixedValue'

// http://caniuse.com/#feat=css-image-set
const prefixes = ['-webkit-', '']

export default function imageSet(property: string, value: any): ?Array<string> {
  if (
    typeof value === 'string' &&
    !isPrefixedValue(value) &&
    value.indexOf('image-set(') > -1
  ) {
    return prefixes.map(prefix =>
      value.replace(/image-set\(/g, `${prefix}image-set(`)
    )
  }
}
