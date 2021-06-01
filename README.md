# captive-admin-ui

## 安装
### 安装依赖
```
npm install
```

### 克隆主题
```
cd packages/
git clone https://github.com/ElementUI/theme-chalk 
```

### 开发调试
```
npm run serve
```


## 部署

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
- 发布代码到`npmjs.com`
```
npm pack    # 打包
npm publish     # 发布
```

## 作业

### 组件

```
npm run init
```

向导式新建组件，新组件可以继承`element-ui`组件； 如果和`element-ui`库组件同名，将覆盖掉。

> 项目继承`element-ui`组件库和`theme-chalk`主题库，组件的**class**必须`el-`命名空间开头
