/* @flow */
export default function position(property: string, value: any): ?Array<string> {
  if (property === 'position' && value === 'sticky') {
    return ['-webkit-sticky', 'sticky']
  }
}
