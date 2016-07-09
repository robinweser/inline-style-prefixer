import getPrefixedValue from '../utils/getPrefixedValue'

const values = { flex: true, 'inline-flex': true }

export default function flex({ property, value, browserInfo: { browser, version }, prefix: { css }, keepUnprefixed }) {
  if (
    property === 'display' && values[value] &&
    (
    browser === 'chrome' && (version < 29 && version > 20) ||
    (browser === 'safari' || browser === 'ios_saf') && (version < 9 && version > 6) ||
    browser === 'opera' && (version == 15 || version == 16)
    )
  ) {
    return {
      display: getPrefixedValue(css + value, value, keepUnprefixed)
    }
  }
}
