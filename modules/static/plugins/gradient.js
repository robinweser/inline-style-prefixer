import joinPrefixedRules from '../../utils/joinPrefixedRules'
import isPrefixedValue from '../../utils/isPrefixedValue'

const values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/

export default function gradient(property, value) {
  if (typeof value === 'string' && value.match(values) !== null) {
    if (isPrefixedValue(value)) {
      return
    }

    return joinPrefixedRules(property, value)
  }
}
