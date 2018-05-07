/* @flow */
import generateStaticPrefixMap from './generateStaticPrefixMap'
import generateDynamicPrefixMap from './generateDynamicPrefixMap'
import generatePluginList from './generatePluginList'

function generateImportString(plugin, pluginPath, compatibility) {
  if (compatibility) {
    return `var ${plugin} = require('inline-style-prefixer/${pluginPath}/plugins/${plugin}')`
  }
  return `import ${plugin} from 'inline-style-prefixer/${pluginPath}/plugins/${plugin}'`
}

function generateFile(prefixMap, pluginList, compatibility, pluginPath) {
  const pluginImports = pluginList
    .map(plugin => generateImportString(plugin, pluginPath, compatibility))
    .join('\n')

  const moduleExporter = compatibility ? 'module.exports = ' : 'export default'
  const pluginExport = `[${pluginList.join(',')}]`
  const prefixMapExport = JSON.stringify(prefixMap)

  if (pluginPath === 'static') {
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

  return `${pluginImports}

${moduleExporter} {
  plugins: ${pluginExport},
  prefixMap: ${prefixMapExport}
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
  staticPath?: string,
  dynamicPath?: string,
  compatibility?: boolean,
  plugins?: boolean,
  prefixMap?: boolean,
}

export default function generateData(
  browserList: Object,
  {
    compatibility,
    plugins,
    staticPath,
    dynamicPath,
    prefixMap,
  }: GenerationOption = {}
) {
  const shouldRenderPlugins = plugins !== undefined ? plugins : true
  const shouldRenderPrefixMap = prefixMap !== undefined ? prefixMap : true

  const data = {
    static: shouldRenderPrefixMap ? generateStaticPrefixMap(browserList) : {},
    dynamic: shouldRenderPrefixMap ? generateDynamicPrefixMap(browserList) : {},
    plugins: shouldRenderPlugins ? generatePluginList(browserList) : [],
  }

  if (staticPath) {
    const fileContent = generateFile(
      data.static,
      data.plugins,
      compatibility,
      'static'
    )

    saveFile(fileContent, staticPath)
  }

  if (dynamicPath) {
    const fileContent = generateFile(
      data.dynamic,
      data.plugins,
      compatibility,
      'dynamic'
    )

    saveFile(fileContent, dynamicPath)
  }

  return data
}
