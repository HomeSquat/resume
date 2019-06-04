import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

/** 引入样式初始化文件 */
import './assets/reset.styl';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
