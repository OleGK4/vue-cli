import {createRouter, createWebHistory} from 'vue-router'

// const ifNotAuthenticated = (to, from, next) => {
//     if (!store.getter.isAuthenticated) {
//         next();
//         return;
//     }
//     next('/');
// };
//
// const ifAuthenticated = (to, from, next) => {
//     if (store.getter.isAuthenticated) {
//         next();
//         return;
//     }
//     next('/login');
// };

const routes = [{
    path: '/', name: 'home', component: function () {
        return import('@/views/HomeView');
    }, // beforeEnter: ifAuthenticated,
}, {
    path: '/about', name: 'about', component: function () {
        return import('@/views/AboutView');
    }, // beforeEnter: ifAuthenticated,
}, {
    path: '/register', name: 'register', component: function () {
        return import('@/views/Register');
    }, // beforeEnter: ifAuthenticated,
},]
//     path: '/login', name: 'login', component: function () {
//         return import('@/components/Login');
//     }, // beforeEnter: ifNotAuthenticated,
// },]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), routes
})


export default router
