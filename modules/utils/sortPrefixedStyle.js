import isPrefixedProperty from './isPrefixedProperty'

export default function sortPrefixedStyle(style) {
  const sortedKeys = Object.keys(style).sort((left, right) => {
    if (isPrefixedProperty(left) && !isPrefixedProperty(right)) {
      return -1
    } else if (!isPrefixedProperty(left) && isPrefixedProperty(right)) {
      return 1
    }
    return 0
  })

  const sortedStyle = { }

  for (let i = 0, len = sortedKeys.length; i < len; ++i) {
    sortedStyle[sortedKeys[i]] = style[sortedKeys[i]]
  }

  return sortedStyle
}
