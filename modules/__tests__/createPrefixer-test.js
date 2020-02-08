import createPrefixer from '../createPrefixer'
import generateData from '../generator'
import plugins from '../plugins'

const browserList = {
  chrome: 0,
  android: 0,
  firefox: 0,
  ios_saf: 0,
  safari: 0,
  ie: 0,
  ie_mob: 0,
  edge: 0,
  opera: 0,
  op_mini: 0,
  and_uc: 0,
  and_chr: 0,
}

const { prefixMap } = generateData(browserList)

const prefix = createPrefixer({
  prefixMap,
  plugins,
})

describe('Static Prefixer', () => {
  describe('Prefixing all properties', () => {
    it('should only add prefixes if browsers need it', () => {
      const input = { transition: '200ms all linear' }
      const output = {
        WebkitTransition: '200ms all linear',
        MozTransition: '200ms all linear',
        transition: '200ms all linear',
      }
      expect(prefix(input)).toEqual(output)
    })

    it('should add all prefixes', () => {
      const input = { userSelect: 'none' }
      const output = {
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
      }
      expect(prefix(input)).toEqual(output)
    })

    it('should use dash-cased alternative values in array', () => {
      const input = { marginLeft: 'calc(30deg)' }
      const output = {
        marginLeft: ['-webkit-calc(30deg)', '-moz-calc(30deg)', 'calc(30deg)'],
      }
      expect(prefix(input)).toEqual(output)
    })

    it('should also resolve nested objects', () => {
      const input = {
        transition: '200ms all linear',
        innerStyles: { transition: '300ms all ease-in' },
      }
      const output = {
        WebkitTransition: '200ms all linear',
        MozTransition: '200ms all linear',
        transition: '200ms all linear',
        innerStyles: {
          WebkitTransition: '300ms all ease-in',
          MozTransition: '300ms all ease-in',
          transition: '300ms all ease-in',
        },
      }
      expect(prefix(input)).toEqual(output)
    })
  })

  describe('Resolving special plugins', () => {
    it('should prefix calc expressions', () => {
      const input = { width: 'calc(30px)' }
      const output = {
        width: ['-webkit-calc(30px)', '-moz-calc(30px)', 'calc(30px)'],
      }
      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    it('should prefix special cursor values', () => {
      const input = { cursor: 'zoom-in' }
      const output = { cursor: ['-webkit-zoom-in', '-moz-zoom-in', 'zoom-in'] }
      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    it('should resolve flex-direction for all flexbox specification', () => {
      const input = { flexDirection: 'column-reverse' }
      const output = {
        WebkitBoxOrient: 'vertical',
        WebkitBoxDirection: 'reverse',
        WebkitFlexDirection: 'column-reverse',
        msFlexDirection: 'column-reverse',
        flexDirection: 'column-reverse',
      }
      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    it('should resolve alternative values for all flexbox specification', () => {
      const input = { justifyContent: 'space-around' }
      const output = {
        WebkitBoxPack: 'justify',
        msFlexPack: 'distribute',
        WebkitJustifyContent: 'space-around',
        justifyContent: 'space-around',
      }
      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    it('should resolve flexbox variants', () => {
      const input = {
        alignItems: 'center',
        height: '100px',
        width: '200px',
      }
      const output = {
        WebkitBoxAlign: 'center',
        msFlexAlign: 'center',
        WebkitAlignItems: 'center',
        alignItems: 'center',
        height: '100px',
        width: '200px',
      }
      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    it('should not resolve alternative values on alignSelf', () => {
      const input = { alignSelf: 'flex-start' }
      const output = {
        msFlexItemAlign: 'start',
        WebkitAlignSelf: 'flex-start',
        alignSelf: 'flex-start',
      }
      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    it('should prefix gradients', () => {
      const input = {
        background: 'linear-gradient(to bottom right, red, yellow)',
      }
      const output = {
        background: [
          '-webkit-linear-gradient(to bottom right, red, yellow)',
          '-moz-linear-gradient(to bottom right, red, yellow)',
          'linear-gradient(to bottom right, red, yellow)',
        ],
      }
      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    it('should correctly prefix gradients within multi-values', () => {
      const input = {
        background:
          'url("https://foo.bar"), linear-gradient(to bottom right, red, yellow)',
      }
      const output = {
        background: [
          'url("https://foo.bar"), -webkit-linear-gradient(to bottom right, red, yellow)',
          'url("https://foo.bar"), -moz-linear-gradient(to bottom right, red, yellow)',
          'url("https://foo.bar"), linear-gradient(to bottom right, red, yellow)',
        ],
      }
      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    it('should prefix css logical properties', () => {
      const input = {
        marginInlineStart: '1px',
      }
      const output = {
        marginInlineStart: '1px',
        WebkitMarginStart: '1px',
        MozMarginStart: '1px',
      }
      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    it('should add all flexbox display types', () => {
      const input = { display: 'flex' }
      const output = {
        display: [
          '-webkit-box',
          '-moz-box',
          '-ms-flexbox',
          '-webkit-flex',
          'flex',
        ],
      }
      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    it('should add all inline flexbox display types', () => {
      const input = { display: 'inline-flex' }
      const output = {
        display: [
          '-webkit-inline-box',
          '-moz-inline-box',
          '-ms-inline-flexbox',
          '-webkit-inline-flex',
          'inline-flex',
        ],
      }
      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    it('should prefix special sizing values', () => {
      const input = { width: 'min-content' }
      const output = {
        width: ['-webkit-min-content', '-moz-min-content', 'min-content'],
      }
      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    it('should prefix every property within transition values', () => {
      const input = {
        transition: '200ms linear appearance, 100ms linear width',
      }
      const output = {
        WebkitTransition:
          '200ms linear -webkit-appearance,200ms linear appearance, 100ms linear width',
        MozTransition:
          '200ms linear -moz-appearance,200ms linear appearance, 100ms linear width',
        transition:
          '200ms linear -moz-appearance,200ms linear -webkit-appearance,200ms linear appearance, 100ms linear width',
      }
      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    it('should prefix transitions with cubic beziers', () => {
      const input = {
        transition: 'transform 0.4s cubic-bezier(0.065, 1.360, 0.680, 1.000)',
      }
      const output = {
        WebkitTransition:
          '-webkit-transform 0.4s cubic-bezier(0.065, 1.360, 0.680, 1.000),transform 0.4s cubic-bezier(0.065, 1.360, 0.680, 1.000)',
        MozTransition:
          '-moz-transform 0.4s cubic-bezier(0.065, 1.360, 0.680, 1.000),transform 0.4s cubic-bezier(0.065, 1.360, 0.680, 1.000)',
        transition:
          '-ms-transform 0.4s cubic-bezier(0.065, 1.360, 0.680, 1.000),-moz-transform 0.4s cubic-bezier(0.065, 1.360, 0.680, 1.000),-webkit-transform 0.4s cubic-bezier(0.065, 1.360, 0.680, 1.000),transform 0.4s cubic-bezier(0.065, 1.360, 0.680, 1.000)',
      }
      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    it('should prefix transition values with border', () => {
      const input = { transition: 'border 500ms linear' }
      const output = {
        WebkitTransition: 'border 500ms linear',
        MozTransition: 'border 500ms linear',
        transition: 'border 500ms linear',
      }
      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    it('should prefix transition values for prefixed properties', () => {
      const input = { WebkitTransition: '200ms linear appearance' }
      const output = {
        WebkitTransition:
          '200ms linear -webkit-appearance,200ms linear appearance',
      }
      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    it('should not prefix msTransition or mozTransition', () => {
      const input = {
        msTransition: '200ms linear appearance',
        mozTransition: '300ms linear width',
      }
      const output = {
        msTransition: '200ms linear appearance',
        mozTransition: '300ms linear width',
      }
      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    it('should prefix array values', () => {
      const input = { width: ['calc(100%)'] }
      const output = {
        width: ['-webkit-calc(100%)', '-moz-calc(100%)', 'calc(100%)'],
      }
      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    it('should prefix multiple array values', () => {
      const input = { width: ['calc(100%)', 'min-content'] }
      const output = {
        width: [
          '-webkit-calc(100%)',
          '-moz-calc(100%)',
          'calc(100%)',
          '-webkit-min-content',
          '-moz-min-content',
          'min-content',
        ],
      }
      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    it('should prefix multiple array values and keep others', () => {
      const input = { width: ['min-content', '100%'] }
      const output = {
        width: [
          '-webkit-min-content',
          '-moz-min-content',
          'min-content',
          '100%',
        ],
      }
      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    it('should prefix calc values', () => {
      const input = { width: 'calc(100%)' }
      const output = {
        width: ['-webkit-calc(100%)', '-moz-calc(100%)', 'calc(100%)'],
      }
      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    it('should prefix writingMode', () => {
      const input = { writingMode: 'horizontal-tb' }
      const output = {
        WebkitWritingMode: 'horizontal-tb',
        msWritingMode: 'horizontal-tb',
        writingMode: 'horizontal-tb',
      }
      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    it('should prefix textOrientation', () => {
      const input = { textOrientation: 'upright' }
      const output = {
        WebkitTextOrientation: 'upright',
        textOrientation: 'upright',
      }

      expect(prefix(input)).toEqual(output)
      expect(prefix(input)).toEqual(output)
    })

    describe('flexboxIE shorthand expansions', () => {
      it('should expand basic values', () => {
        const input = { flex: 'auto' }
        const output = {
          flex: 'auto',
          MozFlex: 'auto',
          msFlex: '1 1 auto',
          WebkitFlex: 'auto',
        }
        expect(prefix(input)).toEqual(output)
      })

      it('should expand singular flex-grow', () => {
        const input = { flex: '1.1' }
        const output = {
          flex: '1.1',
          MozFlex: '1.1',
          msFlex: '1.1 1 0%',
          WebkitFlex: '1.1',
        }
        expect(prefix(input)).toEqual(output)
      })

      it('should expand single united values', () => {
        const input = { flex: '1px' }
        const output = {
          flex: '1px',
          MozFlex: '1px',
          msFlex: '1 1 1px',
          WebkitFlex: '1px',
        }
        expect(prefix(input)).toEqual(output)
      })

      it('should expand flex-grow + flex-shrink', () => {
        const input = { flex: '1 3' }
        const output = {
          flex: '1 3',
          MozFlex: '1 3',
          msFlex: '1 3 0%',
          WebkitFlex: '1 3',
        }
        expect(prefix(input)).toEqual(output)
      })

      it('should pass through 3 values', () => {
        const input = { flex: '2 2 10%' }
        const output = {
          flex: '2 2 10%',
          MozFlex: '2 2 10%',
          msFlex: '2 2 10%',
          WebkitFlex: '2 2 10%',
        }
        expect(prefix(input)).toEqual(output)
      })

      it('should expand flex-grow + flex-basis', () => {
        const input = { flex: '0 30px' }
        const output = {
          flex: '0 30px',
          MozFlex: '0 30px',
          msFlex: '0 1 30px',
          WebkitFlex: '0 30px',
        }
        expect(prefix(input)).toEqual(output)
      })
    })

    describe('grid', () => {
      it('should prefix display values', () => {
        const input = { display: 'grid' }
        const inlineInput = { display: 'inline-grid' }
        const output = { display: ['-ms-grid', 'grid'] }
        const inlineOutput = { display: ['-ms-inline-grid', 'inline-grid'] }
        expect(prefix(input)).toEqual(output)
        expect(prefix(inlineInput)).toEqual(inlineOutput)
      })

      it('should prefix basic alignment values', () => {
        const input = { alignSelf: 'stretch', justifySelf: 'end' }
        const output = {
          WebkitAlignSelf: 'stretch',
          alignSelf: 'stretch',
          justifySelf: 'end',
          msFlexItemAlign: 'stretch',
          msGridColumnAlign: 'end',
          msGridRowAlign: 'stretch',
        }
        expect(prefix(input)).toEqual(output)
      })

      describe('template', () => {
        it('should prefix column templating', () => {
          const input = { gridTemplateColumns: '1fr auto' }
          const output = {
            gridTemplateColumns: '1fr auto',
            msGridColumns: '1fr auto',
          }
          expect(prefix(input)).toEqual(output)
        })

        it('should prefix row templating', () => {
          const input = { gridTemplateRows: '1fr auto' }
          const output = {
            gridTemplateRows: '1fr auto',
            msGridRows: '1fr auto',
          }
          expect(prefix(input)).toEqual(output)
        })

        it('should prefix templating even with named grid lines', () => {
          const input = { gridTemplateColumns: '1fr [header content] auto' }
          const output = {
            gridTemplateColumns: '1fr [header content] auto',
            msGridColumns: '1fr [header content] auto',
          }
          expect(prefix(input)).toEqual(output)
        })
      })

      describe('positions', () => {
        it('should prefix a cell with numerical start and end column values', () => {
          const input = { gridColumnStart: 2, gridColumnEnd: 5 }
          const output = {
            gridColumnEnd: 5,
            gridColumnStart: 2,
            msGridColumn: 2,
            msGridColumnSpan: 3,
          }
          expect(prefix(input)).toEqual(output)
        })

        it('should prefix a cell with numerical start and end row values', () => {
          const input = { gridRowStart: 3, gridRowEnd: 7 }
          const output = {
            gridRowEnd: 7,
            gridRowStart: 3,
            msGridRow: 3,
            msGridRowSpan: 4,
          }
          expect(prefix(input)).toEqual(output)
        })

        it('should not prefix a cell with non-numerical position values', () => {
          const input = { gridRowStart: 'span 3', gridRowEnd: 5 }
          const output = {
            gridRowEnd: 5,
            gridRowStart: 'span 3',
          }
          expect(prefix(input)).toEqual(output)
        })

        it('should expand the shorthand column syntax', () => {
          const input = { gridColumn: '3 / 5' }
          const output = {
            gridColumn: '3 / 5',
            msGridColumn: 3,
            msGridColumnSpan: 2,
          }
          expect(prefix(input)).toEqual(output)
        })

        it('should expand the shorthand column syntax with span', () => {
          const input = { gridColumn: '3 / span 1' }
          const output = {
            gridColumn: '3 / span 1',
            msGridColumn: 3,
            msGridColumnSpan: 1,
          }
          expect(prefix(input)).toEqual(output)
        })

        it('should expand the shorthand row syntax', () => {
          const input = { gridRow: '2 / 7' }
          const output = {
            gridRow: '2 / 7',
            msGridRow: 2,
            msGridRowSpan: 5,
          }
          expect(prefix(input)).toEqual(output)
        })

        it('should expand the shorthand row syntax with span', () => {
          const input = { gridRow: '2 / span 3' }
          const output = {
            gridRow: '2 / span 3',
            msGridRow: 2,
            msGridRowSpan: 3,
          }
          expect(prefix(input)).toEqual(output)
        })

        it('should expand the shorthand without syntax and a span', () => {
          const input = { gridRow: 'span 3' }
          const output = {
            gridRow: 'span 3',
            msGridRow: 2,
            msGridRowSpan: 3,
          }
          expect(prefix(input)).toEqual(output)
        })
      })
    })
  })
})
