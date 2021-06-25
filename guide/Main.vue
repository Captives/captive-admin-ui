<template>
    <el-fullscreen id="app" v-model="fullscreen" @change="fullChangeHandler">
        <el-container id="app">
            <div class="sidebar">
                <NavBar :data="list" slot="sidebar" label-field="name" value-field="path" @change="navChangeHandler">
                    <el-button v-if="!fullscreen" type="warning" @click.native="changeHandler(true)">进入全屏</el-button>
                    <el-button v-if="fullscreen" type="danger" @click.native="changeHandler(false)">退出全屏</el-button>
                    <el-divider> 路由导航 </el-divider>
                </NavBar>

                <Siderbar v-for="(item,lang) in docs" :key="lang" :lang="lang" :data="item"></Siderbar>
            </div>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-fullscreen>
</template>

<script>
import router from "./router";
import NavBar from "./components/nav-bar/NavBar.vue";
import Siderbar from "./components/Sidebar.vue";
import docs from "./../docs/index.json";
console.log(docs);
export default {
    name: "Main",
    components: { NavBar, Siderbar },
    data() {
        return {
            docs: docs,
            fullscreen: false,
        };
    },
    computed: {
        list() {
            return router.options.routes;
        },
    },
    methods: {
        changeHandler(val) {
            this.fullscreen = val;
        },
        fullChangeHandler(full) {
            console.log(full ? "全屏中" : "退出全屏");
            this.$message({ type: "success", message: full ? "全屏中" : "退出全屏" });
        },
        navChangeHandler(value, values, d) {
            console.log(value, values, d);
            this.$router.push({ path: value });
        },
    },
    mounted() {},
};
</script>
<style lang="scss">
@import "./demo-styles/index.scss";
@import "./assets/styles/bass.scss";
@import "./assets/styles/hljs.scss";
@import "./assets/styles/md.scss";
</style>
<style lang="scss" scoped>
html,
body,
#app {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
}
.el-container {
    height: 100%;
    margin: 0 10%;

    .sidebar {
        width: 320px;
        height: 100%;
        overflow-y: auto;
        .el-nav-bar {
            height: 100%;
        }
    }

    .el-main {
        ::v-deep .page-component__scroll {
            overflow-y: auto;
            height: 100%;
        }
        ::v-deep .page-component__content {
            max-width: 750px;
        }
    }
}
</style>