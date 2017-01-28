/* @flow */
import getPrefixedValue from '../../utils/getPrefixedValue'

import type { PluginMetaData } from '../../../flowtypes/PluginMetaData'

const values = {
  'zoom-in': true,
  'zoom-out': true
}

export default function zoomCursor(
  property: string,
  value: any,
  style: Object,
  { browserName, browserVersion, cssPrefix, keepUnprefixed }: PluginMetaData
): ?Array<any> | ?any {
  if (
    property === 'cursor' &&
      values[value] &&
      (browserName === 'firefox' && browserVersion < 24 ||
        browserName === 'chrome' && browserVersion < 37 ||
        browserName === 'safari' && browserVersion < 9 ||
        browserName === 'opera' && browserVersion < 24)
  ) {
    return getPrefixedValue(cssPrefix + value, value, keepUnprefixed)
  }
}
