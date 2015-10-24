import { expect } from 'chai'
import Prefixer from '../lib/Prefixer'

let MSIE10 = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)'
let MSIE11 = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko'

let Chrome14 = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.812.0 Safari/535.1'
let Chrome45 = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36'
let Chrome49 = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2454.85 Safari/537.36'


describe('Prefixing a property', () => {
  it('should only add required prefixes', () => {
    let input = {
      appearance: 'test',
      transition: 'test'
    }
    let input2 = {
      appearance: 'test',
      transition: 'test'
    }
    let prefixed = {
      WebkitAppearance: 'test',
      transition: 'test'
    }
    expect(new Prefixer(Chrome45).prefix(input)).to.eql(prefixed)
    expect(new Prefixer(Chrome49).prefix(input2)).to.eql(input2)
  })
})


describe('Resolving plugins', () => {
  it('should resolve properties', () => {
    let input = {
      alignItems: 'center'
    }
    let output = {
      msFlexAlign: 'center'
    }
    expect(new Prefixer(MSIE10).prefix(input)).to.eql(output)
  })
  it('should resolve values', () => {
    let input = {
      display: 'flex'
    }
    let output = {
      display: '-webkit-box'
    }
    expect(new Prefixer(Chrome14).prefix(input)).to.eql(output)
  })

  it('should resolve alternatives', () => {
    let input = {
      justifyContent: 'space-between'
    }
    let output = {
      msFlexPack: 'justify'
    }
    expect(new Prefixer(MSIE10).prefix(input)).to.eql(output)
  })
})


describe('Combine all supported browser prefixes', () => {
  it('should resolve common required vendor properties', () => {
    let input = {
      alignItems: 'center',
      height: '100px',
      width: '200px'
    }
    let output = {
      MozAlignItems: 'center',
      WebkitAlignItems: 'center',
      msAlignItems: 'center',
      alignItems: 'center',
      height: '100px',
      width: '200px'
    }
    expect(new Prefixer('*').prefix(input)).to.eql(output)
  })
})