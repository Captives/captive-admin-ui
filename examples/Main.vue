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

        <div class="top20">
            <jr-button r-button icon="el-icon-search" circle>
            </jr-button>
            <jr-button type="primary" icon="el-icon-edit" circle></jr-button>
            <jr-button type="success" icon="el-icon-check" circle></jr-button>
            <jr-button type="info" icon="el-icon-message" circle></jr-button>
            <jr-button type="warning" icon="el-icon-star-off" circle></jr-button>
            <jr-button type="danger" icon="el-icon-delete" circle></jr-button>
        </div>
        <VueForm></VueForm>
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
    iframe {
        outline: none;
        border: none;
        box-sizing: content-box;
        width: 100%;
        height: 100%;
    }
}
</style>
