
<template>
    <div class="el-nav-bar">
        <slot></slot>
        <el-menu v-bind="$attrs" v-on="$listeners" @select="selectHandler">
            <jr-nav-bar-item v-for="item in data" :key="item[valueField]" :labelField="labelField" :valueField="valueField" :data="item"></jr-nav-bar-item>
        </el-menu>
    </div>
</template>
<script>
import { Menu } from "element-ui";
import JrNavBarItem from "./JrNavBarItem.vue";
export default {
    name: "JrNavBar",
    components: { [Menu.name]: Menu, JrNavBarItem },
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        labelField: {
            type: String,
            default: "label",
        },
        valueField: {
            type: String,
            default: "value",
        },
    },
    methods: {
        selectHandler(a, b, c) {
            this.$emit("change", a, b, c.$attrs, c);
        },
    },
};
</script>