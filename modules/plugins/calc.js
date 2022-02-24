/* @flow */
import isPrefixedValue from 'css-in-js-utils/lib/isPrefixedValue'
import { prefixesWebkitAndMoz as prefixes } from '../utils/constants'

export default function calc(property: string, value: any): ?Array<string> {
  if (
    typeof value === 'string' &&
    !isPrefixedValue(value) &&
    value.indexOf('calc(') > -1
  ) {
    return prefixes.map((prefix) => value.replace(/calc\(/g, `${prefix}calc(`))
  }
}
