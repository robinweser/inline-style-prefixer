import getPrefixedValue from '../utils/getPrefixedValue'

export default function position({ property, value, browserInfo: { browser }, prefix: { css }, keepUnprefixed }) {
  if (
    property === 'position' && value === 'sticky' &&
    (
    browser === 'safari' ||
    browser === 'ios_saf'
    )
  ) {
    return {
      [property]: getPrefixedValue(css + value, value, keepUnprefixed)
    }
  }
}
