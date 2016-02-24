const alternativeValues = {
  'space-around': 'distribute',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  flex: '-ms-flexbox',
  'inline-flex': '-ms-inline-flexbox'
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

export default function flexboxIE(pluginInterface) {
  const { property, value, styles, browserInfo, prefix, keepUnprefixed, forceRun } = pluginInterface
  const { browser, version } = browserInfo

  if (
    (properties[property] || property === 'display' && value.indexOf('flex') > -1) &&
    (
    forceRun ||
    (browser === 'ie_mob' || browser === 'ie') && version == 10)
  ) {
    if (!keepUnprefixed) {
      delete styles[property]
    }

    if (alternativeProps[property]) {
      return {
        [alternativeProps[property]]: alternativeValues[value] || value
      }
    }
    if (alternativeValues[value]) {
      return {
        [property]: alternativeValues[value] + (keepUnprefixed ? ';' + property + ':' + value : '')
      }
    }
  }
}
