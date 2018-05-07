/* @flow */
import getPrefixedValue from '../../utils/getPrefixedValue'

import type { PluginMetaData } from '../../../flowtypes/PluginMetaData'

const values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/gi

export default function gradient(
  property: string,
  value: any,
  style: Object,
  { browserName, browserVersion, cssPrefix, keepUnprefixed }: PluginMetaData
): ?Array<any> | ?any {
  if (
    typeof value === 'string' &&
    values.test(value) &&
    ((browserName === 'firefox' && browserVersion < 16) ||
      (browserName === 'chrome' && browserVersion < 26) ||
      ((browserName === 'safari' || browserName === 'ios_saf') &&
        browserVersion < 7) ||
      ((browserName === 'opera' || browserName === 'op_mini') &&
        browserVersion < 12.1) ||
      (browserName === 'android' && browserVersion < 4.4) ||
      browserName === 'and_uc')
  ) {
    return getPrefixedValue(
      value.replace(values, grad => cssPrefix + grad),
      value,
      keepUnprefixed
    )
  }
}
