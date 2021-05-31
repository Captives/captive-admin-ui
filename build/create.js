// 自动创建组件
const endOfLine = require('os').EOL;
const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const render = require('json-templater/string');
const uppercamelcase = require('uppercamelcase');

/**
 * 校验
 * ui 增加
 * element-ui 移除
 * packages 创建目录，创建index.js、创建src、创建src/组件.vue文件
 * packages/theme 下创建组件.scss文件
 * 调用 cssfile.js 执行代码，更新引用～
 * 调用 entry.js 执行入口代码绑定
 */


const VUE_TEMPLATE = `
<template>
    <div></div>
</template>
<script>
export default {
    name: "Jr{{name}}"
};
</script>`;

const VUE_EXTEND_TEMPLATE = `
<template>
    <el-{{package}} v-bind="$attrs"></el-{{package}}>
</template>
<script>
import { {{name}} } from "element-ui";
export default {
    name: "Jr{{name}}",
    components: { [Input.name]: Input }
};
</script>`;

const VUE_STYLE = `
@import "./../../theme-chalk/src/common/var";
@import "./../../theme-chalk/src/mixins/mixins";
@import "./base.scss";
@include b({{name}}) {
    //TODO ...
}`;

const VUE_EXTEND_STYLE = `
@import "./../../theme-chalk/src/common/var";
@import "./../../theme-chalk/src/mixins/mixins";
@import "./base.scss";
//继承
@import './../../theme-chalk/src/{{name}}.scss';
@include b({{name}}) {
    //TODO ...
}`;


const VUE_ENTRY_TEMPLATE = `
import {{name}} from './src/{{name}}.vue';
{{name}}.install = function(Vue) {
    Vue.component({{name}}.name, {{name}});
}
export default {{name}};`;


const Components = require('./../components.json');

let manifest = {
    name: null,
    extend: false,
    parent: null
};

const creating = () => {
    console.log('清单', manifest);
    let json = Object.assign({}, Components);
    json.ui[manifest.name] = "./packages/" + manifest.name + "/index.js";
    //重名的替换掉
    json['element-ui'].splice(json['element-ui'].indexOf(uppercamelcase(manifest.name)), 1);
    console.log(json);
}


//询问
inquirer.prompt([{
    name: 'extend',
    type: 'list',
    message: '是否要继承 element-ui 组件?',
    choices: [{ name: "Yes", value: true }, { name: "No", value: false }]
}]).then(data => {
    manifest.extend = data.extend;
    if (data.extend) {
        return inquirer.prompt([{
            name: 'parentComponent',
            type: 'list',
            message: '请选择需要继承的组件：',
            pageSize: 20,
            choices: Components['element-ui'],
            loop: false
        }]);
    }
}).then(data => {
    manifest.parent = manifest.extend ? data.parentComponent : null;
    return inquirer.prompt([{
        name: 'name',
        type: 'input',
        message: `请输入组件名称(全小写'-'分割)?`,
        validate: (input) => {
            if (!input) {
                console.log("\n" + '不能为空，请重新输入');
                return false;
            } else if (Object.keys(Components.ui).includes(input.toLowerCase())) {
                console.log("\n" + input + '已经存在，请重新输入!');
                return false;
            } else if (Components['element-ui'].includes(uppercamelcase(input)) && !manifest.extend) {
                console.log("\n" + input + '已经存在，请重新输入!');
                return false;
            } else {
                return true;
            }
        },
    }]);
}).then((data) => {
    manifest.name = data.name.toLowerCase();
    creating();
}).catch((error) => {
    if (error.isTtyError) {
        console.log("无法在当前环境中引导");
    } else {
        console.log("错误", error);
    }
});