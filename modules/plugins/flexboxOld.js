import getPrefixedValue from '../utils/getPrefixedValue'

const alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple',
  flex: 'box',
  'inline-flex': 'inline-box'
}

const alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
}

const otherProps = [ 'alignContent', 'alignSelf', 'order', 'flexGrow', 'flexShrink', 'flexBasis', 'flexDirection' ]
const properties = Object.keys(alternativeProps).concat(otherProps)

export default function flexboxOld({ property, value, styles, browserInfo: { browser, version }, prefix: { css }, keepUnprefixed }) {
  if (
    (properties.indexOf(property) > -1 || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) &&
    (
    browser === 'firefox' && version < 22 ||
    browser === 'chrome' && version < 21 ||
    (browser === 'safari' || browser === 'ios_saf') && version <= 6.1 ||
    browser === 'android' && version < 4.4 ||
    browser === 'and_uc'
    )
  ) {
    if (!keepUnprefixed && !Array.isArray(styles[property])) {
      delete styles[property]
    }
    if (property === 'flexDirection' && typeof value === 'string') {
      return {
        WebkitBoxOrient: value.indexOf('column') > -1 ? 'vertical' : 'horizontal',
        WebkitBoxDirection: value.indexOf('reverse') > -1 ? 'reverse' : 'normal'
      }
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
