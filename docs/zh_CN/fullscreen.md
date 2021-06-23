## 全屏控件
使窗口或组件进入全屏模式，仅支持手动触发。

### 基础用法


:::demo

```html
<template>
  <div>
    <jr-fullscreen
      v-model="fullscreen"
      class="fullscreen-box"
      @change="fullChangeHandler"
    >
      这里是内容区
    </jr-fullscreen>
    <jr-button @click="changeHandler">全屏切换</jr-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        fullscreen: false,
      };
    },
    methods: {
      fullChangeHandler(full) {
        this.$message({
          type: "success",
          message: full ? "进入全屏" : "退出全屏",
        });
      },
      changeHandler() {
        this.fullscreen = !this.fullscreen;
      },
    },
  };
</script>
```

:::

### Attributes

| 参数       | 说明     | 类型  | 可选值       | 默认值 |
| ---------- | -------- | ----- | ------------ | ------ |
| fullscreen | 是否全屏 | boolean | false / true | false  |

### Events

| 事件名称 | 说明               |
| -------- | ------------------ |
| change   | 绑定值被改变时触发 |
