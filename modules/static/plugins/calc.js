import joinPrefixedRules from '../../utils/joinPrefixedRules'
import isPrefixedValue from '../../utils/isPrefixedValue'

export default function calc(property, value) {
  if (typeof value === 'string' && value.indexOf('calc(') > -1) {
    if (isPrefixedValue(value)) {
      return
    }

    return joinPrefixedRules(property, value, (prefix, value) => value.replace(/calc\(/g, prefix + 'calc('))
  }
}
