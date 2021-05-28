# captive-admin-ui

### 安装依赖
```
npm install
```

### 开发调试
```
npm run serve
```

### 打包
- 将各个模块打包为各自的`.js`文件; 如果有样式文件引入， 则也同时抽离出来，并处理为同名的`.css`
```
npm run build
```
- 将所有的功能打包为`index.js`; 如果有样式文件引入或使用，则抽离出来放置到`index.css`
```
npm run build:all
```

- 发布主题包到lib下
```
npm run build:theme
```

- 同时执行以上步骤，发布文件
```
npm run dist
```


# publish NPM
- npm pack
- npm publish