<template>
  <div class="products container">
    <h1>{{ title }}</h1>
    <div class="col-sm-4" v-for="product in products" :key="product.id">
      <ProductDetail :currentProduct="product" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ProductDetail from './ProductDetail'

export default {
  name: 'Products',
  components: {
    ProductDetail
  },
  props: {
    title: String
  },
  data() {
    return {
      products: []
    }
  },
  methods: {
    async fetchProducts () {
      const response = await axios.get('./index.json')
      if(response!== undefined && response.data!==undefined)
        this.products = response.data.groups
    }
  },
  created: function () {
    this.fetchProducts()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
