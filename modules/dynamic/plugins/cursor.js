/* @flow */
import getPrefixedValue from '../../utils/getPrefixedValue'

import type { PluginMetaData } from '../../../flowtypes/PluginMetaData'

const grabValues = {
  grab: true,
  grabbing: true,
}

const zoomValues = {
  'zoom-in': true,
  'zoom-out': true,
}

export default function cursor(
  property: string,
  value: any,
  style: Object,
  { browserName, browserVersion, cssPrefix, keepUnprefixed }: PluginMetaData
): ?Array<any> | ?any {
  // adds prefixes for firefox, chrome, safari, and opera regardless of
  // version until a reliable browser support info can be found
  // see: https://github.com/rofrischmann/inline-style-prefixer/issues/79
  if (
    property === 'cursor' &&
    grabValues[value] &&
    (browserName === 'firefox' ||
      browserName === 'chrome' ||
      browserName === 'safari' ||
      browserName === 'opera')
  ) {
    return getPrefixedValue(cssPrefix + value, value, keepUnprefixed)
  }

  if (
    property === 'cursor' &&
    zoomValues[value] &&
    ((browserName === 'firefox' && browserVersion < 24) ||
      (browserName === 'chrome' && browserVersion < 37) ||
      (browserName === 'safari' && browserVersion < 9) ||
      (browserName === 'opera' && browserVersion < 24))
  ) {
    return getPrefixedValue(cssPrefix + value, value, keepUnprefixed)
  }
}
