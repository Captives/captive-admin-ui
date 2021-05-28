<template>
    <div id="app">
        <jr-fullscreen v-model="fullscreen" class="top20 vuejs" @change="fullChangeHandler">
            <iframe src="https://cn.vuejs.org/index.html"></iframe>
            <jr-button v-if="fullscreen" type="danger" @click.native="changeHandler(false)">退出全屏</jr-button>
        </jr-fullscreen>

        <div class="top20">
            <!-- 正确的 -->
            <jr-button>默认按钮</jr-button>
            <jr-button type="primary">主要按钮</jr-button>
            <jr-button type="success">成功按钮</jr-button>
            <jr-button type="info">信息按钮</jr-button>
            <jr-button type="warning" @click.native="changeHandler(true)">全屏</jr-button>
        </div>
        <VueForm style="width:480px; margin:0 auto"></VueForm>
    </div>
</template>

<script>
import VueForm from "./components/Form";
export default {
    name: "Main",
    components: { VueForm },
    data() {
        return {
            fullscreen: false,
        };
    },
    methods: {
        changeHandler(val) {
            this.fullscreen = val;
        },
        fullChangeHandler(full) {
            console.log(full ? "全屏中" : "退出全屏");
        },
    },
};
</script>

<style lang="scss">
#app {
    text-align: center;
}

.vuejs {
    width: 720px;
    height: 380px;
    display: inline-block;
    .el-button {
        position: absolute;
        bottom: 50px;
        left: 10px;
    }
    iframe {
        outline: none;
        border: 1px solid orange;
        box-sizing: content-box;
        width: 100%;
        height: 100%;
    }
}
</style>
