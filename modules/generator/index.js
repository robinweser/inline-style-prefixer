/* @flow */
import generatePrefixMap from './generatePrefixMap'
import generatePluginList from './generatePluginList'

function generateImportString(plugin, compatibility) {
  if (compatibility) {
    return `var ${plugin} = require('inline-style-prefixer/plugins/${plugin}')`
  }
  return `import ${plugin} from 'inline-style-prefixer/plugins/${plugin}'`
}

function generateFile(prefixMap, pluginList, compatibility) {
  const pluginImports = pluginList
    .map(plugin => generateImportString(plugin, compatibility))
    .join('\n')

  const moduleExporter = compatibility ? 'module.exports = ' : 'export default'
  const pluginExport = `[${pluginList.join(',')}]`
  const prefixMapExport = JSON.stringify(prefixMap)

  const prefixVariables = [
    'var w = ["Webkit"];',
    'var m = ["Moz"];',
    'var ms = ["ms"];',
    'var wm = ["Webkit","Moz"];',
    'var wms = ["Webkit","ms"];',
    'var wmms = ["Webkit","Moz","ms"];',
  ].join('\n')

  return `${pluginImports}
${prefixVariables}

${moduleExporter} {
  plugins: ${pluginExport},
  prefixMap: ${prefixMapExport
    .replace(/\["Webkit"\]/g, 'w')
    .replace(/\["Moz"\]/g, 'm')
    .replace(/\["ms"\]/g, 'ms')
    .replace(/\["Webkit","Moz"\]/g, 'wm')
    .replace(/\["Webkit","ms"\]/g, 'wms')
    .replace(/\["Webkit","Moz","ms"\]/g, 'wmms')}
}`
}

function saveFile(fileContent: string, path: string): void {
  /* eslint-disable global-require */
  const fs = require('fs')
  /* eslint-enable global-require */

  fs.writeFile(path, fileContent, err => {
    if (err) {
      throw err
    }

    console.log(`Successfully saved data to "${path}".`)
  })
}

type GenerationOption = {
  path?: string,
  compatibility?: boolean,
  plugins?: boolean,
  prefixMap?: boolean,
}

const defaultOptions = {
  prefixMap: true,
  plugins: true,
  compatibility: false,
}

export default function generateData(
  browserList: Object,
  userOptions: GenerationOption = {}
) {
  const options = {
    ...defaultOptions,
    ...userOptions,
  }

  const { compatibility, plugins, path, prefixMap } = options

  const requiredPrefixMap = prefixMap ? generatePrefixMap(browserList) : {}
  const requiredPlugins = plugins ? generatePluginList(browserList) : []

  if (path) {
    saveFile(
      generateFile(requiredPrefixMap, requiredPlugins, compatibility),
      path
    )
  }

  return {
    prefixMap: requiredPrefixMap,
    plugins: requiredPlugins,
  }
}
