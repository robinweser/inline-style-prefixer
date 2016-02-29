import camelToDashCase from '../utils/camelToDashCase'

const values = new Set([ 'flex', 'inline-flex' ])

export default function flex({ property, value, browserInfo: { browser, version }, prefix: { css }, keepUnprefixed }) {
  if (
    property === 'display' && values.has(value) &&
    (
    browser === 'chrome' && (version < 29 && version > 20) ||
    (browser === 'safari' || browser === 'ios_saf') && (version < 9 && version > 6) ||
    browser === 'opera' && (version == 15 || version == 16)
    )
  ) {
    return {
      display: css + value + (keepUnprefixed ? ';' + camelToDashCase(property) + ':' + value : '')
    }
  }
}
