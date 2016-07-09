import getPrefixedValue from '../utils/getPrefixedValue'

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

export default function flexboxIE({ property, value, styles, browserInfo: { browser, version }, prefix: { css }, keepUnprefixed }) {
  if (
    (alternativeProps[property] || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) &&
    (
    (browser === 'ie_mob' || browser === 'ie') && version == 10)
  ) {
    if (!keepUnprefixed && !Array.isArray(styles[property])) {
      delete styles[property]
    }
    if (property === 'display' && alternativeValues[value]) {
      return {
        display: getPrefixedValue(css + alternativeValues[value], value, keepUnprefixed)
      }
    }
    if (alternativeProps[property]) {
      return {
        [alternativeProps[property]]: alternativeValues[value] || value
      }
    }
  }
}
