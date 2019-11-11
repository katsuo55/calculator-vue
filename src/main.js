import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import KeyboardStore from '@/store/Keyboard'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
  modules: {
    KeyboardStore
  },
  strict: false
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
