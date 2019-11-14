import Vue from 'vue';
import VueRouter from 'vue-router';

import App from '{{vue}}';
Vue.use(VueRouter);

//初始化路由
const route = new VueRouter({
    mode: 'history',
    
    base:__dirname
});
//登录前验证
route.beforeEach((to, from, next) => {
    next();
});

new Vue({
    render: h => h(App)
}).$mount('#app');