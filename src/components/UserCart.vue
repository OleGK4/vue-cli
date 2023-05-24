
<template>
  <div>
    <h2>Guts render</h2>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Something bad happened</div>
    <div v-if="cart.length === 0">Cart is empty</div>
    <div v-else-if="isLoggedIn && cart.length > 0">
      <div class="article-preview" v-for="(product, index) in cartWithQuantity" :key="product.id">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>{{ product.price }}</p>
        <p>{{ product.id }}</p>
        <p>Quantity: {{ product.quantity }}</p>
        <button v-on:click="decreaseQuantity(index)">-</button>
        <button v-on:click="increaseQuantity(index)">+</button>
        <button v-on:click="removeFromCart(index)">Remove</button>
      </div>
      <button v-on:click="checkout" v-if="cartWithQuantity.length > 0">Order</button>
    </div>
  </div>
</template>


<script>

import {mapGetters, mapState} from 'vuex'

import {getterTypes} from '@/store/modules/auth'

export default {
  name: "UserCart",
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.isLoggedIn
    }),
    ...mapState({
      isLoading: state => state.cart.isLoading,
      // cart: state => state.cart.data,
      error: state => state.cart.error
    }),
    data() {
      return {
        cart: [
          {
            "id": 1,
            "product_id": 1,
            "name": "Product name 1",
            "description": "sfghdsfghsrf"
          },
          {
            "id": 2,
            "product_id": 1,
            "name": "Product name 1",
            "description": "dzfgsdf"
          },
          {
            "id": 1,
            "product_id": 2,
            "name": "Product name 2",
            "description": "srtyhdrghdrgffghjfdghjfgh"
          }
        ]
      }
    },
    cartWithQuantity() {
      // Group identical items and calculate the quantity
      return this.cart.reduce((result, item) => {
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
  },

}
</script>

<style scoped>

</style>