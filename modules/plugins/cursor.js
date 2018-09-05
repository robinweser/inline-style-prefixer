/* @flow */
const prefixes = ['-webkit-', '-moz-', '']

const values = {
  'zoom-in': true,
  'zoom-out': true,
  grab: true,
  grabbing: true,
}

export default function cursor(property: string, value: any): ?Array<string> {
  if (property === 'cursor' && values.hasOwnProperty(value)) {
    return prefixes.map(prefix => prefix + value)
  }
}
