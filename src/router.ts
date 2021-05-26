import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {path: '/login', name: 'login', component: () => import('@/views/account/login/login.vue')},
        {
            path: '/',
            component: () => import('@/views/index/index.vue'),
            meta: {moduleId: 'home', title: '首页', icon: 'el-icon-s-home', perm: 'system-main-manage'},
            children: [
                {
                    path: '/home',
                    component: () => import('@/views/system/logger/log-list.vue'),
                    meta: {moduleId: 'home', title: '通知', perm: 'system-main-manage'}
                },
            ]
        },
        {
            path: '/file',
            component: () => import('@/views/index/index.vue'),
            meta: {moduleId: 'file-list.vue', title: '文件管理', icon: 'el-icon-s-fold', perm: 'system-file-manage'},
            children: [
                {
                    path: '/file/list',
                    component: () => import('@/views/file/file-list.vue'),
                    meta: {moduleId: 'file-list.vue', title: '文件列表', perm: 'system-main-manage'}
                },
            ]
        },
        {
            path: '/account',
            component: () => import('@/views/index/index.vue'),
            meta: {moduleId: 'account', title: '账户管理', icon: 'el-icon-s-custom', perm: 'system-user-manage'},
            children: [
                {
                    path: '/account/user',
                    component: () => import('@/views/account/user/account.vue'),
                    meta: {moduleId: 'account', title: '用户列表', perm: 'system-main-manage'}
                },
                {
                    path: '/account/role',
                    component: () => import('@/views/account/role/role.vue'),
                    meta: {moduleId: 'account', title: '角色列表', perm: 'system-main-manage'}
                },
            ]
        },
        {
            path: '/system',
            component: () => import('@/views/index/index.vue'),
            meta: {moduleId: 'system', title: '系统设置', icon: 'el-icon-s-operation', perm: 'system-setting-manage'},
            children: [
                {
                    path: '/system/dict',
                    component: () => import('@/views/system/dict/dict.vue'),
                    meta: {moduleId: 'system', title: '数据字典', perm: 'system-dict-manage'}
                },
                {
                    path: '/system/note',
                    component: () => import('@/views/system/notify/notify.vue'),
                    meta: {moduleId: 'system', title: '系统通知', perm: 'system-notify-manage'}
                },
                {
                    path: '/system/notepad',
                    component: () => import('@/views/system/notepad/Notepad.vue'),
                    meta: {moduleId: 'system', title: '记事本', perm: 'system-notepad-manage'}
                },
            ]
        },
        {
            path: '/test',
            name: 'test',
            meta: {moduleId: 'home', title: 'test', icon: 'el-icon-s-home', perm: 'system-manage'},
            component: () => import('@/views/index/test.vue'),
        },
        {
            path: '/bookmarks',
            name: 'bookmarks',
            meta: {moduleId: 'bookmarks', title: 'bookmarks', icon: 'el-icon-s-home', perm: 'system-manage'},
            component: () => import('@/views/system/bookmarks/bookmarks.vue'),
        },
        {
            path: '/play',
            name: 'play',
            meta: {moduleId: 'play', title: 'play', icon: 'el-icon-s-home', perm: 'system-manage'},
            component: () => import('@/views/index/play.vue'),
        },
        {
            path: '/*',
            name: 'not-found',
            meta: {moduleId: 'found', title: '404', icon: 'el-icon-s-home', perm: 'system-manage'},
            component: () => import('@/views/index/404.vue'),
        },
    ],
});
