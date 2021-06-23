import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

let routes = [{
    path: "/",
    icon: "el-icon-hot-water",
    name: "首页",
    component: () =>
        import ("./views/Form.vue"),
    children: [{
        path: "/sub",
        name: "二级页面",
        component: () =>
            import ("./views/Form.vue"),
        children: [{
            path: "/ssub",
            name: "二级页面-子页面",
            icon: "el-icon-hot-water",
            component: () =>
                import ("./views/Form.vue"),
        }]
    }, {
        path: "/sub2",
        name: "二级页面2",
        component: () =>
            import ("./views/Form.vue"),
    }]
}];

import docs from './../docs/index.json';

for (let lang in docs) {
    let doc = {
        path: "/" + lang,
        name: lang,
        component: Vue.extend({ template: `<div><h1>${lang} - 文档</h1><router-view></router-view></div>` }),
        redirect: "/" + lang + "/index",
        children: []
    };

    let groups = docs[lang][1].groups.map(item => item.list).flat();
    groups = groups.map(item => {
        return {
            name: lang + '__' + (item.title || item.name),
            path: doc.path + item.path,
            meta: {
                title: item.title || item.name,
                description: item.description,
                lang
            },
            component: r => require.ensure([], () => r(require(`./../docs/${lang + item.path}.md`)), 'zh-CN')
        };
    })
    doc.children = groups;
    routes.push(doc);
}

export default new VueRouter({ base: process.env.BASE_URL, routes });