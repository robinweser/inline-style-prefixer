const values = {
  'zoom-in': true,
  'zoom-out': true,
  grab: true,
  grabbing: true
}

export default function cursor(pluginInterface) {
  const {property, value, browserInfo, prefix, keepUnprefixed, forceRun} = pluginInterface
  const {browser, version} = browserInfo

  if (
    property === 'cursor' && values[value] &&
    (
    forceRun ||
    browser === 'firefox' && version < 24 ||
    browser === 'chrome' && version < 37 ||
    browser === 'safari' && version < 9 ||
    browser === 'opera' && version < 24
    )
  ) {
    return {
      cursor: prefix.css + value + (keepUnprefixed ? ';' + property + ':' + value : '')
    }
  }
}
