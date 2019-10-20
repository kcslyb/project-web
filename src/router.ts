import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path: '/login', name: 'login', component: () => import('@/components/login/index.vue')},
    {
      path: '/',
      component: () => import('@/views/index.vue'),
      meta: {moduleId: 'home', title: '首页', icon: 'el-icon-s-home', perm: 'system-main-manage'},
      children: [
        {
          path: '/home',
          component: () => import('@/views/404.vue'),
          meta: {moduleId: 'home', title: '主页', perm: 'system-main-manage'}
        },
      ]
    },
    {
      path: '/file',
      component: () => import('@/views/index.vue'),
      meta: {moduleId: 'file', title: '文件管理', icon: 'el-icon-document', perm: 'system-file-manage'},
      children: [
        {
          path: '/file/list',
          component: () => import('@/components/file/file.vue'),
          meta: {moduleId: 'file', title: '文件列表', perm: 'system-main-manage'}
        },
      ]
    },
    {
      path: '/account',
      component: () => import('@/views/index.vue'),
      meta: {moduleId: 'system', title: '账户管理', icon: 'el-icon-s-custom', perm: 'system-setting-manage'},
      children: [
        {
          path: '/account/user',
          component: () => import('@/components/account/user/account.vue'),
          meta: {moduleId: 'system', title: '用户列表', perm: 'system-main-manage'}
        },
        {
          path: '/account/role',
          component: () => import('@/components/account/role/role.vue'),
          meta: {moduleId: 'system', title: '角色列表', perm: 'system-main-manage'}
        },
      ]
    },
    // {
    //   path: '/system',
    //   component: () => import('@/views/index.vue'),
    //   meta: {moduleId: 'system', title: '系统设置', icon: 'el-icon-setting', perm: 'menu-system'},
    //   children: [
    //     {
    //       path: '/system/dict',
    //       component: () => import('../components/dict/dictionary.vue'),
    //       meta: {moduleId: 'system', title: '数据字典', perm: 'system-dict'}
    //     },
    //     {
    //       path: '/system/note',
    //       component: () => import('../components/note/note.vue'),
    //       meta: {moduleId: 'system', title: '公告管理', perm: 'system-note'}
    //     },
    //     {
    //       path: '/system/log',
    //       component: () => import('../components/log/log.vue'),
    //       meta: {moduleId: 'system', title: '系统日志', perm: 'system-log'}
    //     }
    //   ]
    // },
    {
      path: '/404',
      name: 'test',
      meta: {moduleId: 'home', title: 'test', icon: 'el-icon-s-home', perm: 'system-manage'},
      component: () => import('@/views/test.vue'),
    },
    {
      path: '/*',
      name: 'not-found',
      meta: {moduleId: 'home', title: '404', icon: 'el-icon-s-home', perm: 'system-manage'},
      component: () => import('@/views/404.vue'),
    },
  ],
});
