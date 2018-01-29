describe('Static Prefixer', () => {
  describe('Prefixing all properties', () => {
    it('should only add prefixes if browsers need it', () => {
      const input = { transition: '200ms all linear' }
      const output = {
        WebkitTransition: '200ms all linear',
        MozTransition: '200ms all linear',
        transition: '200ms all linear'
      }
      expect(prefixAll(input)).to.eql(output)
    })

    it('should add all prefixes', () => {
      const input = { userSelect: 'none' }
      const output = {
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none'
      }
      expect(prefixAll(input)).to.eql(output)
    })

    it('should use dash-cased alternative values in array', () => {
      const input = { marginLeft: 'calc(30deg)' }
      const output = { marginLeft: ['-webkit-calc(30deg)', '-moz-calc(30deg)', 'calc(30deg)'] }
      expect(prefixAll(input)).to.eql(output)
    })

    it('should also resolve nested objects', () => {
      const input = {
        transition: '200ms all linear',
        innerStyles: { transition: '300ms all ease-in' }
      }
      const output = {
        MozTransition: '200ms all linear',
        WebkitTransition: '200ms all linear',
        transition: '200ms all linear',
        innerStyles: {
          MozTransition: '300ms all ease-in',
          WebkitTransition: '300ms all ease-in',
          transition: '300ms all ease-in'
        }
      }
      expect(prefixAll(input)).to.eql(output)
    })
  })

  describe('Resolving special plugins', () => {
    it('should prefix calc expressions', () => {
      const input = { width: 'calc(30px)' }
      const output = { width: ['-webkit-calc(30px)', '-moz-calc(30px)', 'calc(30px)'] }
      expect(prefixAll(input)).to.eql(output)
      expect(prefixAll(input)).to.eql(output)
    })

    it('should prefix special cursor values', () => {
      const input = { cursor: 'zoom-in' }
      const output = { cursor: ['-webkit-zoom-in', '-moz-zoom-in', 'zoom-in'] }
      expect(prefixAll(input)).to.eql(output)
      expect(prefixAll(input)).to.eql(output)
    })

    it('should resolve flex-direction for all flexbox specification', () => {
      const input = { flexDirection: 'column-reverse' }
      const output = {
        WebkitBoxOrient: 'vertical',
        WebkitBoxDirection: 'reverse',
        WebkitFlexDirection: 'column-reverse',
        msFlexDirection: 'column-reverse',
        flexDirection: 'column-reverse'
      }
      expect(prefixAll(input)).to.eql(output)
      expect(prefixAll(input)).to.eql(output)
    })

    it('should resolve alternative values for all flexbox specification', () => {
      const input = { justifyContent: 'space-around' }
      const output = {
        WebkitBoxPack: 'justify',
        WebkitJustifyContent: 'space-around',
        justifyContent: 'space-around',
        msFlexPack: 'distribute'
      }
      expect(prefixAll(input)).to.eql(output)
      expect(prefixAll(input)).to.eql(output)
    })

    it('should resolve flexbox variants', () => {
      const input = {
        alignItems: 'center',
        height: '100px',
        width: '200px'
      }
      const output = {
        WebkitAlignItems: 'center',
        WebkitBoxAlign: 'center',
        msFlexAlign: 'center',
        alignItems: 'center',
        height: '100px',
        width: '200px'
      }
      expect(prefixAll(input)).to.eql(output)
      expect(prefixAll(input)).to.eql(output)
    })

    it('should not resolve alternative values on alignSelf', () => {
      const input = { alignSelf: 'flex-start' }
      const output = {
        msFlexItemAlign: 'start',
        WebkitAlignSelf: 'flex-start',
        alignSelf: 'flex-start'
      }
      expect(prefixAll(input)).to.eql(output)
      expect(prefixAll(input)).to.eql(output)
    })

    it('should prefix gradients', () => {
      const input = { background: 'linear-gradient(to bottom right, red, yellow)' }
      const output = {
        background: [
          '-webkit-linear-gradient(to bottom right, red, yellow)',
          '-moz-linear-gradient(to bottom right, red, yellow)',
          'linear-gradient(to bottom right, red, yellow)'
        ]
      }
      expect(prefixAll(input)).to.eql(output)
      expect(prefixAll(input)).to.eql(output)
    })

    it('should add all flexbox display types', () => {
      const input = { display: 'flex' }
      const output = { display: ['-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex'] }
      expect(prefixAll(input)).to.eql(output)
      expect(prefixAll(input)).to.eql(output)
    })

    it('should add all inline flexbox display types', () => {
      const input = { display: 'inline-flex' }
      const output = {
        display: [
          '-webkit-inline-box',
          '-moz-inline-box',
          '-ms-inline-flexbox',
          '-webkit-inline-flex',
          'inline-flex'
        ]
      }
      expect(prefixAll(input)).to.eql(output)
      expect(prefixAll(input)).to.eql(output)
    })

    it('should prefix special sizing values', () => {
      const input = { width: 'min-content' }
      const output = { width: ['-webkit-min-content', '-moz-min-content', 'min-content'] }
      expect(prefixAll(input)).to.eql(output)
      expect(prefixAll(input)).to.eql(output)
    })

    it('should prefix every property within transition values', () => {
      const input = { transition: '200ms linear appearance, 100ms linear width' }
      const output = {
        WebkitTransition: '200ms linear -webkit-appearance,200ms linear appearance, 100ms linear width',
        MozTransition: '200ms linear -moz-appearance,200ms linear appearance, 100ms linear width',
        transition: '200ms linear -moz-appearance,200ms linear -webkit-appearance,200ms linear appearance, 100ms linear width'
      }
      expect(prefixAll(input)).to.eql(output)
      expect(prefixAll(input)).to.eql(output)
    })

    it('should prefix transitions with cubic beziers', () => {
      const input = { transition: 'transform 0.4s cubic-bezier(0.065, 1.360, 0.680, 1.000)' }
      const output = {
        transition: '-ms-transform 0.4s cubic-bezier(0.065, 1.360, 0.680, 1.000),-moz-transform 0.4s cubic-bezier(0.065, 1.360, 0.680, 1.000),-webkit-transform 0.4s cubic-bezier(0.065, 1.360, 0.680, 1.000),transform 0.4s cubic-bezier(0.065, 1.360, 0.680, 1.000)',
        WebkitTransition: '-webkit-transform 0.4s cubic-bezier(0.065, 1.360, 0.680, 1.000),transform 0.4s cubic-bezier(0.065, 1.360, 0.680, 1.000)',
        MozTransition: '-moz-transform 0.4s cubic-bezier(0.065, 1.360, 0.680, 1.000),transform 0.4s cubic-bezier(0.065, 1.360, 0.680, 1.000)'
      }
      expect(prefixAll(input)).to.eql(output)
      expect(prefixAll(input)).to.eql(output)
    })

    it('should prefix transition values with border', () => {
      const input = { transition: 'border 500ms linear' }
      const output = {
        transition: 'border 500ms linear',
        WebkitTransition: 'border 500ms linear',
        MozTransition: 'border 500ms linear'
      }
      expect(prefixAll(input)).to.eql(output)
      expect(prefixAll(input)).to.eql(output)
    })

    it('should prefix transition values for prefixed properties', () => {
      const input = { WebkitTransition: '200ms linear appearance' }
      const output = { WebkitTransition: '200ms linear -webkit-appearance,200ms linear appearance' }
      expect(prefixAll(input)).to.eql(output)
      expect(prefixAll(input)).to.eql(output)
    })

    it('should not prefix msTransition or mozTransition', () => {
      const input = {
        msTransition: '200ms linear appearance',
        mozTransition: '300ms linear width'
      }
      const output = {
        msTransition: '200ms linear appearance',
        mozTransition: '300ms linear width'
      }
      expect(prefixAll(input)).to.eql(output)
      expect(prefixAll(input)).to.eql(output)
    })

    it('should prefix array values', () => {
      const input = { width: ['calc(100%)'] }
      const output = { width: ['-webkit-calc(100%)', '-moz-calc(100%)', 'calc(100%)'] }
      expect(prefixAll(input)).to.eql(output)
      expect(prefixAll(input)).to.eql(output)
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
          'min-content'
        ]
      }
      expect(prefixAll(input)).to.eql(output)
      expect(prefixAll(input)).to.eql(output)
    })

    it('should prefix multiple array values and keep others', () => {
      const input = { width: ['min-content', '100%'] }
      const output = { width: ['-webkit-min-content', '-moz-min-content', 'min-content', '100%'] }
      expect(prefixAll(input)).to.eql(output)
      expect(prefixAll(input)).to.eql(output)
    })

    it('should prefix calc values', () => {
      const input = { width: 'calc(100%)' }
      const output = { width: ['-webkit-calc(100%)', '-moz-calc(100%)', 'calc(100%)'] }
      expect(prefixAll(input)).to.eql(output)
      expect(prefixAll(input)).to.eql(output)
    })

    it('should prefix writingMode', () => {
      const input = { writingMode: 'horizontal-tb' }
      const output = {
        writingMode: 'horizontal-tb',
        msWritingMode: 'horizontal-tb',
        WebkitWritingMode: 'horizontal-tb'
      }
      expect(prefixAll(input)).to.eql(output)
      expect(prefixAll(input)).to.eql(output)
    })

    it('should prefix textOrientation', () => {
      const input = { textOrientation: 'upright' }
      const output = {
        textOrientation: 'upright',
        WebkitTextOrientation: 'upright'
      }
      expect(prefixAll(input)).to.eql(output)
      expect(prefixAll(input)).to.eql(output)
    })
  })
})
