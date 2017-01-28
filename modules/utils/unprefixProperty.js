/* @flow */
import isPrefixedProperty from './isPrefixedProperty'

const regex = /^(Webkit|Moz|O|ms)/
export default function unprefixProperty(property: string): string {
  if (isPrefixedProperty(property)) {
    const unprefixed = property.replace(regex, '')
    return unprefixed.charAt(0).toLowerCase() + unprefixed.slice(1)
  }
  return property
}
