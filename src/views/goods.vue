<template>
<div>
<loading-component v-if="loading"></loading-component>
  <main class="mt-5 pt-4" v-else>
    <div class="container dark-grey-text mt-5">
      <div class="row wow fadeIn">
        <div class="col-md-6 mb-4">
          <img :src="goods.images[2]" class="img-fluid" alt="">
        </div>
        <div class="col-md-6 mb-4">
          <div class="p-4">
            <p class="lead font-weight-bold">Опис</p>
            <p>{{goods.description}}</p>
            <div class="d-flex container">
              <div class="row">
                <div class="col-6">
                  <p class="lead font-weight-bold">Бренд</p>
                  <p>{{goods.brand}}</p>
                </div>
              <div class="col-6">
                <p class="lead font-weight-bold">Артикул</p>
                <p>{{goods.article}}</p>
              </div>
              <div class="col-6">
                <p class="lead font-weight-bold">Колір</p>
                <p>{{goods.color}}</p>
              </div>
              <div class="col-6">
                <p class="lead font-weight-bold">Для кого</p>
                <p>{{goods.gender}}</p>
              </div>
              <div class="col-6">
                <p class="lead font-weight-bold">Ціна</p>
                <transition name="fade">
                <p>{{currencPrice}}</p>
                </transition>
              </div>
              <div class="col-6">
                <p class="lead font-weight-bold">Залишок</p>
                <p>{{goods.size}}</p>
              </div>
            </div>
          </div>
            <form class="d-flex justify-content-center">
              <input type="number" value="1" aria-label="Search" class="form-control" style="width: 100px">
              <button class="btn btn-primary btn-md my-0 p" type="submit">Add to cart
                <i class="fas fa-shopping-cart ml-1"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
      <hr>
    </div>
  </main>
</div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('notification', ['loading']),
    goods () {
      return this.$store.getters['goods/GET_GOODS']
    },
    currencPrice () {
      let curr = this.$store.getters['privatAPI/GET_MONEY']
      return (this.goods.price / curr.money).toFixed(2) + ' ' + curr.cod
    }
  },
  created () {
    this.$store.commit('notification/SET_LOADING', true)
    this.$store.dispatch('goods/FETCH_GET_GOODS', +this.$route.params.id)
      .catch((err) => {
        console.log(err)
        this.$router.push('/404')
      })
      .finally(() => {
        this.$store.commit('notification/SET_LOADING', false)
      })
  }
}
</script>
<style lang="scss">
.carousel-inner {
  background: silver;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
