const path = require('path');

const prod = process.env.NODE_ENV === 'production';
const pages = {
    index: {
        entry: "examples/main.js",
        filename: "index.html",
        styles: [
            "https://unpkg.com/element-ui/lib/theme-chalk/index.css"
        ],
        scripts: [
            "https://cn.vuejs.org/js/vue.min.js",
            "https://cdn.bootcdn.net/ajax/libs/vue-router/3.5.1/vue-router.min.js",
            "https://lib.baomitu.com/markdown-it/12.0.6/markdown-it.min.js",
            "https://unpkg.com/element-ui/lib/index.js",
        ],
    },
    guide: {
        entry: "guide/main.js",
        filename: "guide.html",
        styles: [
            "https://unpkg.com/element-ui/lib/theme-chalk/index.css"
        ],
        scripts: [
            "https://cn.vuejs.org/js/vue.min.js",
            "https://cdn.bootcdn.net/ajax/libs/vue-router/3.5.1/vue-router.min.js",
            "https://lib.baomitu.com/markdown-it/12.0.6/markdown-it.min.js",
            "https://unpkg.com/element-ui/lib/index.js",
        ],
    }
};

module.exports = {
    runtimeCompiler: false,
    pages,

    // 扩展 webpack 配置，使 packages 加入编译
    chainWebpack: config => {
        console.log('keys', Object.keys(pages));
        // Object.keys(pages).forEach(key => {
        //     config.plugin('html-' + key).tap(items => {
        //         items[0].cdn = cdn;
        //         console.log("html options2", items);
        //         return items;
        //     })
        // })

        config.module
            .rule('js')
            .include
            .add('/packages')
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                console.log('pkg options', options);
                // 修改它的选项...
                return options
            });

        //图片压缩
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({ bypassOnDebug: true })
            .end();
    },
    // .md文件相关
    configureWebpack: (config) => {
        console.log('configureWebpack', config);
        config.externals = {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'element-ui': 'ELEMENT'
        };

        config.module.rules.push({
            test: /\.md$/,
            use: [{
                loader: "vue-loader",
            }, {
                loader: require.resolve("./build/md-loader.js"),
            }],
        });

        //定义别名
        config.resolve = {
            // 别名
            alias: {
                '@': path.resolve(__dirname, './src'),
                '~': path.resolve(__dirname, './guide'),
                assets: path.resolve(__dirname, './src/assets'),
            }
        };
    },
};