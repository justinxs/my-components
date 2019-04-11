// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'normalize.css'
import './assets/css/common.scss'
import 'element-ui/lib/theme-chalk/index.css'
import Row from './components/row'
import Col from './components/col'

Vue.use(Row);
Vue.use(Col);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
