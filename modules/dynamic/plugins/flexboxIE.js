/* @flow */
import getPrefixedValue from '../../utils/getPrefixedValue'

import type { PluginMetaData } from '../../../flowtypes/PluginMetaData'

const alternativeValues = {
  'space-around': 'distribute',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  flex: 'flexbox',
  'inline-flex': 'inline-flexbox'
}
const alternativeProps = {
  alignContent: 'msFlexLinePack',
  alignSelf: 'msFlexItemAlign',
  alignItems: 'msFlexAlign',
  justifyContent: 'msFlexPack',
  order: 'msFlexOrder',
  flexGrow: 'msFlexPositive',
  flexShrink: 'msFlexNegative',
  flexBasis: 'msPreferredSize'
}

export default function flexboxIE(
  property: string,
  value: any,
  style: Object,
  { browserName, browserVersion, cssPrefix, keepUnprefixed }: PluginMetaData
): ?Array<any> | ?any {
  if (
    (alternativeProps[property] ||
      property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) &&
      ((browserName === 'ie_mob' || browserName === 'ie') && browserVersion === 10)
  ) {
    if (!keepUnprefixed && !Array.isArray(style[property])) {
      delete style[property]
    }
    if (property === 'display' && alternativeValues[value]) {
      return getPrefixedValue(cssPrefix + alternativeValues[value], value, keepUnprefixed)
    }
    if (alternativeProps[property]) {
      style[alternativeProps[property]] = alternativeValues[value] || value
    }
  }
}
