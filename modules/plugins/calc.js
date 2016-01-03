export default (property, value, {browser, version, prefix} , styles, keepUnprefixed, forceRun) => {
  if (value.indexOf('calc(') > -1 && (forceRun || browser === 'firefox' && version < 15 || browser === 'chrome' && version < 25 || browser === 'safari' && version < 6.1 || browser === 'ios_saf' && version < 7)) {
    return {
      [property]: value.replace(/calc\(/g, prefix.CSS + 'calc(') + (keepUnprefixed ? ';' + property + ':' + value : '')
    }
  }
}
