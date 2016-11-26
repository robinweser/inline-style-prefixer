export function sortPrefixedStyle(style) {
  return Object.keys(style).sort((left, right) => {
    if (isPrefixed(left) && !isPrefixed(right)) {
      return -1
    } else if (!isPrefixed(left) && isPrefixed(right)) {
      return 1
    }
    return 0
  }).reduce((sortedStyle, prop) => {
    sortedStyle[prop] = style[prop]
    return sortedStyle
  }, { })
}
