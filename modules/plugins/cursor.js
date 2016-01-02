const values = ['zoom-in', 'zoom-out', 'grab', 'grabbing']

export default (property, value, {browser, version, prefix} ,styles, keepDefaults, forceRun) => {
  if (property === 'cursor' && values.indexOf(value) > -1 && (forceRun || browser === 'firefox' && version < 24 || browser === 'chrome' && version < 37 || browser === 'safari' && version < 9 || browser === 'opera' && version < 24)) {
    return {
      [ property]: prefix.CSS + value + (keepDefaults ? ';' + property + ':' + value : '')
    }
  }
}
