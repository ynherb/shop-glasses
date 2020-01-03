import * as fb from 'firebase'

export default {
  namespaced: true,
  state: {
    goods: {}
  },
  mutations: {
    SET_GOODS (state, goods) {
      const result = goods[Object.keys(goods)[0]]
      state.goods = result
    }
  },
  getters: {
    GET_GOODS (state) {
      return state.goods
    }
  },
  actions: {
    async FETCH_GET_GOODS ({ commit }, id) {
      try {
        const result = await fb.database().ref('product/clocks').orderByChild('article').equalTo(id).once('value')
        if (result.val() == null) throw new Error('Does not exist product')
        commit('SET_GOODS', result.val())
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  }
}
