<template>
  <div id="app">
    <menu-component></menu-component>
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import menuComponent from './components/menu'

export default {
  components: {
    menuComponent
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

a {
    outline: none;
}

</style>
