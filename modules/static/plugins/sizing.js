import joinPrefixedValue from '../../utils/joinPrefixedValue'

const properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
}
const values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
}

export default function sizing(property, value) {
  if (properties[property] && values[value]) {
    return joinPrefixedValue(property, value)
  }
}
