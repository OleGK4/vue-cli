<template>
  <h2>Product render</h2>
  <div>
    <div v-if="isLoading">Loading...</div>
    <ul v-if="message">
      <li class="success">{{ message }}</li>
    </ul>
    <div v-if="error">Something bad happened</div>
    <div v-if="products">
      <div class="article-preview" v-for="(product, index) in products.data" :key="index" >
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>Price: {{ product.price }}</p>
        <p>ID: {{ product.id }}</p>
        <button
            :disabled="!isLoggedIn"
            v-on:click="addProduct(product.id)"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
<!--  Намного позже понял, что пагинации на back-end нет и мостить пагинацию на front-end - костыль,
      потому пагинация и не работает от слова совсем, всегда возвращается полный массив объектов, имеющий в себе
      уже использованные в отображении данные-->
  <app-pagination
      :total="totalCount"
      :limit="limit"
      :url="baseUrl"
      :current-page="currentPage"
  >
  </app-pagination>
</template>



<script>
import {mapGetters, mapState} from 'vuex'
import queryString from 'query-string'

import {actionTypes} from '@/store/modules/products'

import {getterTypes} from '@/store/modules/auth'
import AppPagination from '@/components/Pagination'
import {limit} from '@/helpers/vars'

export default {
  name: 'Products',
  components: {
    AppPagination
  },
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.isLoggedIn
    }),
    ...mapState({
      isLoading: state => state.products.isLoading,
      products: state => state.products.data,
      error: state => state.products.error,
      message: state => state.products.message,
    }),
    limit() {
      return limit
    },
    baseUrl() {
      return this.$route.path
    },
    currentPage() {
      return Number(this.$route.query.page || '1')
    },
    offset() {
      return this.currentPage * limit - limit
    },
    totalCount() {
      if (this.products && this.products.data) { // Счётчик элементов массива - элемент, где элемент - продукт, потом передаётся через свойства в компонент пагинации
        return this.products.data.length
      } else {
        return 0
      }
    },
  },
  watch: {
    currentPage() {
      this.fetchProducts()
    }
  },
  mounted() {
    this.fetchProducts()
  },
  methods: {
    fetchProducts() {
      const parsedUrl = queryString.parseUrl(this.apiUrl)
      const stringifiedParams = queryString.stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
      this.$store.dispatch(actionTypes.getProducts, {apiUrl: apiUrlWithParams})
          .catch(error => {
            console.error(error)
            this.error = true
          })
    },
    addProduct(productId) {
      this.$store.dispatch(actionTypes.addToCart, productId)
          .catch(error => {
            console.error(error)
            this.error = true
          })
    }
  }
}
</script>
<style>
</style>
