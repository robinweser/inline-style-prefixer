import { expect } from 'chai'
import Prefixer from '../lib/Prefixer'

const MSIE9 = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 7.1; Trident/5.0)'
const MSIE10 = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)'
const MSIE11 = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko'
const MSEdge12 = 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10136'

const Android4_4_4 = 'Mozilla/5.0 (Linux; Android 4.4.4; One Build/KTU84L.H4) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36'
const CordovaIOS8_4 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H141'
const Chrome14 = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.812.0 Safari/535.1'
const Chrome22 = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Chrome/22.0.1216.0 Safari/537.2'
const Chrome45 = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36'
const Chrome49 = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2454.85 Safari/537.36'
const SeaMonkey = 'Mozilla/5.0 (Windows NT 5.2; RW; rv:7.0a1) Gecko/20091211 SeaMonkey/9.23a1pre'

const PhantomJS = 'Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/538.1 (KHTML, like Gecko) PhantomJS/2.0.0 Safari/538.1'

describe('Prefixing a property', () => {
  it('should only add required prefixes', () => {
    const input = {appearance: 'test', transition: 'test'}
    const prefixed = {WebkitAppearance: 'test', transition: 'test'}
    expect(new Prefixer({userAgent: Chrome45}).prefix(input)).to.eql(prefixed)
  })
})

describe('Prefixing 2D transforms', () => {
  const input = {transform: 'rotate(30deg)'}
  const prefixed = {msTransform: 'rotate(30deg)'}

  it('should be prefixed on IE 9', () => {
    expect(new Prefixer({userAgent: MSIE9}).prefix(input)).to.eql(prefixed)
  })
  it('should not be prefixed on IE 10', () => {
    expect(new Prefixer({userAgent: MSIE10}).prefix(input)).to.eql(input)
  })
})

describe('Running on android < 4.4', () => {
  it('should use the osversion to check for required props', () => {
    const andPrefixer = new Prefixer({userAgent: Android4_4_4})
    expect(andPrefixer._browserInfo.version).to.eql(andPrefixer._browserInfo.osversion)
    expect(andPrefixer._browserInfo.version).to.eql(4.4)

    const transform = {transform: 'rotate(40deg)'}
    const output = {WebkitTransform: 'rotate(40deg)'}
    expect(new Prefixer({userAgent: Android4_4_4}).prefix(transform)).to.eql(output)
  })
})

describe('Running on cordova ios <= 8.4', () => {
  it('should be prefixed if the version is missing', () => {
    const cdv8_4Prefixer = new Prefixer({userAgent: CordovaIOS8_4})

    const transform = {transform: 'rotate(40deg)'}
    const output = {WebkitTransform: 'rotate(40deg)'}
    expect(cdv8_4Prefixer.prefix(transform)).to.eql(output)
    
    expect(cdv8_4Prefixer._browserInfo.version).to.eql(0)
  })
})

describe('Prefixing with MS Edge', () => {
  it('should not add -webkit- prefixes', () => {
    const input = {alignItems: 'center', justifyContent: 'center'}
    expect(new Prefixer({userAgent: MSEdge12}).prefix(input)).to.eql(input)
  })
})

describe('Resolving plugins', () => {
  it('should resolve properties', () => {
    const input = {alignItems: 'center'}
    const output = {msFlexAlign: 'center'}
    expect(new Prefixer({userAgent: MSIE10}).prefix(input)).to.eql(output)
  })
  it('should resolve values', () => {
    const input = {display: 'flex'}
    const output = {display: '-webkit-box'}
    expect(new Prefixer({userAgent: Chrome14}).prefix(input)).to.eql(output)
  })

  it('should resolve alternatives', () => {
    const input = {justifyContent: 'space-between'}
    const output = {msFlexPack: 'justify'}
    expect(new Prefixer({userAgent: MSIE10}).prefix(input)).to.eql(output)
  })
})

describe('Using an invalid userAgent', () => {
  it('should return the exact input', () => {
    const input = {appearance: 'test', transition: 'test'}
    expect(new Prefixer({userAgent: 'bad userAgent'}).prefix(input)).to.eql(input)
  })
})

describe('Prefixing keyframes', () => {
  it('should return the correct keyframes string', () => {
    expect(new Prefixer({userAgent: Chrome14}).prefixedKeyframes).to.eql('-webkit-keyframes')
    expect(new Prefixer({userAgent: Chrome49}).prefixedKeyframes).to.eql('keyframes')
  })
})

describe('Keeping defaults', () => {
  it('should not delete defaults properties', () => {
    const input = {appearance: 'test', transition: 'test'}
    const prefixed = {
      WebkitAppearance: 'test',
      appearance: 'test',
      transition: 'test'
    }
    expect(new Prefixer({
      userAgent: Chrome45,
      keepUnprefixed: true
    }).prefix(input)).to.eql(prefixed)
  })
  it('should keep default values', () => {
    expect(new Prefixer({
      userAgent: Chrome22,
      keepUnprefixed: true
    }).prefix({display: 'flex'})).to.eql({
      display: '-webkit-flex;display:flex'
    })
  })
})

describe('Combine all supported browser prefixes', () => {
  it('should resolve common required vendor properties', () => {
    const input = {
      transition: '200ms all linear',
      height: '100px',
      width: '200px'
    }
    const output = {
      MozTransition: '200ms all linear',
      WebkitTransition: '200ms all linear',
      msTransition: '200ms all linear',
      transition: '200ms all linear',
      height: '100px',
      width: '200px'
    }
    expect(Prefixer.prefixAll(input)).to.eql(output)
  })
  it('should resolve every plugin by default', () => {
    const input = {
      alignItems: 'center',
      height: '100px',
      width: '200px'
    }
    const output = {
      MozAlignItems: 'center',
      WebkitAlignItems: 'center',
      WebkitBoxAlign: 'center',
      msAlignItems: 'center',
      msFlexAlign: 'center',
      alignItems: 'center',
      height: '100px',
      width: '200px'
    }
    expect(Prefixer.prefixAll(input)).to.eql(output)
  })
})

describe('Evaluating unsupported browsers', () => {
  it('should not prefix any property', () => {
    expect(new Prefixer({userAgent: SeaMonkey})._hasPropsRequiringPrefix).to.eql(false)
  })
})

describe('Evaluating whitelisted browsers', () => {
  it('should not return false', () => {
    expect(new Prefixer({userAgent: PhantomJS})).to.not.eql(false)
  })
  it('should not prefix any property', () => {
    expect(new Prefixer({userAgent: PhantomJS})._hasPropsRequiringPrefix).to.eql(false)
  })
  it('should add a whitelist flag', () => {
    expect(new Prefixer({userAgent: PhantomJS})._isWhitelisted).to.eql(true)
  })
})
