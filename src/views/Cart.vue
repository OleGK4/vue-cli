<template>
  <h1>Your cart!</h1>
  <user-cart></user-cart>
</template>

<script>
import UserCart from '@/components/UserCart'

export default {
  name: "Cart",
  components: {
    UserCart,
  }
}
</script>

<style scoped>

</style>