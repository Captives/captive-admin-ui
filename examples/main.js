import Vue from 'vue'
import Main from './Main.vue'



import "../packages/theme/index.scss";
import AdminUI from '../src';
Vue.use(AdminUI);


Vue.config.productionTip = false;
new Vue({ render: h => h(Main) }).$mount('#app')