const properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
}
const values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
}

export default function sizing(pluginInterface) {
  const { property, value, browserInfo, prefix, keepUnprefixed, forceRun } = pluginInterface
  const { browser, version } = browserInfo

  // This might change in the future
  // Keep an eye on it
  if (properties[property] && values[value]) {
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
