import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import rimraf from 'rimraf';

const testBundle = (name) => new Promise((resolve, reject) => {
  const compiler = webpack({
    context: __dirname,
    entry: {
      [name]: [ `./${name}.js` ]
    },
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
        mangle: {
          screw_ie8: true
        },
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
  });

  compiler.run((err) => {
    if (err) {
      reject(err);
    } else {
      console.log(`Size ${name}`, (
        fs.statSync(path.join(__dirname, 'dist', `${name}.js`)).size / 1000.0
        ) + 'KB');
      resolve();
    }
  });
});

Promise.all([
  testBundle('new'),
  testBundle('new_static'),
  testBundle('old'),
  testBundle('old_static')
]).then(() => {
  rimraf(path.join(__dirname, 'dist'), (err) => {
    if (err) {
      throw err;
    }
  });
}).catch((err) => {
  console.error(err);
  throw err;
});
