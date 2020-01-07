<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse">
      <ul class="nav nav-pills nav-fill w-100">
        <li class="" v-for="item of links" :key="item.name">
          <router-link :to="item.link" active-class="active" class="nav-link text-white">{{item.name}}</router-link>
        </li>
      </ul>
      <div class="nav nav-pills nav-fill float-right">
        <select class="form-control form-control-sm" v-model="selected" @change="setMoney">
          <option v-for="(item, key) in currency" :key="item">{{key}}</option>
        </select>
      </div>
    </div>
  </nav>
</template>
<script>
import Links from '../modules/links'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      selected: 'UAH'
    }
  },
  computed: {
    links: Links,
    ...mapState('privatAPI', ['currency'])
  },
  methods: {
    setMoney () {
      this.$store.commit('privatAPI/SET_CURRENCY', this.selected)
    }
  },
  created () {
    this.$store.dispatch('privatAPI/FETCH_EXCHANGE_RATE')
  }
}
</script>
