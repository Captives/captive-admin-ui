module.exports = {
    runtimeCompiler: true,
    pages: {
        index: {
            entry: "examples/main.js",
            filename: "index.html",
        },
        guide: {
            entry: "guide/main.js",
            filename: "guide.html",
        }
    },
    // 扩展 webpack 配置，使 packages 加入编译
    chainWebpack: config => {
        config.module
            .rule('js')
            .include
            .add('/packages')
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                // 修改它的选项...
                return options
            })
    },
    // .md文件相关
    configureWebpack: (config) => {
        config.module.rules.push({
            test: /\.md$/,
            use: [{
                loader: "vue-loader",
            }, {
                loader: require.resolve("./build/md-loader.js"),
            }],
        });
    },
};