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

const properties = Object.keys(alternativeProps).reduce((result, prop) => {
  result[prop] = true
  return result
}, { })

export default function flexboxIE({ property, value, styles, browserInfo: { browser, version }, prefix: { css }, keepUnprefixed }) {
  if (
    (properties[property] || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) &&
    (
    (browser === 'ie_mob' || browser === 'ie') && version == 10)
  ) {
    if (!keepUnprefixed) {
      delete styles[property]
    }
    if (property === 'display' && alternativeValues[value]) {
      const prefixedValue = css + alternativeValues[value]
      return {
        display: keepUnprefixed ? [ prefixedValue, value ] : prefixedValue
      }
    }
    if (alternativeProps[property]) {
      return {
        [alternativeProps[property]]: alternativeValues[value] || value
      }
    }
  }
}
