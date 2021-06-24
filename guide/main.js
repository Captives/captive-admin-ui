import Vue from 'vue'
import Main from './Main.vue'
import router from './router';


//源码(开发时使用)
// import "../packages/theme/src/index.scss";
// import AdminUI from '../src';


import AdminUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入demo-block
import DemoBlock from "./views/demoBlock.vue";
Vue.component("demo-block", DemoBlock);


//全体注册
Vue.use(AdminUI, { size: 'small' });

Vue.config.productionTip = false;
new Vue({ router, render: h => h(Main) }).$mount('#app')