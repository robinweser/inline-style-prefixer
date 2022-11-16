function isSimplePositionValue(value) {
  return typeof value === 'number' && !isNaN(value)
}

function isComplexSpanValue(value) {
  return typeof value === 'string' && value.includes('/')
}

const alignmentValues = ['center', 'end', 'start', 'stretch']

const displayValues = {
  'inline-grid': ['-ms-inline-grid', 'inline-grid'],
  grid: ['-ms-grid', 'grid'],
}

const propertyConverters = {
  alignSelf: (value, style) => {
    if (alignmentValues.indexOf(value) > -1) {
      style.msGridRowAlign = value
    }
  },

  gridColumn: (value, style) => {
    if (isSimplePositionValue(value)) {
      style.msGridColumn = value
    } else if (isComplexSpanValue(value)) {
      const [start, end] = value.split('/')
      propertyConverters.gridColumnStart(+start, style)

      const [maybeSpan, maybeNumber] = end.split(/ ?span /)
      if (maybeSpan === '') {
        propertyConverters.gridColumnEnd(+start + +maybeNumber, style)
      } else {
        propertyConverters.gridColumnEnd(+end, style)
      }
    } else {
      propertyConverters.gridColumnStart(value, style)
    }
  },

  gridColumnEnd: (value, style) => {
    const { msGridColumn } = style
    if (isSimplePositionValue(value) && isSimplePositionValue(msGridColumn)) {
      style.msGridColumnSpan = value - msGridColumn
    }
  },

  gridColumnStart: (value, style) => {
    if (isSimplePositionValue(value)) {
      style.msGridColumn = value
    }
  },

  gridRow: (value, style) => {
    if (isSimplePositionValue(value)) {
      style.msGridRow = value
    } else if (isComplexSpanValue(value)) {
      const [start, end] = value.split('/')
      propertyConverters.gridRowStart(+start, style)

      const [maybeSpan, maybeNumber] = end.split(/ ?span /)
      if (maybeSpan === '') {
        propertyConverters.gridRowEnd(+start + +maybeNumber, style)
      } else {
        propertyConverters.gridRowEnd(+end, style)
      }
    } else {
      propertyConverters.gridRowStart(value, style)
    }
  },

  gridRowEnd: (value, style) => {
    const { msGridRow } = style
    if (isSimplePositionValue(value) && isSimplePositionValue(msGridRow)) {
      style.msGridRowSpan = value - msGridRow
    }
  },

  gridRowStart: (value, style) => {
    if (isSimplePositionValue(value)) {
      style.msGridRow = value
    }
  },

  gridTemplateColumns: (value, style) => {
    style.msGridColumns = value
  },

  gridTemplateRows: (value, style) => {
    style.msGridRows = value
  },

  justifySelf: (value, style) => {
    if (alignmentValues.indexOf(value) > -1) {
      style.msGridColumnAlign = value
    }
  },
}

export default function grid(property, value, style) {
  if (property === 'display' && value in displayValues) {
    return displayValues[value]
  }

  if (property in propertyConverters) {
    const propertyConverter = propertyConverters[property]
    propertyConverter(value, style)
  }
}
