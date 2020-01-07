<template>
  <div class="col-md-4">
    <div class="card mb-4 shadow-sm img">
      <img :src="images" alt="clocks" class="images">
      <div class="card-body">
        <p class="card-text">{{product.brand}}</p>
        <p class="card-text">{{description}}</p>
        <p class="card-text">{{product.gender}}</p>
        <p class="card-text">{{product.color}}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-secondary" @click="goGoods">Переглянути</button>
            <button type="button" class="btn btn-sm btn-outline-secondary">Добавити</button>
          </div>
          <small class="text-muted">{{currencPrice}}</small>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    currencPrice () {
      let curr = this.$store.getters['privatAPI/GET_MONEY']
      return (this.product.price / curr.money).toFixed(2) + ' ' + curr.cod
    },
    images () {
      const img = this.product.images
      return img[Math.ceil(Math.random() * img.length - 1)]
    },
    description () {
      const str = this.product.description
      return str.slice(0, 70) + '...'
    }
  },
  methods: {
    goGoods () {
      this.$router.push('/product/goods-' + this.product.article)
    }
  }
}
</script>
<style scoped lang="scss">
.images {
  width: 65%;
  margin: 0 auto;
}
</style>
