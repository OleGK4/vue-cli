<template>
  <div>
    <h2>Guts render</h2>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Something bad happened</div>
    <ul v-if="message">
      <li class="success">{{ message }}</li>
    </ul>
    <div v-if="!cart || cart.data.length === 0">Cart is empty</div>
    <div v-else-if="isLoggedIn && cart.data.length > 0">
      <div class="article-preview" v-for="(product, index) in cartWithQuantity" :key="index">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>Price: {{ product.price }}</p>
        <p>Quantity: {{ product.quantity }}</p>
        <button v-on:click="decreaseQuantity(product.id)">-</button>
        <button v-on:click="increaseQuantity(product.product_id)">+</button>
      </div>
      <button v-on:click="order" v-if="cartWithQuantity.length > 0">Order</button>
    </div>
  </div>
</template>


<script>

import {mapGetters, mapState} from 'vuex'

import {getterTypes} from '@/store/modules/auth'
import {actionTypes} from "@/store/modules/cart";

export default {
  name: "UserCart",
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.isLoggedIn
    }),
    ...mapState({
      isLoading: state => state.cart.isLoading,
      cart: state => state.cart.data,
      error: state => state.cart.error,
      message: state => state.cart.message,
    }),
    cartWithQuantity() {
      if(this.cart && this.cart.data){
        return this.cart.data.reduce((result, item) => {
          const existingItem = result.find(i => i.product_id === item.product_id);
          if (existingItem) {
            existingItem.quantity++;
          } else {
            result.push({
              ...item,
              quantity: 1
            });
          }
          return result;
        }, []);
      }
      else return 0
    }
  },
  mounted() {
    this.getCart()
  },
  methods: {
    getCart() {
      this.$store.dispatch(actionTypes.getCart)
          .catch(error => {
            console.error(error)
            this.error = true
          })
    },
    increaseQuantity(productId) {
      this.$store.dispatch(actionTypes.increaseQuantity, productId)
          .then(() => {
            this.getCart();
          })
          .catch(error => {
            console.error(error)
            this.error = true
          })
    },
    decreaseQuantity(productId) {
      this.$store.dispatch(actionTypes.decreaseQuantity, productId)
          .then(() => {
            this.getCart();
          })
          .catch(error => {
            console.error(error)
            this.error = true
          })
    },
    order() {
      this.$store.dispatch(actionTypes.orderProducts)
          .then(() => {
            this.getCart();
          })
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