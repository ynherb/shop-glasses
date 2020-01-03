import Vue from 'vue'
import Vuex from 'vuex'
import product from './product'
import notification from './notification'
import goods from './goods'
import privatAPI from './privatAPI'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    product,
    notification,
    goods,
    privatAPI
  }
})
