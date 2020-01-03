import axios from 'axios'

export default {
  namespaced: true,
  state: {
    currency: {
      UAH: 1
    },
    money: 'UAH'
  },
  getters: {
    GET_MONEY (state) {
      const cod = state.money
      const money = state.currency[cod]
      console.log(1)
      return { money, cod }
    }
  },
  mutations: {
    SET_EXCHANGE_RATE (state, currency) {
      let obj = Object.assign({}, state.currency)
      currency.forEach((item) => {
        if (item.ccy !== 'BTC') obj[item.ccy] = +item.sale
      })
      state.currency = Object.freeze(obj)
    },
    SET_CURRENCY (state, money) {
      state.money = money
    }
  },
  actions: {
    async FETCH_EXCHANGE_RATE ({ commit }) {
      const response = await axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
      const data = response.data
      commit('SET_EXCHANGE_RATE', data)
    }
  }
}
