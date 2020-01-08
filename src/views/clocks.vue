<template>
<div>
  <loading-component
  v-show="loading"
  :key="loading-true">
  </loading-component>
  <filter-component :goods="goods" :filtered.sync="filtered" v-show="showFilter"> </filter-component>
  <div v-show="!loading" :key="loading-false">
    <button @click="showFilter = !showFilter">Фільтр</button>
    <div class="container d-flex p-4 flex-wrap">
      <listProduct-component
        v-for="(item, key) in viewProduct"
        :product="item"
        :key="key">
      </listProduct-component>
    </div>
  </div>
  <pagination-component
    :key="123321"
    v-if="total"
    v-show="!loading"
    :total="total">
  </pagination-component>
</div>
</template>
<script>
import listProductComponent from '../components/listProduct'
import paginationComponent from '../components/pagination'
import filterComponent from '../components/filter'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      pages: 12, // скільки товарів відображати на одній сторонці
      filtered: [],
      showFilter: false
    }
  },
  computed: {
    ...mapState('notification', ['loading']),
    goods () {
      // получаємо всі товари
      return this.$store.getters['product/GET_PRODUCT']
    },
    viewProduct () {
      // обережно тут відбувається неявне перетворення типів
      const from = this.pages * (this.$route.params.id - 1)
      const to = this.pages * this.$route.params.id
      // if (this.goods.length) {
      // this.$store.commit('notification/SET_LOADING', true)
      // this.loadingFlag()
      // }
      return this.filterGoods.slice(from, to)
    },
    total () {
      return Math.ceil((this.filterGoods.length - 1) / this.pages)
    },
    filterGoods () {
      return (this.filtered.length === 0) ? this.goods : this.filtered
    }
  },
  methods: {
    loadingFlag () {
      // симуляция підгрузки з сервера
      setTimeout(() => {
        this.$store.commit('notification/SET_LOADING', false)
      }, 300)
    }
  },
  created () {
    console.log(2)
    this.$store.commit('notification/SET_LOADING', true)
    this.$store.dispatch('product/FETCH_PRODUCT_LIST').finally(() => {
      this.$store.commit('notification/SET_LOADING', false)
    })
  },
  components: {
    listProductComponent,
    paginationComponent,
    filterComponent

  }
}

</script>
<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
