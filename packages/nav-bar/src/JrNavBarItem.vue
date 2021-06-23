<template>
    <div>
        <el-submenu v-if="data.children && data.children.length" :key="data[valueField]" :index="data[valueField].toString()" :disabled="data.disabled">
            <template slot="title">
                <span v-if="data.icon" :class="data.icon"></span>
                {{data[labelField]}}
            </template>
            <jr-nav-bar-item v-for="sub in data.children" :key="sub[valueField]" :labelField="labelField" :valueField="valueField" :data="sub"></jr-nav-bar-item>
        </el-submenu>
        <el-menu-item v-else :index="data[valueField].toString()" :disabled="data.disabled" :item="data">
            <span v-if="data.icon" :class="data.icon"></span>
            {{data[labelField]}}
            <i v-if="data.dot" :class="{'menu-badge':true, dot: data.dot}"></i>
            <i v-else-if="data.value" class="menu-badge">
                {{value(data.value, data.max)}}
            </i>
        </el-menu-item>
    </div>
</template>
<script>
import { Submenu, MenuItem } from "element-ui";
export default {
    name: "JrNavBarItem",
    components: { [Submenu.name]: Submenu, [MenuItem.name]: MenuItem },
    props: {
        data: {
            type: Object,
            default: () => {},
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
    computed: {
        value() {
            return (_value, _max) => {
                return typeof _value === "string" ? _value : _value > _max && _max > 0 ? _max + "+" : _value;
            };
        },
    },
};
</script>