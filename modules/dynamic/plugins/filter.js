/* @flow */
import getPrefixedValue from '../../utils/getPrefixedValue'

import type { PluginMetaData } from '../../../flowtypes/PluginMetaData'

export default function filter(
  property: string,
  value: any,
  style: Object,
  { browserName, browserVersion, cssPrefix, keepUnprefixed }: PluginMetaData
): ?Array<any> | ?any {
  if (
    typeof value === 'string' &&
    value.indexOf('filter(') > -1 &&
    (browserName === 'ios_saf' ||
      (browserName === 'safari' && browserVersion < 9.1))
  ) {
    return getPrefixedValue(
      value.replace(/filter\(/g, `${cssPrefix}filter(`),
      value,
      keepUnprefixed
    )
  }
}
