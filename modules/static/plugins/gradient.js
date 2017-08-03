/* @flow */
import isPrefixedValue from 'css-in-js-utils/lib/isPrefixedValue'

const isDirection = /top|left|right|bottom/gi

const names = [
  'linear-gradient',
  'repeating-linear-gradient',
  'radial-gradient',
  'repeating-radial-gradient'
]

// direction to replace
const directions = {
  top: 'bottom',
  left: 'right',
  bottom: 'top',
  right: 'left'
}

const prefixes = ['-webkit-', '-moz-']
const values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/

/**
 * covert valStr into deg through full angle.
 */
function normalizeAngleUnit(valStr: string, full: number): number {
  const val = parseFloat(valStr)
  return val / full * 360
}

function wrapRange(min: number, max: number, value: number) {
  var maxLessMin = max - min;
  return ((value - min) % maxLessMin + maxLessMin) % maxLessMin + min;
}

/**
 * normalize angle value.
 */
function normalize (value: string): string {
  if (!value) {
    return value
  }
  return value
    .trim()
    .replace(/^([+-]?\d+(?:.\d+)?)grad/, function ($0, $1) {
      return `${normalizeAngleUnit($1, 400)}deg`
    })
    .replace(/^([+-]?\d+(?:.\d+)?)rad/, function ($0, $1) {
      return `${normalizeAngleUnit($1, 2 * Math.PI)}deg`
    })
    .replace(/^([+-]?\d+(?:.\d+)?)turn/, function ($0, $1) {
      return `${normalizeAngleUnit($1, 1)}deg`
    })
    .replace(/^([+-]?\d+(?:.\d+)?)deg/, function ($0, $1) {
      let val = `${wrapRange(0, 360, parseFloat($1))}deg`
      switch (val) {
        case '0deg':
          val = 'to top'
          break
        case '90deg':
          val = 'to right'
          break
        case '180deg':
          val = 'to bottom'
          break
        case '270deg':
          val = 'to left'
          break
      }
      return val
    })
}

/**
 * convert directions to old version.
 */
function convertDirection (value: string): string {
  return value
    .replace(/^to\s(top|left|bottom|right)(?:\s+(top|left|bottom|right))?/, function ($0, $1, $2) {
      const dir2 = $2 && ` ${directions[$2]}` || ''
      return `${directions[$1]}${dir2}`
    })
    .replace(/^([+-]?\d+(?:.\d+)?)deg/, function ($0, $1) {
      let val = Math.abs(450 - parseFloat($1)) % 360
      val = parseFloat(val.toFixed(3))
      return `${val}deg`
    })
}

/**
 * fix radial direction syntax.
 * e.g.
 *  farthest-side at 0 50%, white, black
 *   -> 0 50%, farthest-side, white, black
 */
function fixRadial (value: string): string {
  return value.replace(/^(\S+)\sat\s([^,]+)/, function ($0, $1, $2) {
    return `${$2}, ${$1}`
  })
}

function transformValue (value: string): string {
  value = normalize(value)
  value = convertDirection(value)
  value = fixRadial(value)
  return value
}

export default function gradient(property: string, value: any): ?Array<string> {
  if (typeof value === 'string' && !isPrefixedValue(value) && values.test(value)) {
    // TODO:  support repeating-linear-gradient
    const insertPrefixFlag = '@@@'
    const newValue = value.replace(/(linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient)\(([^)]+)\)/g,
      function ($0, $1, $2) {
        return `${insertPrefixFlag}${$1}(${transformValue($2)})`
      })
    const results = prefixes.map(prefix => newValue.replace(
        new RegExp(insertPrefixFlag, 'g'),
        prefix
      ))
    results.push(value)
    return results
  }
}
