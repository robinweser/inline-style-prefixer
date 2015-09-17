import {getSupport, getBrowserScope} from 'caniuse-api'
import searchMap from './searchMap'
import fs from 'fs'

const browsers = ['chrome', 'safari', 'firefox', 'opera', 'ie', 'ios_saf', 'android', 'and_chr', 'and_uc', 'op_mini', 'ie_mob']

function gatherInformation() {
  let prefixProperties = {}
  browsers.forEach(browser => {
    prefixProperties[browser] = {}
  })

  let search
  for (search in searchMap) {
    let properties = searchMap[search]
    let versions = getSupport(search, true);
    if (properties instanceof Array !== true) {
      properties = [properties]
    }
    properties.forEach(prop => {
      let prefix
      for (prefix in prefixProperties) {
        prefixProperties[prefix][prop] = versions[prefix].x
      }
    })
  }
  return 'var prefixes = ' + JSON.stringify(prefixProperties) + '; module.exports = prefixes';

}

fs.writeFile('./lib/data.js', gatherInformation(), err => {
  if (err) throw err
  console.log("Successfully generated prefix data.")
})
