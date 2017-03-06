import capitalizeString from './capitalizeString'

/* @flow */
export default function prefixProperty(
  prefixProperties: Object,
  property: string,
  style: Object
): Object {
  if (!prefixProperties.hasOwnProperty(property)) {
    return style
  }

  // We need to preserve the order of the styles while inserting new prefixed
  // styles. Object order is not guaranteed, but this is better than nothing.
  // Note that this is brittle and is likely to break in older versions of
  // Node (e.g. Node 4).
  const newStyle = {}
  Object.keys(style).forEach((styleProperty) => {
    if (styleProperty === property) {
      // We've found the style we need to prefix.
      const requiredPrefixes = prefixProperties[property]
      for (let i = 0, len = requiredPrefixes.length; i < len; ++i) {
        newStyle[requiredPrefixes[i] + capitalizeString(property)] = style[property]
      }
    }

    newStyle[styleProperty] = style[styleProperty]
  })

  return newStyle
}
