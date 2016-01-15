const properties = {
  background: true,
  backgroundImage: true
}
const values = {
  'linear-gradient': true,
  'radial-gradient': true,
  'repeating-linear-gradient': true,
  'repeating-radial-gradient': true
}

export default function gradient(pluginInterface) {
  const {property, value, browserInfo, prefix, keepUnprefixed, forceRun} = pluginInterface
  const {browser, version} = browserInfo

  if (
    properties[property] && values[value] &&
    (
    forceRun ||
    browser === 'firefox' && version < 16 ||
    browser === 'chrome' && version < 26 ||
    (browser === 'safari' || browser === 'ios_saf') && version < 7 ||
    (browser === 'opera' || browser === 'op_mini') && version < 12.1 ||
    browser === 'android' && version < 4.4 ||
    browser === 'and_uc'
    )
  ) {
    return {
      [property]: prefix.css + value + (keepUnprefixed ? ';' + property + ':' + value : '')
    }
  }
}
