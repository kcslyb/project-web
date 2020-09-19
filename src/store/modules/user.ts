import Vue from 'vue';
import Vuex from 'vuex';
import store from '@/store/index';
import {removeToken, setToken} from '@/utils/auth';
import http from '@/utils/axios-config';

Vue.use(Vuex);

const user = {
    state: {
        userId: '',
        avatar: '',
        userName: '',
        roleName: '',
        userPhone: '',
        userEmail: '',
        permissions: [],
    },
    mutations: {
        SET_USER: (state: any, userInfo: any) => {
            state.userId = userInfo.userId;
            state.avatar = userInfo.userAvatar;
            state.userName = userInfo.userName;
            state.roleName = userInfo.roleName;
            state.userPhone = userInfo.userPhone;
            state.userEmail = userInfo.userEmail;
            state.permissions = userInfo.permissions;
        },
        RESET_USER: (state: any) => {
            state.userId = '';
            state.avatar = '';
            state.userName = '';
            state.roleName = '';
            state.userPhone = '';
            state.userEmail = '';
            state.permissions = '';
        },
    },
    actions: {
// 登录
        Login({commit, state}: {commit: any, state: any}, loginForm: any) {
            return new Promise((resolve, reject) => {
                http.post('/api/login', loginForm).then((res) => {
                    setToken();
                    debugger
                    resolve(res.data);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        // 获取用户信息
        GetInfo({commit}: {commit: any}) {
            return new Promise((resolve, reject) => {
                http.post('/api/getInfo').then((res) => {
                    if (res.data) {
                        // 储存用户信息
                        commit('SET_USER', res.data);
                        setToken();
                        store.dispatch('GenerateRoutes', res.data).then(() => {});
                        resolve(res.data);
                    }
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        // 登出
        LogOut({commit}: {commit: any}) {
            return new Promise((resolve) => {
                http.post('/api/logout').then((data) => {
                    commit('RESET_USER');
                    removeToken();
                    resolve(data.data);
                }).catch((error) => {
                    commit('RESET_USER');
                    removeToken();
                    resolve(error);
                });
            });
        },
        // 登出
        FedLogOut({commit}: {commit: any}) {
            return new Promise((resolve) => {
                commit('RESET_USER');
                removeToken();
                resolve();
            });
        }
    }
};
export default user;

