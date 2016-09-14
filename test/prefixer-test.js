import { expect } from 'chai'
import Prefixer from '../modules/Prefixer'
const MSIE9 = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 7.1; Trident/5.0)'
const MSIE10 = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)'
const MSEdge12 = 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10136'
const Android4_4_4 = 'Mozilla/5.0 (Linux; Android 4.4.4; One Build/KTU84L.H4) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36'
const CordovaIOS8_4 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H141'
const Android4_2_2Chrome47 = 'Mozilla/5.0 (Linux; Android 4.2.2; Galaxy Nexus Build/JDQ39) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.83 Mobile Safari/537.36'
const Android4_2_2Firefox48 = 'Mozilla/5.0 (Android 4.2.2; Mobile; rv:48.0) Gecko/48.0 Firefox/48.0'
const iOSChrome47 = 'Mozilla/5.0 (iPad; CPU OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) CriOS/47.0.2526.107 Mobile/12H321 Safari/600.1.4'
const Chrome14 = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.812.0 Safari/535.1'
const Chrome22 = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Chrome/22.0.1216.0 Safari/537.2'
const Chrome45 = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36'
const Chrome49 = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2454.85 Safari/537.36'
const SeaMonkey = 'Mozilla/5.0 (Windows NT 5.2; RW; rv:7.0a1) Gecko/20091211 SeaMonkey/9.23a1pre'
const Chromium = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/50.0.2661.102 Chrome/50.0.2661.102 Safari/537.36'
const PhantomJS = 'Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/538.1 (KHTML, like Gecko) PhantomJS/2.0.0 Safari/538.1'

describe('Prefixing a property', () => {
  it('should only add required prefixes', () => {
    const input = { appearance: 'test', transition: 'test' }
    const prefixed = { WebkitAppearance: 'test', transition: 'test' }
    expect(new Prefixer({ userAgent: Chrome45 }).prefix(input)).to.eql(prefixed)
  })
  it('should not break if the value is undefined or false', () => {
    expect(new Prefixer({ userAgent: Chrome14 }).prefix({
      width: undefined
    })).to.not.throw
  })
  it('should also resolve nested objects', () => {
    const input = {
      appearance: 'none',
      innerStyles: {
        appearance: 'none'
      }
    }
    const output = {
      WebkitAppearance: 'none',
      innerStyles: {
        WebkitAppearance: 'none'
      }
    }
    expect(new Prefixer({ userAgent: Chrome14 }).prefix(input)).to.eql(output)
  })
})
describe('Prefixing 2D transforms', () => {
  const input = { transform: 'rotate(30deg)' }
  const prefixed = { msTransform: 'rotate(30deg)' }

  it('should be prefixed on IE 9', () => {
    expect(new Prefixer({ userAgent: MSIE9 }).prefix(input)).to.eql(prefixed)
  })
  it('should not be prefixed on IE 10', () => {
    expect(new Prefixer({ userAgent: MSIE10 }).prefix(input)).to.eql(input)
  })
})
describe('Running on android < 4.4', () => {
  it('should use the osversion if its the native browser to check for required props', () => {
    const andPrefixer = new Prefixer({ userAgent: Android4_4_4 })
    expect(andPrefixer._browserInfo.version).to.eql(andPrefixer._browserInfo.osversion)
    expect(andPrefixer._browserInfo.version).to.eql(4.4)
    const transform = { transform: 'rotate(40deg)' }
    const output = { WebkitTransform: 'rotate(40deg)' }
    expect(new Prefixer({ userAgent: Android4_4_4 }).prefix(transform)).to.eql(output)
  })
  it('should use the chrome version if its chrome to check for required props', () => {
    const andPrefixer = new Prefixer({
      userAgent: Android4_2_2Chrome47
    })
    expect(andPrefixer._browserInfo.osversion).to.eql(4.2)
    expect(andPrefixer._browserInfo.version).to.eql(47)
  })
  it('Should use firefox version on android 4.2.2', () => {
    const andPrefixer = new Prefixer({
      userAgent: Android4_2_2Firefox48
    })
    expect(andPrefixer._browserInfo.osversion).to.eql(4.2)
    expect(andPrefixer._browserInfo.version).to.eql(48)
  })
})
describe('Running on iOS', () => {
  it('always force Safari prefixing as iOS forces to use Safari under the hood', () => {
    const iosPrefixer = new Prefixer({ userAgent: iOSChrome47 })
    expect(iosPrefixer._browserInfo.version).to.eql(iosPrefixer._browserInfo.osversion)
    const input = { display: 'flex' }
    const output = { display: '-webkit-flex' }
    expect(iosPrefixer.prefix(input)).to.eql(output)
  })
})
describe('Running on cordova ios <= 8.4', () => {
  it('should be prefixed if the version is missing', () => {
    const cdv8_4Prefixer = new Prefixer({ userAgent: CordovaIOS8_4 })
    const transform = { transform: 'rotate(40deg)' }
    const output = { WebkitTransform: 'rotate(40deg)' }
    expect(cdv8_4Prefixer.prefix(transform)).to.eql(output)
    expect(cdv8_4Prefixer._browserInfo.version).to.eql(8)
  })
})
describe('Prefixing with MS Edge', () => {
  it('should not add -webkit- prefixes', () => {
    const input = { alignItems: 'center', justifyContent: 'center' }
    expect(new Prefixer({ userAgent: MSEdge12 }).prefix(input)).to.eql(input)
  })
})
describe('Resolving array values', () => {
  it('should resolve each value', () => {
    const input = {
      width: [ 'calc(30deg)', '100%' ],
      display: [ 'inline-block', '-webkit-flex', 'flex', 'block' ]
    }
    const output = {
      width: [ '-webkit-calc(30deg)', '100%' ],
      display: [ 'inline-block', '-webkit-flex', '-webkit-box', 'block' ]
    }
    expect(new Prefixer({ userAgent: Chrome14 }).prefix(input)).to.eql(output)
  })
  it('should should keep unprefixed', () => {
    const input = {
      width: [ 'calc(30deg)', '100%' ],
      display: [ 'inline-block', '-webkit-flex', 'flex', 'block' ]
    }
    const output = {
      width: [ '-webkit-calc(30deg)', 'calc(30deg)', '100%' ],
      display: [ 'inline-block', '-webkit-flex', '-webkit-box', 'flex', 'block' ]
    }
    expect(new Prefixer({
      userAgent: Chrome14,
      keepUnprefixed: true
    }).prefix(input)).to.eql(output)
  })
})
describe('Resolving calc values', () => {
  it('should resolve calc values', () => {
    const input = { width: 'calc(30deg)' }
    const output = { width: '-webkit-calc(30deg)' }
    expect(new Prefixer({ userAgent: Chrome14 }).prefix(input)).to.eql(output)
  })
})
describe('Resolving special sizing values', () => {
  it('should add prefixes', () => {
    const input = { width: 'min-content' }
    const output = { width: '-webkit-min-content' }
    expect(new Prefixer({ userAgent: Chrome14 }).prefix(input)).to.eql(output)
  })
})
describe('Resolving old 2009 flexbox specification', () => {
  it('should prefix display value', () => {
    const input = { display: 'flex' }
    const output = { display: '-webkit-box' }
    expect(new Prefixer({ userAgent: Chrome14 }).prefix(input)).to.eql(output)
  })
  it('should replace flexDirection', () => {
    const input = { flexDirection: 'column-reverse' }
    const output = {
      WebkitBoxOrient: 'vertical',
      WebkitBoxDirection: 'reverse'
    }
    expect(new Prefixer({ userAgent: Chrome14 }).prefix(input)).to.eql(output)
  })
  it('should resolve alternative values', () => {
    const input2 = { justifyContent: 'space-between' }
    const output2 = { WebkitBoxPack: 'justify' }
    expect(new Prefixer({ userAgent: Chrome14 }).prefix(input2)).to.eql(output2)
  })
})
describe('Resolving old 2012 flexbox specification', () => {
  it('should resolve alternative properties', () => {
    const input = { alignItems: 'center' }
    const output = { msFlexAlign: 'center' }
    expect(new Prefixer({ userAgent: MSIE10 }).prefix(input)).to.eql(output)
  })
  it('should resolve alternative properties and values', () => {
    const input = { justifyContent: 'space-between' }
    const output = { msFlexPack: 'justify' }
    expect(new Prefixer({ userAgent: MSIE10 }).prefix(input)).to.eql(output)
  })
})
describe('Resolving zoom cursor values', () => {
  it('should add prefixes when appropriate', () => {
    const standard = { cursor: 'pointer' }
    const input = { cursor: 'zoom-in' }
    const output = { cursor: '-webkit-zoom-in' }
    expect(new Prefixer({ userAgent: Chrome14 }).prefix(standard)).to.eql(standard)
    expect(new Prefixer({ userAgent: Chrome14 }).prefix(input)).to.eql(output)
    expect(new Prefixer({ userAgent: Chrome49 }).prefix(input)).to.eql(input)
    expect(new Prefixer({ userAgent: Chromium }).prefix(input)).to.eql(input)
    expect(new Prefixer({ userAgent: PhantomJS }).prefix(input)).to.eql(input)
  })
})
describe('Resolving grab cursor values', () => {
  it('should add prefixes when appropriate', () => {
    const standard = { cursor: 'pointer' }
    const input = { cursor: 'grab' }
    const output = { cursor: '-webkit-grab' }
    expect(new Prefixer({ userAgent: Chrome14 }).prefix(standard)).to.eql(standard)
    expect(new Prefixer({ userAgent: Chrome14 }).prefix(input)).to.eql(output)
    expect(new Prefixer({ userAgent: Chrome49 }).prefix(input)).to.eql(output)
    expect(new Prefixer({ userAgent: Chromium }).prefix(input)).to.eql(input)
    expect(new Prefixer({ userAgent: PhantomJS }).prefix(input)).to.eql(input)
  })
})
describe('Using an invalid userAgent', () => {
  it('should use prefixAll as fallback', () => {
    const input = { appearance: 'test' }
    const output = {
      WebkitAppearance: 'test',
      MozAppearance: 'test',
      appearance: 'test'
    }
    expect(new Prefixer({ userAgent: 'bad userAgent' }).prefix(input)).to.eql(output)
  })
})
describe('Prefixing keyframes', () => {
  it('should return the correct keyframes string', () => {
    expect(new Prefixer({ userAgent: Chrome14 }).prefixedKeyframes).to.eql('-webkit-keyframes')
    expect(new Prefixer({ userAgent: Chrome49 }).prefixedKeyframes).to.eql('keyframes')
    expect(new Prefixer({ userAgent: Chromium }).prefixedKeyframes).to.eql('keyframes')
    expect(new Prefixer({ userAgent: PhantomJS }).prefixedKeyframes).to.eql('keyframes')
  })
})
describe('Prefixing gradients', () => {
  it('should add prefixes', () => {
    const input = { background: 'linear-gradient()' }
    const prefixed = { background: '-webkit-linear-gradient()' }
    expect(new Prefixer({ userAgent: Chrome22 }).prefix(input)).to.eql(prefixed)
  })
})
describe('Prefixing transitions', () => {
  it('should add prefixes to properties in value', () => {
    const input = { transition: 'appearance 200ms linear' }
    const prefixed = { transition: '-webkit-appearance 200ms linear' }
    expect(new Prefixer({ userAgent: Chrome45 }).prefix(input)).to.eql(prefixed)
  })
  it('should not split cubic-beziers', () => {
    const input = {
      transition: 'appearance 200ms cubic-bezier(0.42, 0.0, 1.0, 1.0)'
    }
    const prefixed = {
      transition: '-webkit-appearance 200ms cubic-bezier(0.42, 0.0, 1.0, 1.0)'
    }
    expect(new Prefixer({ userAgent: Chrome45 }).prefix(input)).to.eql(prefixed)
  })
  it('should prefix multiple properties in value but not split cubic-beziers', () => {
    const input = {
      transition: 'appearance 200ms cubic-bezier(0.42, 0.0, 1.0, 1.0), user-select 100ms linear'
    }
    const prefixed = {
      transition: '-webkit-appearance 200ms cubic-bezier(0.42, 0.0, 1.0, 1.0), -webkit-user-select 100ms linear'
    }
    expect(new Prefixer({ userAgent: Chrome45 }).prefix(input)).to.eql(prefixed)
  })
  it('should not prefix transition values with border', () => {
    const input = { transition: 'border 500ms linear' }
    const output = { transition: 'border 500ms linear' }
    expect(new Prefixer({ userAgent: Chrome45 }).prefix(input)).to.eql(output)
  })
  it('should add prefixes to multiple properties in value', () => {
    const input = {
      transition: 'appearance 200ms linear, user-select 100ms linear'
    }
    const prefixed = {
      transition: '-webkit-appearance 200ms linear, -webkit-user-select 100ms linear'
    }
    expect(new Prefixer({ userAgent: Chrome45 }).prefix(input)).to.eql(prefixed)
    const input2 = { transitionProperty: 'appearance, user-select' }
    const prefixed2 = {
      transitionProperty: '-webkit-appearance, -webkit-user-select'
    }
    expect(new Prefixer({ userAgent: Chrome45 }).prefix(input2)).to.eql(prefixed2)
  })
  it('should keep unprefixed properties', () => {
    const input = { transition: 'appearance 200ms linear' }
    const prefixed = {
      transition: '-webkit-appearance 200ms linear,appearance 200ms linear'
    }
    expect(new Prefixer({
      userAgent: Chrome45,
      keepUnprefixed: true
    }).prefix(input)).to.eql(prefixed)
    const input2 = { transitionProperty: 'appearance' }
    const prefixed2 = {
      transitionProperty: '-webkit-appearance,appearance'
    }
    expect(new Prefixer({
      userAgent: Chrome45,
      keepUnprefixed: true
    }).prefix(input2)).to.eql(prefixed2)
  })
  it('should keep unprefixed properties with multiple properties in value', () => {
    const input = {
      transition: 'appearance 200ms linear, user-select 100ms linear'
    }
    const prefixed = {
      transition: '-webkit-appearance 200ms linear,appearance 200ms linear, -webkit-user-select 100ms linear, user-select 100ms linear'
    }
    expect(new Prefixer({
      userAgent: Chrome45,
      keepUnprefixed: true
    }).prefix(input)).to.eql(prefixed)
    const input2 = { transitionProperty: 'appearance, width' }
    const prefixed2 = {
      transitionProperty: '-webkit-appearance,appearance, width'
    }
    expect(new Prefixer({
      userAgent: Chrome45,
      keepUnprefixed: true
    }).prefix(input2)).to.eql(prefixed2)
  })
})
describe('Keeping defaults', () => {
  it('should not delete defaults properties', () => {
    const input = { appearance: 'test', transition: 'test' }
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
    }).prefix({ display: 'flex' })).to.eql({
      display: [ '-webkit-flex', 'flex' ]
    })
    expect(new Prefixer({
      userAgent: MSIE10,
      keepUnprefixed: true
    }).prefix({ display: 'flex' })).to.eql({
      display: [ '-ms-flexbox', 'flex' ]
    })
  })
  it('should use dash-cased fallback properties', () => {
    expect(new Prefixer({
      userAgent: Chrome22,
      keepUnprefixed: true
    }).prefix({ marginLeft: 'calc(30deg)' })).to.eql({
      marginLeft: [ '-webkit-calc(30deg)', 'calc(30deg)' ]
    })
    expect(new Prefixer({
      userAgent: MSIE10,
      keepUnprefixed: true
    }).prefix({ display: 'flex' })).to.eql({
      display: [ '-ms-flexbox', 'flex' ]
    })
  })
})
describe('Evaluating unsupported browsers', () => {
  it('should set a fallback flag', () => {
    expect(new Prefixer({ userAgent: SeaMonkey })._usePrefixAllFallback).to.eql(true)
  })
})
describe('Passing no userAgent', () => {
  it('should not throw', () => {
    global.navigator = { userAgent: Chrome45 }
    expect(new Prefixer()._userAgent).to.eql(Chrome45)
  })
})
describe('Prefixing display', () => {
  it('should not remove display property', () => {
    expect(new Prefixer({ userAgent: MSIE10 }).prefix({
      display: 'block'
    })).to.eql({ display: 'block' })
  })
  it('should not throw if display is null or undefined', () => {
    expect(new Prefixer({ userAgent: Chrome45 }).prefix({
      display: null
    })).to.eql({ display: null })
    expect(new Prefixer({ userAgent: Chrome45 }).prefix({
      display: undefined
    })).to.eql({ display: undefined })
  })
})
describe('Using Prefixer.prefixAll', () => {
  it(' should use inline-style-prefixer/static', () => {
    const input = { userSelect: 'none' }
    const output = {
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none'
    }
    expect(Prefixer.prefixAll(input)).to.eql(output)
  })
})
