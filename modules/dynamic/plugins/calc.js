/* @flow */
import getPrefixedValue from '../../utils/getPrefixedValue'

import type { PluginMetaData } from '../../../flowtypes/PluginMetaData'

export default function calc(
  property: string,
  value: any,
  style: Object,
  { browserName, browserVersion, cssPrefix, keepUnprefixed }: PluginMetaData
): ?Array<any> | ?any {
  if (
    typeof value === 'string' &&
    value.indexOf('calc(') > -1 &&
    ((browserName === 'firefox' && browserVersion < 15) ||
      (browserName === 'chrome' && browserVersion < 25) ||
      (browserName === 'safari' && browserVersion < 6.1) ||
      (browserName === 'ios_saf' && browserVersion < 7))
  ) {
    return getPrefixedValue(
      value.replace(/calc\(/g, `${cssPrefix}calc(`),
      value,
      keepUnprefixed
    )
  }
}
