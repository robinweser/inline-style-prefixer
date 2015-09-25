function condition(browserInfo) {
  /**
   * This actually is only available with prefixes
   * NOTE: This might change in the feature
   */
  return true
}

export default function hack(browserInfo) {
  if (condition(browserInfo)) {

    let sizingValues = ['min-content', 'max-content', 'fill-available', 'fit-content']
    let containFloats = Array(...sizingValues)
    containFloats.push('contain-floats')

    return {
      prefixValue: {
        columnWidth: sizingValues,
        maxHeight: sizingValues,
        maxWidth: sizingValues,
        width: sizingValues,
        height: sizingValues,
        minWidth: containFloats,
        minHeight: containFloats
      }
    }
  } else {
    return false
  }
}
