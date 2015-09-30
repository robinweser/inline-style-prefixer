const alternativeValues = {
  'space-around': 'distribute',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'flex': '-ms-flexbox',
  'inline-flex': '-ms-inline-flexbox'
}

const alternativeProps = {
  'alignContent': 'msFlexLinePack',
  'alignSelf': 'msFlexItemAlign',
  'alignItems': 'msFlexAlign',
  'justifyContent': 'msFlexPack',
  'order': 'msFlexOrder',
  'flexGrow': 'msFlexPositive',
  'flexShrink': 'msFlexNegative',
  'flexBasis': 'msPreferredSize'
}

const properties = Object.keys(alternativeProps).concat('display')

export default (property, value, {browser, version} , styles) => {
  if (properties.indexOf(property) > -1 && (browser === 'ie_mob' || browser === 'ie') && version == 10) {
    delete styles[property]
    return {
      [alternativeProps[property] || property]: alternativeValues[value] || value
    }
  }
}