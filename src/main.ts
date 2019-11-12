import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from '@/App.vue';
import router from './router';
import '@/utils/axios-config';
import store from './store/index';
import axios from 'axios';
import VueAxios from 'vue-axios';
import CustomComponents from '@/components/custom/custom.ts';
import moment from 'moment';
import {ApiFactory, Dict} from '@/resources';

Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.use(CustomComponents);

Vue.config.productionTip = false;

/**
 * 替换url
 */
Vue.prototype.$HOSTURL = (url: string): string => {
    if (url && url.length > 0) {
        const arrUrl = url.split('//');
        const start = arrUrl[1].indexOf('/');
        const relUrl = arrUrl[1].substring(start);
        const hostUrl = window.location.origin;
        return hostUrl + relUrl;
    }
    return url;
};

/**
 * 替换url
 */
Vue.prototype.$REPLACEURL = (url: string): string => {
    if (url && url.length > 0) {
        const start = url.indexOf('static');
        const relUrl = url.substring(start, url.length - 4);
        const type = url.substring(url.length - 4);
        switch (type) {
            case '.jpg':
                // return url.substring(start);
                return require('@/assets/' + relUrl + '.jpg');
            case '.png':
                // return url.substring(start);
                return require('@/assets/' + relUrl + '.png');
            default:
                return url;
        }
    }
    return url;
};

Vue.prototype.$formatDateTime = (row: any, column: any): string => {
    let formatString = row[column.property];
    if (formatString) {
        return moment(formatString).format('YYYY-MM-DD HH:mm:ss');
    } else {
        return '';
    }
};

Vue.prototype.$formatDateTime = (formatString: string): string => {
    if (formatString) {
        return moment(formatString).format('YYYY-MM-DD HH:mm:ss');
    } else {
        return '';
    }
};
Vue.prototype.$formatDate = (formatString: string): string => {
    if (formatString) {
        return moment(formatString).format('YYYY-MM-DD');
    } else {
        return '';
    }
};

Vue.prototype.$tableCellHeader = {
    'color': '#409EFF',
    'background': '#eef5fe'
};

Vue.prototype.$indexMethod = (page: {start: number, size: number})  => {
    return ((page.start - 1) * page.size) + 1;
};

Vue.prototype.$getDict = async function(groupName: string) {
    if (!groupName) {
        return [];
    }
    const state = this.$store.state.common;
    if (state.dict[groupName]) {
        return state.dict[groupName];
    } else {
        ApiFactory.getApi(Dict).query({deleteFlag: '0'}).then((res) => {
            this.$store.commit('initDict', {groupName: res.data});
            return res.data;
        });
    }
};

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');

