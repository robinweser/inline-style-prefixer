import webpack from 'webpack'
import path from 'path'
import fs from 'fs'
import rimraf from 'rimraf'

const testBundle = name => new Promise((resolve, reject) => {
  const compiler = webpack({
    context: __dirname,
    entry: { [name]: [`./${name}.js`] },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: JSON.parse(fs.readFileSync(path.join(__dirname, '../..', '.babelrc'))),
          include: __dirname,
          exclude: path.join(__dirname, '../..', 'node_modules')
        }
      ]
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: `${name}.js`
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        mangle: { screw_ie8: true },
        output: {
          screw_ie8: true,
          comments: false
        },
        compress: {
          screw_ie8: true,
          warnings: false
        }
      })
    ]
  })

  compiler.run((err) => {
    if (err) {
      reject(err)
    } else {
      console.log(
        `Size ${name}`,
        `${fs.statSync(path.join(__dirname, 'dist', `${name}.js`)).size / 1000.0}KB`
      )
      resolve()
    }
  })
})

Promise
  .all([
    testBundle('205-static'),
    testBundle('300-static'),
    testBundle('301-static'),
    testBundle('302-static'),
    testBundle('205-dynamic'),
    testBundle('300-dynamic'),
    testBundle('301-dynamic'),
    testBundle('302-dynamic')
  ])
  .then(() => {
    rimraf(path.join(__dirname, 'dist'), (err) => {
      if (err) {
        throw err
      }
    })
  })
  .catch((err) => {
    console.error(err)
    throw err
  })
