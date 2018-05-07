/* @flow */
import getPrefixedValue from '../../utils/getPrefixedValue'

import type { PluginMetaData } from '../../../flowtypes/PluginMetaData'

const properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true,
}
const values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true,
}

// TODO: chrome & opera support it
export default function sizing(
  property: string,
  value: any,
  style: Object,
  { cssPrefix, keepUnprefixed }: PluginMetaData
): ?Array<any> | ?any {
  // This might change in the future
  // Keep an eye on it
  if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
    return getPrefixedValue(cssPrefix + value, value, keepUnprefixed)
  }
}
