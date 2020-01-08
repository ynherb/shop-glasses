<template>
<div>

</div>
</template>
<script>
export default {
  props: ['product'],
  methods: {
    goGoods () {
      this.$router.push('/product/goods-' + this.product.article)
    }
  }
}
</script>
