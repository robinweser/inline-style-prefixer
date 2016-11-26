import isPrefixedProperty from './isPrefixedProperty'

export default function sortPrefixedStyle(style) {
  return Object.keys(style).sort((left, right) => {
    if (isPrefixedProperty(left) && !isPrefixedProperty(right)) {
      return -1
    } else if (!isPrefixedProperty(left) && isPrefixedProperty(right)) {
      return 1
    }
    return 0
  }).reduce((sortedStyle, prop) => {
    sortedStyle[prop] = style[prop]
    return sortedStyle
  }, { })
}
