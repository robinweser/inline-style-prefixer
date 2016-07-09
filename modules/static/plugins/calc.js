import joinPrefixedValue from '../../utils/joinPrefixedValue'
import isPrefixedValue from '../../utils/isPrefixedValue'

export default function calc(property, value) {
  if (typeof value === 'string' && !isPrefixedValue(value) && value.indexOf('calc(') > -1) {
    return joinPrefixedValue(property, value, (prefix, value) => value.replace(/calc\(/g, prefix + 'calc('))
  }
}
