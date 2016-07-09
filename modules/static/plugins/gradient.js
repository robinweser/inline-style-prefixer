import joinPrefixedValue from '../../utils/joinPrefixedValue'
import isPrefixedValue from '../../utils/isPrefixedValue'

const values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/

export default function gradient(property, value) {
  if (typeof value === 'string' && !isPrefixedValue(value) && value.match(values) !== null) {
    return joinPrefixedValue(property, value)
  }
}
