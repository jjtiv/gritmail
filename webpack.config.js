const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        menu:   './src/menu.js',
        checkout:   './src/checkout.js',
        aboutUs:    './src/aboutUs.js',
        mealPeriod: './src/mealPeriod.js',
        account:    './src/account.js'
      },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    watch: true
}