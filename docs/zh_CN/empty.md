## 空状态

4 种空态的场景：无数据，无结果，加载失败，无网络

### 基础用法

:::demo

```html
<template>
  <jr-empty />
</template>
```

:::

### Attributes

| 参数     | 说明                                      | 类型    | 可选值                                     | 默认值 |
| -------- | ----------------------------------------- | ------- | ------------------------------------------ | ------ |
| status   | 类型                                      | string  | data / result / loading / network          | data   |
| isPage   | 空态场景，页面或者弹窗                    | boolean | false / true                               | true   |
| imageSrc | 图片资源                                  | string  | -                                          | -      |
| imageFit | 确定图片如何适应容器框，同原生 object-fit | string  | fill / contain / cover / none / scale-down | -      |
