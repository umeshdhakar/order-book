var webpack = require('webpack');
module.exports = {
    context: __dirname + '/app',
    entry: {
        app: './app.module.js',
        vendor: ['angular', 'ng-storage', 'angular-route']
    },
    output: {
        path: __dirname + '/app/dist/js',
        filename: 'app.bundle.js'
    },
    plugins: [
new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.bundle.js"
        })
]
};