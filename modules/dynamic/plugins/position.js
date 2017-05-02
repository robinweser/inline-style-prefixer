/* @flow */
import getPrefixedValue from '../../utils/getPrefixedValue'

import type { PluginMetaData } from '../../../flowtypes/PluginMetaData'

export default function position(
  property: string,
  value: any,
  style: Object,
  { browserName, cssPrefix, keepUnprefixed }: PluginMetaData
): ?Array<any> | ?any {
  if (
    property === 'position' &&
    value === 'sticky' &&
    (browserName === 'safari' || browserName === 'ios_saf')
  ) {
    return getPrefixedValue(cssPrefix + value, value, keepUnprefixed)
  }
}
