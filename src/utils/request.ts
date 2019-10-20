import * as axios from 'axios';
import {AxiosResponse, AxiosRequestConfig} from 'axios';
import {Loading, Message} from 'element-ui';
import EncryptHelper from '@/utils/encryption';
import {removeToken} from '@/utils/auth';
import {ElLoadingComponent} from 'element-ui/types/loading';

const http = axios.default.create({
    baseURL: process.env.BASE_URL,
    timeout: 15000,
});
// request拦截器
let loading: ElLoadingComponent;
http.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        loading = Loading.service({fullscreen: true});
        // 对请求方式为post，put的请求进行加密
        if (config.method === 'post' || config.method === 'put') {
            config.data = EncryptHelper.aesEncrypt(JSON.stringify(config.data));
            config.headers = {'Content-Type': 'application/json;charset=utf-8'};
        }
        return config;
    },
    (error: any) => {
        Message.error({
            message: '加载超时',
        });
        loading.close();
        return Promise.reject(error);
    }
);
// response拦截器
http.interceptors.response.use(
    (response: AxiosResponse) => {
        // 对进行加密过的string进行解密
        if (response.data && typeof (response.data) === 'string') {
            response.data = EncryptHelper.aesDecrypt(response.data);
        }
        loading.close();
        return response.data;
    },
    (error: any) => {
        loading.close();
        const data: boolean = error.response.data && typeof (error.response.data) === 'string';
        const flag: boolean = /[\"]/.test(data ? error.response.data : '');
        const msg: string = flag ? EncryptHelper.aesDecrypt(error.response.data) : error.response.data;
        Message.error({
            type: 'error',
            message: msg,
        });
        if (error.response.status === 401) {
            removeToken();
            location.reload();
        }
        return Promise.reject(error);
    }
);
export default http;
