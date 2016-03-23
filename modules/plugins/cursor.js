import camelToDashCase from '../utils/camelToDashCase'

const values = {
  'zoom-in': true,
  'zoom-out': true,
  'grab': true,
  'grabbing': true
}

export default function cursor({ property, value, browserInfo: { browser, version }, prefix: { css }, keepUnprefixed }) {
  if (
    property === 'cursor' && values[value] &&
    (
    browser === 'firefox' && version < 24 ||
    browser === 'chrome' && version < 37 ||
    browser === 'safari' && version < 9 ||
    browser === 'opera' && version < 24
    )
  ) {
    return {
      cursor: css + value + (keepUnprefixed ? ';' + camelToDashCase(property) + ':' + value : '')
    }
  }
}
