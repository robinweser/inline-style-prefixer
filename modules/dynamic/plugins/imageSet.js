/* @flow */
import getPrefixedValue from '../../utils/getPrefixedValue'

import type { PluginMetaData } from '../../../flowtypes/PluginMetaData'

export default function imageSet(
  property: string,
  value: any,
  style: Object,
  { browserName, cssPrefix, keepUnprefixed }: PluginMetaData
): ?Array<any> | ?any {
  if (
    typeof value === 'string' &&
    value.indexOf('image-set(') > -1 &&
    (browserName === 'chrome' ||
      browserName === 'opera' ||
      browserName === 'and_chr' ||
      browserName === 'and_uc' ||
      browserName === 'ios_saf' ||
      browserName === 'safari')
  ) {
    return getPrefixedValue(
      value.replace(/image-set\(/g, `${cssPrefix}image-set(`),
      value,
      keepUnprefixed
    )
  }
}
