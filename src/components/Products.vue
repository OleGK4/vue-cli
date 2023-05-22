<template>
  <h2>Product render</h2>
  <button v-on:click="asd">
    Click to check
  </button>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Something bad happend</div>
    <div v-if="products">
      <div
          class="article-preview"
          v-for="(product, index) in products"
          :key="index"
      >
        <div class="article-meta">
          <div class="info">
            <p>{{ product.name }}</p>
            <p>{{ product.description }}</p>
            <p>{{ product.price }}</p>
          </div>
          <div class="pull-xs-right">ADD TO CART</div>
        </div>
<!--        <app-pagination-->
<!--            :total="feed.articlesCount"-->
<!--            :limit="limit"-->
<!--            :url="baseUrl"-->
<!--            :current-page="currentPage"-->
<!--        >-->
<!--        </app-pagination>-->
      </div>
    </div>
  </div>




</template>

<script>
import {mapState} from 'vuex'
import parseUrl from 'query-string'
import stringify from 'query-string'

import {actionTypes} from '@/store/modules/products'
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
  // data() {
  //   return {
  //     products: [
  //       {
  //         id: 1,
  //         name: 'Product name1111111',
  //         description: 'Product description',
  //         price: 'Product price',
  //       },
  //       {
  //         id: 2,
  //         name: 'Product name2222222',
  //         description: 'Product description',
  //         price: 'Product price',
  //       },
  //       {
  //         id: 3,
  //         name: 'Product name33333333',
  //         description: 'Product description',
  //         price: 'Product price',
  //       }
  //     ]
  //   }
  // },
  computed: {
    ...mapState({
      isLoading: state => state.products.isLoading,
      products: state => state.products.data,
      error: state => state.products.error
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
      return this.products.length // Счётчик элементов массива - элемент, где элемент - продукт, потом передаётся через свойства в компонент пагинации
    }
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
      const parsedUrl = parseUrl(this.apiUrl)
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
      this.$store.dispatch(actionTypes.getProducts, {apiUrl: apiUrlWithParams})
    }
  }
}
</script>
