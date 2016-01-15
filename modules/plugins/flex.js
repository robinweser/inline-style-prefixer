const values = {
  flex: true,
  'inline-flex': true
}

export default function flex(pluginInterface) {
  const {property, value, browserInfo, prefix, keepUnprefixed, forceRun} = pluginInterface
  const {browser, version} = browserInfo

  if (
    property === 'display' && values[value] &&
    (
    forceRun ||
    browser === 'chrome' && (version < 29 && version > 20) ||
    (browser === 'safari' || browser === 'ios_saf') && (version < 9 && version > 6) ||
    browser === 'opera' && (version == 15 || version == 16)
    )
  ) {
    return {
      display: prefix.css + value + (keepUnprefixed ? ';' + property + ':' + value : '')
    }
  }
}
