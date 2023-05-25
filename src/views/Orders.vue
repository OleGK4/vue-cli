<template>
  <h1>Here are your orders!</h1>
  <user-orders></user-orders>
</template>

<script>
import UserOrders from "@/components/UserOrders"

export default {
  name: "Orders",
  components: {
    UserOrders,
  }
}
</script>

<style scoped>

</style>