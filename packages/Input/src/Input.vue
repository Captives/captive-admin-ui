<template>
    <el-input :value="value" v-bind="$attrs" @input="inputChangeHandler"></el-input>
</template>
<script>
import { Input } from "element-ui";
export default {
    name: "JrInput",
    props: {
        value: {
            type: String,
            default: "",
        },
    },
    components: { [Input.name]: Input },
    methods: {
        inputChangeHandler(value) {
            this.$emit("input", value);
        },
    },
};
</script>