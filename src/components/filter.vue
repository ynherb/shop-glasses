<template>
<div class="left-side-bar">
  <div class="form-check">
    <p class="title">Бренд</p>
    <div v-for="(item, key) in checkboxList.brand" :key="key" class="d-flex">
      <input class="form-check-input" type="checkbox" :value="item" v-model="filter.brand" id="item">
      <label class="form-check-label" for="defaultCheck1">{{item}}</label>
    </div>
  </div>
  <div class="form-check">
    <p class="title">Колір</p>
    <div v-for="(item, key) in checkboxList.color" :key="key" class="d-flex">
      <input class="form-check-input" type="checkbox" :value="item" id="defaultCheck1"
      v-model="filter.color">
      <label class="form-check-label" for="defaultCheck1">{{item}}</label>
    </div>
  </div>
  <div class="form-check">
    <p class="title">Стать</p>
    <div v-for="(item, key) in checkboxList.gender" :key="key" class="d-flex">
      <input class="form-check-input" type="checkbox" :value="item" id="defaultCheck1"
      v-model="filter.gender">
      <label class="form-check-label" for="defaultCheck1">{{item}}</label>
    </div>
  </div>
  <range-price
  :maxPrice="checkboxList.maxPrice"
  :priceSort.sync="priceSort">
  </range-price>
  <button type="button" class="btn btn-primary btn-sm" @click="resetFilter">Скинути</button>
  <button type="button" class="btn btn-primary btn-sm" @click="applyFilter">Примінити</button>
</div>
</template>
<script>
import rangePrice from '../components/rangePrice'

export default {
  data () {
    return {
      filter: { // добавляємо сюди властивість і отриамуємо новий фільтр
        brand: [],
        color: [],
        gender: []
      },
      priceSort: {
        min: 0,
        max: null
      }
    }
  },
  props: {
    goods: {
      type: Array,
      required: true
    },
    filtered: {
      type: Array
    }
  },
  computed: {
    checkboxList () {
      let obj = {}
      let maxPrice = 0
      Object.keys(this.filter).forEach(item => (obj[item] = []))
      this.goods.forEach((item) => {
        Object.keys(obj).forEach((index) => {
          if (!obj[index].includes(item[index])) {
            obj[index].push(item[index])
          } if (maxPrice < item.price) {
            maxPrice = item.price
          }
        })
      })
      obj.maxPrice = maxPrice
      return obj
    },
    filteredList () {
      let key = Object.keys(this.filter).filter(item => this.filter[item].length)
      // якщо пареметрів фільтру немає повертаємо весь список товарів
      if (!key.length) return this.goods
      let result = this.goods.filter((item) => {
        return !(key.some(i => !this.filter[i].includes(item[i])))
      })
      return result
    },
    optionFilters () {
      console.log('filter')
      const { min, max } = this.priceSort
      let result = this.filteredList
      if (min > 0 || max < Infinity) {
        result = result.filter(item => item.price >= min && item.price <= max)
      }
      return result
    }
  },
  methods: {
    applyFilter () {
      this.setParamsUrl()
      this.updateData()
    },
    setParamsUrl () {
      let keyParams = Object.keys(this.filter).filter(item => this.filter[item].length)
      const { min, max } = this.priceSort
      let params = {}
      keyParams.forEach((key) => {
        params[key] = this.filter[key].join(',').replace(/ /g, '-')
      })
      if (min > 0 || max < Infinity) {
        params.min = min
        params.max = max
      }
      this.$router.push({ query: params })
    },
    updateData () {
      this.$emit('update:filtered', this.optionFilters)
    },
    resetFilter () {
      this.priceSort.min = 0
      this.priceSort.max = this.checkboxList.maxPrice
      Object.keys(this.filter).forEach((item) => {
        this.filter[item] = []
      })
      this.$router.push('page1')
    }
  },
  components: {
    rangePrice
  },
  watch: {
    goods () {
      console.log('goods', this.goods)
      this.updateData()
    }
  },
  created () {
    let params = this.$route.query
    const key = Object.keys(params)
    key.forEach((item) => {
      console.log(params[item])
      if (item === 'min' || item === 'max') this.priceSort[item] = +params[item]
      else this.filter[item] = params[item].replace(/-/g, ' ').split(',')
    })
  }
}
</script>
<style lang="scss" scoped>
.left-side-bar {
  padding: 20px 30px;
  position: fixed;
  z-index: 100;
  top:0;
  background: silver;
  height: 100vh;
}

.title {
  padding: 20px 0 0 0;
}

.btn {
  margin: 0 5px;
}
</style>
