/* @flow */

const regex = /-webkit-|-moz-|-ms-/
export default function isPrefixedValue(value: any): boolean {
  if (Array.isArray(value)) {
    value = value.join(',')
  }

  return value.match(regex) !== null
}
