/* @flow */
import getPrefixedValue from '../../utils/getPrefixedValue'

import type { PluginMetaData } from '../../../flowtypes/PluginMetaData'

const values = {
  grab: true,
  grabbing: true
}

export default function grabCursor(
  property: string,
  value: any,
  style: Object,
  { browserName, cssPrefix, keepUnprefixed }: PluginMetaData
): ?Array<any> | ?any {
  // adds prefixes for firefox, chrome, safari, and opera regardless of
  // version until a reliable brwoser support info can be found
  // see: https://github.com/rofrischmann/inline-style-prefixer/issues/79
  if (
    property === 'cursor' &&
      values[value] &&
      (browserName === 'firefox' ||
        browserName === 'chrome' ||
        browserName === 'safari' ||
        browserName === 'opera')
  ) {
    return getPrefixedValue(cssPrefix + value, value, keepUnprefixed)
  }
}
