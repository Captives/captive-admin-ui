//导入组件，组件必须声明name
import Fullscreen from './src/Fullscreen.vue';

// 为组件提供 install 安装方法， 供按需引入
Fullscreen.install = function(Vue) {
    Vue.component(Fullscreen.name, Fullscreen);
}

export default Fullscreen;