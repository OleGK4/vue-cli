<template>
  <h2>FINAL GUTS!!!</h2>
  <div v-if="isLoading">Loading...</div>
  <div v-if="error">Something bad happened</div>
  <ul v-if="message">
    <li class="success">{{ message }}</li>
  </ul>
  <div v-if="!orders || orders.data.length === 0">You don't have any orders yet!</div>
  <div v-else-if="isLoggedIn && orders.data.length > 0">
    <div class="article-preview" v-for="(order, index) in orders.data" :key="index">
      <h3>ID: {{ order.id }}</h3>
      <p>Products: {{ order.products }}</p>
      <p>Price: {{ order.order_price }}</p>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

import {getterTypes} from '@/store/modules/auth'
import {actionTypes} from "@/store/modules/order";

export default {
  name: "UserOrders",
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.isLoggedIn
    }),
    ...mapState({
      isLoading: state => state.order.isLoading,
      orders: state => state.order.data,
      error: state => state.order.error,
      message: state => state.order.message,
    }),
  },
  mounted() {
    this.getOrders()
  },
  methods: {
    getOrders() {
      this.$store.dispatch(actionTypes.getOrders)
          .catch(error => {
            console.error(error)
            this.error = true
          })
    }
   }
}
</script>

<style scoped>

</style>