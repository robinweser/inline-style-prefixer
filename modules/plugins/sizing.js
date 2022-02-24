/* @flow */
import { prefixesWebkitAndMoz as prefixes } from '../utils/constants'

const properties = ['maxHeight', 'maxWidth', 'width', 'height', 'columnWidth', 'minWidth', 'minHeight']
const values = ['min-content', 'max-content', 'fill-available', 'fit-content', 'contain-floats']

export default function sizing(property: string, value: any): ?Array<any> {
  if (properties.indexOf(property) > -1 && values.indexOf(value) > -1) {
    return prefixes.map((prefix) => prefix + value)
  }
}
