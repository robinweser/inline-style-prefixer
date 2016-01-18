const values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/

export default function gradient(pluginInterface) {
  const { property, value, browserInfo, prefix, keepUnprefixed, forceRun } = pluginInterface
  const { browser, version } = browserInfo

  if (
    typeof value === 'string' && value.match(values) !== null &&
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
    let newValue = forceRun ?
      // prefix all
      [ '-webkit-', '-moz-' ].map(prefix => prefix + value).join(';' + property + ':') :
      // default
      prefix.css + value
    return {
      [property]: newValue + (keepUnprefixed ? ';' + property + ':' + value : '')
    }
  }
}
