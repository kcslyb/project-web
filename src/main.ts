import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from '@/App.vue';
import router from './router';
import '@/utils/router-config';
import store from './store/index';
import axios from 'axios';
import VueAxios from 'vue-axios';
import CustomComponents from '@/components/custom/custom.ts';
import moment from 'moment';

Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.use(CustomComponents);

Vue.config.productionTip = false;

/**
 * 替换url
 */
Vue.prototype.$URLREPLACEHOST = (url: string): string => {
    let regex = /\/\/([^]*)\/api/;
    if (regex.test(url)) {
        url.replace(RegExp.$1, window.location.host);
    }
    return url;
};

/**
 * 替换url
 */
Vue.prototype.$URLREQUIRE = (url: string): any => {
    let regex = /[^]*(\/static\/[^]*)/;
    let regexType = /([^]*)\.\w{0,2}|\w{0,3}g/;
    let temp = '';
    if (url && regexType.test(url) && regex.test(url)) {
        temp = RegExp.$1;
    }
    try {
        return require('@/assets' + temp);
    } catch (e) {
        return url;
    }

};

Vue.prototype.$formatDateTime = (row: any, column: any): string => {
    let formatString = row[column.property];
    if (formatString) {
        return moment(formatString).format('YYYY-MM-DD HH:mm:ss');
    } else {
        return '';
    }
};

Vue.prototype.$formatDateTimeString = (formatString: string): string => {
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
    color: '#000',
    background: '#eef5fe'
};

Vue.prototype.$indexMethod = (page: { start: number, size: number }) => {
    return ((page.start - 1) * page.size) + 1;
};

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');

