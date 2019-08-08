import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

/** 引入样式初始化文件 */
import './assets/reset.styl';
import './assets/iconfont.styl';

// import BaiduMap from 'vue-baidu-map';

// Vue.use(BaiduMap, {
//   /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
//   ak: 'kU9Tu9jwLbpR1HVwlV0VEPMUm0lfdcZ8',
// });

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
