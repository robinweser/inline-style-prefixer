import joinPrefixedRules from '../../utils/joinPrefixedRules'

const values = {
  'zoom-in': true,
  'zoom-out': true,
  grab: true,
  grabbing: true
}

export default function cursor(property, value) {
  if (property === 'cursor' && values[value]) {
    return joinPrefixedRules(property, value)
  }
}
