/* @flow */
import getPrefixedValue from '../../utils/getPrefixedValue'

import type { PluginMetaData } from '../../../flowtypes/PluginMetaData'

const alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple',
  flex: 'box',
  'inline-flex': 'inline-box',
}

const alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines',
}

const otherProps = [
  'alignContent',
  'alignSelf',
  'order',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'flexDirection',
]
const properties = Object.keys(alternativeProps).concat(otherProps)

export default function flexboxOld(
  property: string,
  value: any,
  style: Object,
  {
    browserName,
    browserVersion,
    cssPrefix,
    keepUnprefixed,
    requiresPrefix,
  }: PluginMetaData
): ?Array<any> | ?any {
  if (
    (properties.indexOf(property) > -1 ||
      (property === 'display' &&
        typeof value === 'string' &&
        value.indexOf('flex') > -1)) &&
    ((browserName === 'firefox' && browserVersion < 22) ||
      (browserName === 'chrome' && browserVersion < 21) ||
      ((browserName === 'safari' || browserName === 'ios_saf') &&
        browserVersion <= 6.1) ||
      (browserName === 'android' && browserVersion < 4.4) ||
      browserName === 'and_uc')
  ) {
    delete requiresPrefix[property]

    if (!keepUnprefixed && !Array.isArray(style[property])) {
      delete style[property]
    }
    if (property === 'flexDirection' && typeof value === 'string') {
      if (value.indexOf('column') > -1) {
        style.WebkitBoxOrient = 'vertical'
      } else {
        style.WebkitBoxOrient = 'horizontal'
      }
      if (value.indexOf('reverse') > -1) {
        style.WebkitBoxDirection = 'reverse'
      } else {
        style.WebkitBoxDirection = 'normal'
      }
    }
    if (property === 'display' && alternativeValues.hasOwnProperty(value)) {
      return getPrefixedValue(
        cssPrefix + alternativeValues[value],
        value,
        keepUnprefixed
      )
    }
    if (alternativeProps.hasOwnProperty(property)) {
      style[alternativeProps[property]] = alternativeValues[value] || value
    }
  }
}
