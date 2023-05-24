<template>
  <div class="home">
    <h1>All stuff here!</h1>
  </div>
  <div class="d-flex justify-content-center">
      <products :api-url="apiUrl"></products>
  </div>
</template>

<script>
import Products from '@/components/Products.vue'

export default {
  name: 'appProducts',
  components: {
    Products
  },
  data() {
    return {
      apiUrl: '/products'
    }
  }
}

</script>
