import Vue from 'vue';
import App from './App';
import router from './router';
import VueNativeSock from 'vue-native-websocket'; //https://github.com/nathantsoi/vue-native-websocket
/*Vue.use(VueNativeSock, 'ws://echo.websocket.org', {
  connectManually: true,
});*/
Vue.use(VueNativeSock, 'ws://localhost:3004', { store: store });
import { store } from './store/store';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3002/people';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
