<template>
  <div id="app">
    <Products title="Our Product List"/>
  </div>
</template>


<script>
import Products from './components/Products.vue'

export default {
  name: 'App',
  components: {
    Products
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
