<template>
    <vue-resize class="el-resize" :fixed="true" @change="resizeHandler">
        <!-- <el-row :gutter="10">
            <el-col v-for="(item, index) in list" :key="item" :span="Math.floor(24 / col)" :style="{ background: color(index) }"> 这是内容 - {{ item }} </el-col>
        </el-row> -->

        <div class="list-item" v-for="(item, index) in list" :key="item" :style="{ width: Math.floor(100 / col) + '%', background: color(index) }"> 这是内容 - {{ item }} </div>
    </vue-resize>
</template>
<script>
import Resize from "../components/Resize.vue";
export default {
    name: "Tile",
    components: { [Resize.name]: Resize },
    data() {
        return {
            list: [],
            col: 5, //5列
        };
    },
    computed: {
        color: () => {
            return (index) => {
                return "#" + Math.floor(999999 * Math.random());
            };
        },
    },
    methods: {
        resizeHandler(level, rect) {
            switch (level) {
                case "xl":
                    this.col = 5;
                    break;
                case "lg":
                    this.col = 4;
                    break;
                case "md":
                    this.col = 3;
                    break;
                case "sm":
                    this.col = 2;
                    break;
                case "xs":
                    this.col = 1;
                    break;
            }
            console.log(level, this.col, rect);
        },
    },
    mounted() {
        this.list = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    },
};
</script>
<style lang="scss" scoped>
.el-resize {
    height: 100%;
    flex: 1;
    color: #ffffff;
    background: rgba(20, 20, 20, 0.35);

    .el-col {
        padding: 10px 20px;
    }

    .list-item {
        display: inline-block;
    }
}
</style>