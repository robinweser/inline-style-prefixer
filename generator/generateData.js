import fs from 'fs'
import searchMap from './searchMap'
import config from '../config'
import assign from 'object-assign'

const caniuse = require('caniuse-api')

const prefixBrowsers = {
  chrome: 'Webkit',
  safari: 'Webkit',
  firefox: 'Moz',
  opera: 'Webkit',
  ie: 'ms',
  edge: 'ms',
  ios_saf: 'Webkit',
  android: 'Webkit',
  and_chr: 'Webkit',
  and_uc: 'Webkit',
  op_mini: 'Webkit',
  ie_mob: 'ms'
}

const prefixProperties = Object.keys(prefixBrowsers).reduce((out, browser) => {
  const prefix = prefixBrowsers[browser]
  Object.keys(searchMap).forEach(searchKey => {
    const versions = caniuse.getSupport(searchKey, true)
    const properties = [ ].concat(searchMap[searchKey])

    properties.forEach(prop => {
      if (versions[browser].x >= config[browser]) {
        out[prefix][prop] = true;
      }
    })
  })

  return out
}, { Webkit: { }, Moz: { }, ms: { } })

// remove flexprops from IE
const flexPropsIE = [ 'alignContent', 'alignSelf', 'alignItems', 'justifyContent', 'order', 'flexGrow', 'flexShrink', 'flexBasis' ]

flexPropsIE.forEach(prop => {
  prefixProperties.ms[prop] = false
})

const file = 'export default ' + JSON.stringify(prefixProperties).replace(new RegExp(/\[/, 'g'), '{').replace(new RegExp(/\]/, 'g'), '}');

fs.writeFile('./modules/static/prefixProps.js', file, err => {
  if (err) {
    throw err
  }
  console.log('Successfully generated static property vendor-prefix data based on before generated caniuse data mapping.')
})


var browsers = [ 'chrome', 'safari', 'firefox', 'opera', 'ie', 'edge', 'ios_saf', 'android', 'and_chr', 'and_uc', 'op_mini', 'ie_mob' ]

function gatherInformation() {
  var prefixProperties = { }
  browsers.forEach(function(browser) {
    prefixProperties[browser] = { }
  })

  var search
  for (search in searchMap) {
    var properties = searchMap[search]
    var versions = caniuse.getSupport(search, true)
    if (properties instanceof Array !== true) {
      properties = [ properties ]
    }
    properties.forEach(function(prop) {
      var prefix
      for (prefix in prefixProperties) {
        if (versions[prefix].x >= config[prefix]) {
          prefixProperties[prefix][prop] = versions[prefix].x
        }
      }
    })
  }


  prefixProperties.ie = assign({ }, prefixProperties.ie, prefixProperties.ie_mob)
  delete prefixProperties.ie_mob
  flexPropsIE.forEach(function(prop) {
    delete prefixProperties.ie[prop]
  })
  return 'export default ' + JSON.stringify(prefixProperties)
}

fs.writeFile('./modules/prefixProps.js', gatherInformation(), function(err) {
  if (err) {
    throw err
  }
  console.log('Successfully generated CSS property vendor-prefix data using latest caniuse.com data.')
  console.log('Support following browser: ', browsers.join(', '))
})
