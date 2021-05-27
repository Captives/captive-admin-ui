<template>
    <el-button v-bind="$attrs">
        <slot></slot>
    </el-button>
</template>
<script>
import { Button } from "element-ui";
export default {
    name: "JrButton",
    components: { [Button.name]: Button },
};
</script>