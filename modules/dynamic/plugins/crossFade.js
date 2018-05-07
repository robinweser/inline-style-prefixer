/* @flow */
import getPrefixedValue from '../../utils/getPrefixedValue'

import type { PluginMetaData } from '../../../flowtypes/PluginMetaData'

export default function crossFade(
  property: string,
  value: any,
  style: Object,
  { browserName, browserVersion, cssPrefix, keepUnprefixed }: PluginMetaData
): ?Array<any> | ?any {
  if (
    typeof value === 'string' &&
    value.indexOf('cross-fade(') > -1 &&
    (browserName === 'chrome' ||
      browserName === 'opera' ||
      browserName === 'and_chr' ||
      ((browserName === 'ios_saf' || browserName === 'safari') &&
        browserVersion < 10))
  ) {
    return getPrefixedValue(
      value.replace(/cross-fade\(/g, `${cssPrefix}cross-fade(`),
      value,
      keepUnprefixed
    )
  }
}
