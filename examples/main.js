import Vue from 'vue'
import Main from './Main.vue'


//编译后的
import "../packages/theme/lib/index.css";
//源码
// import "../packages/theme/src/index.scss";
import AdminUI from '../src';
Vue.use(AdminUI);


Vue.config.productionTip = false;
new Vue({ render: h => h(Main) }).$mount('#app')