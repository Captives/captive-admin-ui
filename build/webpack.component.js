const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')

const Components = require('../components.json');

module.exports = {
    mode: 'production',
    entry: Components.ui,
    output: {
        path: path.resolve(process.cwd(), './lib'),
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[id].js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: ['node_modules'],
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
    performance: {
        hints: false
    },
    stats: 'none',
    optimization: {
        minimize: false
    },
    module: {
        rules: [{
                test: /\.(ts|babel|es6|js)x?$/,
                include: process.cwd(),
                exclude: /node_modules|utils\/popper\.js|utils\/date\.js/,
                loader: 'babel-loader',
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                loaders: ['sass-loader', 'scss-loader', 'style-loader', 'css-loader']
            },
            {
                test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};