/* @flow */
// https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip#Browser_compatibility
export default function backgroundClip(
  property: string,
  value: any
): ?Array<string> {
  if (typeof value === 'string' && value === 'text') {
    return ['-webkit-text', 'text']
  }
}
