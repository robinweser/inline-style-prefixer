import isPrefixedValue from '../../utils/isPrefixedValue'
const prefixes = [ '-webkit-', '-moz-', '' ]

export default function calc(property, value) {
  if (typeof value === 'string' && !isPrefixedValue(value) && value.indexOf('calc(') > -1) {
    return prefixes.map(prefix => value.replace(/calc\(/g, prefix + 'calc('))
  }
}
