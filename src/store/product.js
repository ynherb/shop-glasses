import * as fb from 'firebase'

export default {
  namespaced: true,
  state: {
    product: {},
    pagination: 0
  },
  getters: {
    GET_PRODUCT (state) {
      let key = Object.keys(state.product)
      let productList = []
      key.forEach((item) => {
        productList = productList.concat(state.product[item])
      })
      return productList
    }
  },
  mutations: {
    SET_PRODUCT_LIST (state, payload) {
      const obj = {}
      const name = Object.keys(payload)
      for (let key of name) {
        obj[key] = []
        Object.keys(payload[key]).forEach((item) => {
          obj[key].push(payload[key][item])
        })
      }
      // Заморозка відбувається і для вкладених об'єктів
      Object.freeze(obj)
      state.product = obj
    }
  },
  actions: {
    async FETCH_PRODUCT_LIST ({ commit }) {
      try {
        const fbVal = await fb.database().ref('product').once('value')
        commit('SET_PRODUCT_LIST', fbVal.val())
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  }

}
