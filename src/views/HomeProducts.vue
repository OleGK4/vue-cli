<template>
  <div class="home">
    <h1>All stuff here!</h1>
  </div>
  <div class="col-md-9">
    <mcv-feed :api-url="apiUrl"></mcv-feed>
  </div>
</template>

<script>
import Products from '@/components/Products.vue'

export default {
  name: 'AppGlobalFeed',
  components: {
    Products
  },
  data() {
    return {
      apiUrl: '/articles'
    }
  }
}

</script>
