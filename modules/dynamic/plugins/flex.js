/* @flow */
import getPrefixedValue from '../../utils/getPrefixedValue'

import type { PluginMetaData } from '../../../flowtypes/PluginMetaData'

const values = {
  flex: true,
  'inline-flex': true,
}

export default function flex(
  property: string,
  value: any,
  style: ?Object,
  { browserName, browserVersion, cssPrefix, keepUnprefixed }: PluginMetaData
): ?Array<any> | ?any {
  if (
    property === 'display' &&
    values[value] &&
    ((browserName === 'chrome' &&
      (browserVersion < 29 && browserVersion > 20)) ||
      ((browserName === 'safari' || browserName === 'ios_saf') &&
        (browserVersion < 9 && browserVersion > 6)) ||
      (browserName === 'opera' &&
        (browserVersion === 15 || browserVersion === 16)))
  ) {
    return getPrefixedValue(cssPrefix + value, value, keepUnprefixed)
  }
}
