const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../lib'),
        publicPath: '/',
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'captives-admin-ui',
        umdNamedDefine: true,
        globalObject: 'typeof self !== \'undefined\' ? self : this',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
        alias: {
            main: path.resolve(__dirname, '../src'),
            packages: path.resolve(__dirname, '../packages'),
            examples: path.resolve(__dirname, '../examples'),
            'admin-ui': path.resolve(__dirname, '../')
        }
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        },
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [{
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(ts|babel|es6|js)x?$/,
                exclude: /node_modules|utils\/popper\.js|utils\/date\.js/,
                loader: 'babel-loader',
            },
        ],
    },
}