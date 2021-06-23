<template>
    <li class="list-item" :class="'list-item-' + (deep + 1)" :disabled="data.disabled">
        <div class="list-item-title" @click="itemClickHandler(data)">
            <span v-if="data.icon" :class="data.icon"></span>
            {{data[labelField] | name}}
            <i v-if="data.dot" :class="{'menu-badge':true, dot: data.dot}"></i>
            <i v-else-if="data.value" class="menu-badge">
                {{value(data.value, data.max)}}
            </i>
        </div>

        <template v-if="data.children && data.children.length">
            <ul class="list">
                <NavBarItem v-for="item in data.children" :key="item[valueField]" :labelField="labelField" :valueField="valueField" :data="item" :deep="deep+1" @select="selectHandler"></NavBarItem>
            </ul>
        </template>
    </li>

</template>
<script>
export default {
    name: "NavBarItem",
    filters: {
        name(value) {
            let list = value.split("__");
            return list.length == 2 ? list[1] : list[0];
        },
    },
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
        deep: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        value() {
            return (_value, _max) => {
                return typeof _value === "string" ? _value : _value > _max && _max > 0 ? _max + "+" : _value;
            };
        },
    },
    methods: {
        itemClickHandler(item) {
            this.$emit("select", item[this.valueField], item, this);
        },
        selectHandler(value, data, comp) {
            this.$emit("select", value, data, comp);
        },
    },
};
</script>
<style lang="scss" scoped>
ul {
    padding: 0;
    margin: 0;
}

li {
    list-style: none;
    margin-left: 10px;
    font-size: 14px;

    .list-item-title {
        cursor: pointer;
        padding: 5px 10px;
        border-radius: 5px;
        white-space: nowrap;
        overflow: hidden;
        &:hover {
            // background: rgba(6, 6, 6, 0.35);
            color: #409eff;
        }
    }
}
</style>
