const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        display: './src/display.js',
      },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    watch: true
}