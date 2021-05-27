<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <div class="top20">
            <!-- 正确的 -->
            <jr-button>默认按钮</jr-button>
            <jr-button type="primary">主要按钮</jr-button>
            <jr-button type="success">成功按钮</jr-button>
            <jr-button type="info">信息按钮</jr-button>
            <jr-button type="warning">警告按钮</jr-button>
            <jr-button type="danger">危险按钮</jr-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "App",
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
