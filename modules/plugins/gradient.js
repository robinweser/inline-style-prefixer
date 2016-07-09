import getPrefixedValue from '../utils/getPrefixedValue'

const values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/

export default function gradient({ property, value, browserInfo: { browser, version }, prefix: { css }, keepUnprefixed }) {
  if (
    typeof value === 'string' && value.match(values) !== null &&
    (
    browser === 'firefox' && version < 16 ||
    browser === 'chrome' && version < 26 ||
    (browser === 'safari' || browser === 'ios_saf') && version < 7 ||
    (browser === 'opera' || browser === 'op_mini') && version < 12.1 ||
    browser === 'android' && version < 4.4 ||
    browser === 'and_uc'
    )
  ) {
    return {
      [property]: getPrefixedValue(css + value, value, keepUnprefixed)
    }
  }
}
