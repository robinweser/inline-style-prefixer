/* @flow */

import isPrefixedValue from '../../utils/isPrefixedValue'

const prefixes = ['-webkit-', '-moz-', '']
const values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/

export default function gradient(property: string, value: any): ?Array<string> {
  if (
    typeof value === 'string' &&
      !isPrefixedValue(value) &&
      value.match(values) !== null
  ) {
    return prefixes.map(prefix => prefix + value)
  }
}
