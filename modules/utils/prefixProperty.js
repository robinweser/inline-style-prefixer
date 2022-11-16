import capitalizeString from './capitalizeString'

export default function prefixProperty(prefixProperties, property, style) {
  const requiredPrefixes = prefixProperties[property]

  if (requiredPrefixes && style.hasOwnProperty(property)) {
    const capitalizedProperty = capitalizeString(property)

    for (let i = 0; i < requiredPrefixes.length; ++i) {
      const prefixedProperty = requiredPrefixes[i] + capitalizedProperty

      if (!style[prefixedProperty]) {
        style[prefixedProperty] = style[property]
      }
    }

    style[property] = style[property]
  }

  return style
}
