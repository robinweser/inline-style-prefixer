/* @flow */
const prefixes = ['-webkit-', '-moz-', '']

const properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true,
}
const values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true,
}

export default function sizing(property: string, value: any): ?Array<any> {
  if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
    return prefixes.map(prefix => prefix + value)
  }
}
