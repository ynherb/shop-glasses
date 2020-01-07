<template>
<nav aria-label="Page navigation example">
  <ul class="pagination d-flex justify-content-center">
    <li class="page-item prevPage disable"
      v-show="page > buttonMin"
      @click.prevent="pageClick(1)">
      <a class="page-link" href="#">1</a>
    </li>
    <li
      class="page-item prevPage page-link page-dasabled"
      v-show="page > buttonMin">
      ...
    </li>
    <li
      class="page-item"
      v-for="(item, key) in totaly"
      :key="key"
      @click.prevent="pageClick(item)"
      :class="{ active: page == item }">
      <a class="page-link" href="#">{{item}}</a>
    </li>
      <li
        class="page-item page-link page-dasabled"
        v-show="buttonMax < total">
        ...
      </li>
    <li
      class="page-item"
      v-show="buttonMax < total"
      @click.prevent="pageClick(total)">
      <a class="page-link" href="#">{{total}}</a>
    </li>
  </ul>
</nav>
</template>
<script>
export default {
  data () {
    return {
      page: 1,
      listPage: [1, 2, 3, 4, 5] // змінивши довжину массива зміниться кількість кнопок на pagination
    }
  },
  props: {
    total: {
      type: Number, // кількість сторінок
      required: true
    }
  },
  computed: {
    buttonMin () {
      const min = Math.ceil(this.listPage.length / 2)
      return (this.total > 5) ? min : this.total
    },
    buttonMax () {
      const max = Math.floor(this.listPage.length / 2) + this.page
      return (this.total > 5) ? max : this.total
    },
    totaly () {
      if (this.total < this.listPage.length) {
        // якщо кількість сторінок меньше 5 то відображаємо відразу всі
        this.draw(new Array(this.total).fill(1).map((i, index) => index + 1))
      } else if (this.listPage.length !== 5 && this.total > this.listPage.length) {
        this.draw([1, 2, 3, 4, 5])
      }
      if (this.total < +this.$route.params.id) this.pageClick(1)
      return this.listPage
    }
  },
  methods: {
    pageClick (next) {
      this.page = next
      this.$router.push('page' + next)
    },
    draw (arr) {
      this.listPage = arr
    }
  },
  watch: {
    page (next) {
      if (this.total < this.page) {
        this.$router.push('404')
      }
      let counter = next - this.buttonMin
      if (this.page < this.buttonMin) counter = 0
      else if (this.buttonMax >= this.total) counter = this.total - this.listPage.length
      this.listPage = this.listPage.map(x => ++counter)
    },
    $route () {
      this.page = +this.$route.params.id
    }
  },
  created () {
    this.page = +this.$route.params.id
  }
}
</script>
<style lang="scss" scoped>
.pagination {
  margin: 0px auto 70px auto;
}
.page-item {
  margin: 0 5px;
}
.Page {
  margin: 50px 0;
}
.page-dasabled:hover {
  background: none;
  cursor: default;
}
</style>
