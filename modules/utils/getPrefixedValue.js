/* @flow */
export default function getPrefixedValue(
  prefixedValue: any,
  value: any,
  keepUnprefixed: boolean
): Array<any> | any {
  if (keepUnprefixed) {
    return [prefixedValue, value]
  }
  return prefixedValue
}
