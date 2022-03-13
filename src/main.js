import Vue from 'vue'
import vSelect from 'vue-select'
import App from './App.vue'
import router from './router'
import TopBar from './components/TopBar'
import SectionHeader from './components/SectionHeader'
import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false

Vue.component('top-bar', TopBar)
Vue.component('section-header-component', SectionHeader)
Vue.component('v-select', vSelect)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
