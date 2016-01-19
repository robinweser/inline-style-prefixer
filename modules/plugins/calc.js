export default function calc(pluginInterface) {
  const { property, value, browserInfo, prefix, keepUnprefixed, forceRun } = pluginInterface
  const { browser, version } = browserInfo

  if (
    typeof value === 'string' && value.indexOf('calc(') > -1 &&
    (
    forceRun ||
    browser === 'firefox' && version < 15 ||
    browser === 'chrome' && version < 25 ||
    browser === 'safari' && version < 6.1 ||
    browser === 'ios_saf' && version < 7
    )
  ) {
    let newValue = forceRun ?
      // prefix all
      [ '-webkit-', '-moz-' ].map(prefix => value.replace(/calc\(/g, prefix + 'calc(')).join(';' + property + ':') :
      // default
      value.replace(/calc\(/g, prefix.css + 'calc(')
    return {
      [property]: newValue + (keepUnprefixed ? ';' + property + ':' + value : '')
    }
  }
}
