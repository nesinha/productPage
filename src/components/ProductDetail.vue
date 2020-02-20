<template>
<div>
    <!-- Carousel rendering -->
    <div :id="'overlay' + getProductId" class="overlay">
      <!-- Close the carousel -->
      <button type="button" class="btn btn-primary pull-right" v-on:click="hideOverlay()">Close</button>
      <div id="content" v-if="!isHidden">
        <div id="carousel-show" class="carousel slide" data-ride="carousel">
        <!-- Indicators -->
        <ul class="carousel-indicators">
          <li data-target="#carousel-show"
              v-for="(img,idx) in getCarouselImages"
              :key="'c-image-indicator'+idx"
              data-slide-to="idx"
              :class="(idx === 0)? 'active':''"></li>
        </ul>
        <!-- The slideshow -->
        <div class="carousel-inner">
          <div v-for="(img,idx) in getCarouselImages"
                :key="'c-image'+idx"
                :class="(idx === 0) ? 'item active' : 'item'">
            <img :src="img.href" >
          </div>
        </div>
        <!-- Controls -->
        <a class="left carousel-control" href="#carousel-show" data-slide="prev">
          <span class="icon-prev"></span>
        </a>
        <a class="right carousel-control" href="#carousel-show" data-slide="next">
          <span class="icon-next"></span>
        </a>
      </div>
      </div>
    </div>

   <!-- Product rendering --> 
  <div class="row">
    <div class="card">
    <h5 class = "card-header" v-html="getProductName"></h5>
        <div class = "card-body" v-on:click="showOverlay()">
           <img :src="getHeroImageSource"/>
        </div>
        <div class="card-footer text-muted">
            <div> 
             <b>$ {{getPrice}} </b>
            </div>
        </div>
    </div>
  </div>
</div>  
</template>

<script>
export default {
  name: 'ProductDetail',
  props: {
    currentProduct: {
      type: Object
    }
  },
  data () {
    return {
      isHidden: true
    }
  },
  computed: {
      getCarouselImages: function() {
          return (this.currentProduct!==undefined && this.currentProduct.images!==undefined)? this.currentProduct.images: new Array()
      },

      getProductId: function() {
          return (this.currentProduct!==undefined && this.currentProduct.id!==undefined)?this.currentProduct.id: ""
      },

      getProductName: function() {
          return (this.currentProduct!==undefined && this.currentProduct.name!==undefined) ? this.currentProduct.name : "Default-name"
      },
      getHeroImageSource: function(){
          if(this.currentProduct!==undefined && this.currentProduct.hero!==undefined && this.currentProduct.hero.href!==undefined)
            return this.currentProduct.hero.href
          else
            return "#"  
      },

      getPrice: function() {
          if (this.currentProduct!==undefined && 
          this.currentProduct.priceRange!==undefined && 
          this.currentProduct.priceRange.selling!==undefined && 
          this.currentProduct.priceRange.selling.high!==undefined)
          return this.currentProduct.priceRange.selling.high
          else
          return ""
      }
  },
  methods: {
    showOverlay () {
      this.isHidden = !this.isHidden
      let elem = document.getElementById('overlay' + this.getProductId)
      if(elem!=null){
          elem.style.display = 'block'
      }
    },
    hideOverlay () {
      this.isHidden = !this.isHidden
      let elem = document.getElementById('overlay' + this.getProductId)
      if(elem!=null){
          elem.style.display = 'none'
      }
    }
  }
}
</script>


<style scoped>
.overlay {
  position: fixed; /* Sit on top of the page content */
  display: none; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: hsla(0, 0%, 0%, 0.9); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
}
#content{
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 50px;
  color: white;
  transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
}
</style>
