// 自动创建组件
const endOfLine = require('os').EOL;
const inquirer = require('inquirer');
const fs = require('fs-extra');
const render = require('json-templater/string');
const uppercamelcase = require('uppercamelcase');
const { paramCase } = require('param-case');

/**
 * 校验
 * ui 增加，重名的需要重新更名
 * element-ui 重名的移除覆盖
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
    <el-{{supname}} v-bind="$attrs" v-on="$listeners"></el-{{supname}}>
</template>
<script>
import { {{parent}} } from "element-ui";
export default {
    name: "Jr{{name}}",
    components: { [{{parent}}.name]: {{parent}} }
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
@import './../../theme-chalk/src/{{supname}}.scss';
@include b({{name}}) {
    //TODO ...
}`;


const VUE_ENTRY_TEMPLATE = `
import {{name}} from './src/{{name}}.vue';
{{name}}.install = function(Vue) {
    Vue.component({{name}}.name, {{name}});
}
export default {{name}};`;


const elements = require('./../src/element.json');
const Components = require('./../components.json');
delete elements.icon;

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
    console.log('组件创建中....');
    fs.ensureDirSync(`packages/theme/src/`, { mode: 0o2775 }); //创建目录，775权限
    fs.ensureDirSync(`packages/${manifest.name}/src/`, { mode: 0o2775 }); //创建目录，775权限
    fs.writeFileSync(`packages/${manifest.name}/index.js`, render(VUE_ENTRY_TEMPLATE, { name: uppercamelcase(manifest.name) }));
    if (manifest.extend) {
        fs.writeFileSync(`packages/${manifest.name}/src/${uppercamelcase(manifest.name)}.vue`, render(VUE_EXTEND_TEMPLATE, { name: uppercamelcase(manifest.name), parent: manifest.parent, supname: paramCase(manifest.parent) }));
        fs.writeFileSync(`packages/theme/src/${manifest.name}.scss`, render(VUE_EXTEND_STYLE, { name: manifest.name, supname: paramCase(manifest.parent) }));
    } else {
        fs.writeFileSync(`packages/${manifest.name}/src/${uppercamelcase(manifest.name)}.vue`, render(VUE_TEMPLATE, { name: uppercamelcase(manifest.name) }));
        fs.writeFileSync(`packages/theme/src/${manifest.name}.scss`, render(VUE_STYLE, { name: manifest.name }));
    }
    fs.outputJSONSync('components.json', json);

    console.log('样式创建编译....');
    require('./cssfile');

    console.log('入口文件注入....');
    require('./entry');
}

const work = () => {
    return inquirer.prompt([{
        name: 'name',
        type: 'input',
        message: `请输入组件名称?`,
        validate: async(input) => {
            if (!input) {
                console.log("\n" + '不能为空，请重新输入');
                return false;
            } else if (Object.keys(Components.ui).includes(paramCase(input))) {
                console.log("\n" + input + '已经存在，请重新输入!');
                return false;
            } else {
                return true;
            }
        }
    }]).then((data) => {
        const name = uppercamelcase(data.name);
        if (Components['element-ui'].includes(name)) {
            return inquirer.prompt([{
                name: 'replaced',
                type: 'list',
                message: name + '已经存在，是否替换?',
                choices: [{ name: "Yes", value: true }, { name: "No", value: false }]
            }]).then(data => {
                if (data.replaced) {
                    manifest.name = paramCase(name);
                    creating();
                } else {
                    return work();
                }
            })
        } else {
            manifest.name = paramCase(name);
            creating();
        }
    }).catch((error) => {
        if (error.isTtyError) {
            console.log("无法在当前环境中引导");
        } else {
            console.log("错误", error);
        }
    });
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
            type: 'rawlist',
            message: '请选择需要继承的组件：',
            pageSize: 20,
            choices: Object.keys(elements).map(name => uppercamelcase(name)),
            loop: false
        }]);
    }
}).then(data => {
    manifest.parent = manifest.extend ? data.parentComponent : null;
    return work();
});