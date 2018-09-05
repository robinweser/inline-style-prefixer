/* @flow */
function addIfNew(list: Array<any>, value: any): void {
  if (list.indexOf(value) === -1) {
    list.push(value)
  }
}

export default function addNewValuesOnly(
  list: Array<any>,
  values: Array<any> | any
): void {
  if (Array.isArray(values)) {
    for (let i = 0, len = values.length; i < len; ++i) {
      addIfNew(list, values[i])
    }
  } else {
    addIfNew(list, values)
  }
}
