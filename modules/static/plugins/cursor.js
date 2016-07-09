import joinPrefixedValue from '../../utils/joinPrefixedValue'

const values = {
  'zoom-in': true,
  'zoom-out': true,
  grab: true,
  grabbing: true
}

export default function cursor(property, value) {
  if (property === 'cursor' && values[value]) {
    return joinPrefixedValue(property, value)
  }
}
