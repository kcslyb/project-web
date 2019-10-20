import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from '@/App.vue';
import router from './router';
import '@/utils/routerfilter';
import store from './store/index';
import axios from 'axios';
import VueAxios from 'vue-axios';
import CustomComponents from '@/components/custom/custom.ts';

Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.use(CustomComponents);

Vue.config.productionTip = false;

// Vue.prototype.$store = store;

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
        return require('../' + relUrl + '.jpg');
      case '.png':
        // return url.substring(start);
        return require('../' + relUrl + '.png');
      default:
        return url;
    }
  }
  return url;
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

