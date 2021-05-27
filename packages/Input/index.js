//导入组件，组件必须声明name
import Input from './src/Input.vue';

// 为组件提供 install 安装方法， 供按需引入
Input.install = function(Vue) {
    Vue.component(Input.name, Input);
}

export default Input;