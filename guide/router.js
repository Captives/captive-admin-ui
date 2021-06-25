import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

//Vue 实际路由
let routes = [{
    path: "/",
    icon: "el-icon-hot-water",
    name: "首页",
    component: () =>
        import ("./views/Home.vue"),
    children: [{
        path: "/sub",
        name: "二级页面",
        component: () =>
            import ("./views/Home.vue"),
        children: [{
            path: "/ssub",
            name: "二级页面-子页面",
            icon: "el-icon-hot-water",
            component: () =>
                import ("./views/Home.vue"),
        }]
    }, {
        path: "/sub2",
        name: "二级页面2",
        component: () =>
            import ("./views/Home.vue"),
    }]
}, {
    path: "/editer-from",
    icon: "el-icon-hot-water",
    name: "编辑器",
    component: () =>
        import ("./views/EditerFrom.vue")
}];

import docs from './../docs/index.json';

//注册md文档路由

const registerRoute = (navConfig) => {
    let route = [];
    Object.keys(navConfig).forEach((lang, index) => {
        let navs = navConfig[lang];
        route.push({
            path: `/${lang}`,
            name: lang,
            redirect: `/${lang}/installation`,
            component: Vue.extend({
                template: `
                        <el-scrollbar class="page-component__scroll" ref="componentScrollBar">
                            <h1>${lang} - 文档</h1>
                            <div class="page-container page-component">
                                <div class="page-component__content">
                                    <router-view class="content"></router-view>
                                </div>
                            </div>
                        </el-scrollbar>`
            }),
            children: []
        });
        navs.forEach(nav => {
            if (nav.href) return;
            if (nav.groups) {
                nav.groups.forEach(group => {
                    group.list.forEach(nav => {
                        addRoute(nav, lang, index);
                    });
                });
            } else if (nav.children) {
                nav.children.forEach(nav => {
                    addRoute(nav, lang, index);
                });
            } else {
                addRoute(nav, lang, index);
            }
        });
    });

    function addRoute(page, lang, index) {
        let child = {
            path: '/' + lang + page.path, //.slice(1),
            meta: {
                title: page.title || page.name,
                description: page.description,
                lang
            },
            name: lang + '__' + (page.title || page.name),
            component: r => require.ensure([], () => r(require(`./../docs/${lang + page.path}.md`)), 'zh-CN') //component.default || component
        };
        route[index].children.push(child);
    }

    return route;
};

routes = routes.concat(registerRoute(docs));
/**

for (let lang in docs) {
    let doc = {
        path: "/" + lang,
        name: lang,
        //布局组件
        component: Vue.extend({ template: `<div><h1>${lang} - 文档</h1><router-view></router-view></div>` }),
        redirect: "/" + lang + "/index",
        children: []
    };
    console.log(docs[lang]);
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
 */

console.log(routes);
export default new VueRouter({ base: process.env.BASE_URL, routes });