## Frame 布局容器

用于布局的容器组件，方便快速搭建页面的基本结构：

:::tip
本组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。
:::

:::demo

```html
<div style="height:100px">
  <jr-frame :aside-width="'100px'" :aside-bg="'#488ff1'">
    <template slot="aside">
      侧边栏
    </template>
    <div style="backgroundColor:#fff">内容区</div>
  </jr-frame>
</div>
:::
```
