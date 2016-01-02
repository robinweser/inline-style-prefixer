const properties = ['maxHeight', 'maxWidth', 'width', 'height', 'columnWidth', 'minWidth', 'minHeight']
const values = ['min-content', 'max-content', 'fill-available', 'fit-content', 'contain-floats']

export default (property, value, {prefix}, styles, keepDefaults, forceRun) => {
  /**
   * This actually is only available with prefixes
   * NOTE: This might change in the future
   */
  if (properties.indexOf(property) > -1 && values.indexOf(value) > -1) {
    return {
      [ property]: prefix.CSS + value + (keepDefaults ? ';' + property + ':' + value : '')
    }
  }
}
