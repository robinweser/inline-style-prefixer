import capitalizeString from './capitalizeString'

/* @flow */
export default function prefixProperty(
  prefixProperties: Object,
  property: string,
  style: Object
): void {
  if (prefixProperties.hasOwnProperty(property)) {
    const requiredPrefixes = prefixProperties[property]
    for (let i = 0, len = requiredPrefixes.length; i < len; ++i) {
      style[requiredPrefixes[i] + capitalizeString(property)] = style[property]
    }
  }
}
