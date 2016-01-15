export default function calc(pluginInterface) {
  const {property, value, browserInfo, prefix, keepUnprefixed, forceRun} = pluginInterface
  const {browser, version} = browserInfo

  if (
    value.indexOf('calc(') > -1 &&
    (
    forceRun ||
    browser === 'firefox' && version < 15 ||
    browser === 'chrome' && version < 25 ||
    browser === 'safari' && version < 6.1 ||
    browser === 'ios_saf' && version < 7
    )
  ) {
    return {
      [property]: value.replace(/calc\(/g, prefix.css + 'calc(') + (keepUnprefixed ? ';' + property + ':' + value : '')
    }
  }
}
