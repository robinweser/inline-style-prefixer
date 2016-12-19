const prefixes = [ '-webkit-', '-moz-', '' ]

const values = {
  'zoom-in': true,
  'zoom-out': true,
  grab: true,
  grabbing: true
}

export default function cursor(property, value) {
  if (property === 'cursor' && values[value]) {
    return prefixes.map(prefix => prefix + value)
  }
}
