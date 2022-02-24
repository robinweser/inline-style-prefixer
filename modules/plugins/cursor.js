/* @flow */
import { prefixesWebkitAndMoz as prefixes } from '../utils/constants'

const values = ['zoom-in', 'zoom-out', 'grab', 'grabbing']

export default function cursor(property: string, value: any): ?Array<string> {
  if (property === 'cursor' && values.indexOf(value) > -1) {
    return prefixes.map((prefix) => prefix + value)
  }
}
