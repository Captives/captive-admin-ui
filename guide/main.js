import Vue from 'vue'
import Main from './Main.vue'
import router from './router';


import FullScreen from './../packages/fullscreen';
console.log('FullScreen', FullScreen);
Vue.use(FullScreen);

//源码(开发时使用)
// import "../packages/theme/src/index.scss";
// import AdminUI from '../src';

import AdminUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入demo-block
// import DemoBlock from "./views/DemoBlock.vue";
import DemoBlock from './components/demo-block.vue';
Vue.component("demo-block", DemoBlock);

import icon from './assets/icon.json';
Vue.prototype.$icon = icon; // Icon 列表页用

//全体注册
Vue.use(AdminUI, { size: 'small' });



import hljs from 'highlight.js';
router.afterEach(route => {
    // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
    Vue.nextTick(() => {
        const blocks = document.querySelectorAll('pre code:not(.hljs)');
        Array.prototype.forEach.call(blocks, hljs.highlightBlock);
    });
    // const data = title[route.meta.lang];
    // for (let val in data) {
    //     if (new RegExp('^' + val, 'g').test(route.name)) {
    //         document.title = data[val];
    //         return;
    //     }
    // }
    // document.title = 'Element';
    // ga('send', 'event', 'PageView', route.name);
});

Vue.config.productionTip = false;
new Vue({ router, render: h => h(Main) }).$mount('#app')