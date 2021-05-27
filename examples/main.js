import Vue from 'vue'
import Main from './Main.vue'

Vue.config.productionTip = false;

import AdminUI from '../src';
Vue.use(AdminUI);


new Vue({
    render: h => h(Main),
}).$mount('#app')