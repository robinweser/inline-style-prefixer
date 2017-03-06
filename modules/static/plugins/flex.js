/* @flow */
const values = {
  flex: true,
  'inline-flex': true
}

export default function flex(property: string, value: any): ?Array<string> {
  if (property === 'display' && values.hasOwnProperty(value)) {
    return ['-webkit-box', '-moz-box', `-ms-${value}box`, `-webkit-${value}`, value]
  }
}
