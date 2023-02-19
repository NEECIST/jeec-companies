import Vue from 'vue'
import vSelect from 'vue-select'
import App from './App.vue'
import router from './router'
import TopBar from './components/TopBar'
import SectionHeader from './components/SectionHeader'
import 'vue-select/dist/vue-select.css';
import store from './store';
import axios from 'axios';
import VueCryptojs from 'vue-cryptojs'
import fullscreen from 'vue-fullscreen'



axios.defaults.withCredentials = false

Vue.use(VueCryptojs)
Vue.use(fullscreen)

Vue.config.productionTip = false

Vue.component('top-bar', TopBar)
Vue.component('section-header-component', SectionHeader)
Vue.component('v-select', vSelect)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
