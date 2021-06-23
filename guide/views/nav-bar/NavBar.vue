<template>
    <ul>
        <h1>
            <slot></slot>
        </h1>
        <NavBarItem v-for="item in data" :key="item[valueField]" :labelField="labelField" :valueField="valueField" :data="item" @select="selectHandler"></NavBarItem>
    </ul>
</template>

<script>
import NavBarItem from "./NavBarItem.vue";
export default {
    name: "NavBar",
    components: { NavBarItem },
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
        selectHandler(value, data, comp) {
            this.$emit("change", value, data, comp);
        },
    },
};
</script>
<style lang="scss" scoped>
ul {
    padding: 0;
    margin: 0;
    li {
        list-style: none;
        color: #555;
    }
}
</style>