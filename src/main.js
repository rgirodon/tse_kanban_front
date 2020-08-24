import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import App from './App.vue'
import router from './router'
import store from './store'
import Tasks from './components/Tasks.vue'
import Developers from './components/Developers.vue'
import AddTask from './components/AddTask.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  components : {
    Tasks,
    Developers,
    AddTask
  }, 
  render : h => h(App),
  mounted: function() {
    /*
    store.dispatch('loadTaskStatus');
    store.dispatch('loadTaskTypes');
    */

   store.dispatch('initializeApp');
  }
}).$mount('#app')
