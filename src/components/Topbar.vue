<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{name: 'home'}">
        DrugShop
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'cart'}">
              My cart
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'orders'}">
              My orders
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'home'}" v-on:click="logOut">
              Logout
            </router-link>
          </li>
        </template>
        <template v-if="!isLoggedIn">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'login'}">
              Sign in
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'register'}">
              Sign up
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import {mapGetters} from 'vuex'
import {actionTypes, getterTypes} from '@/store/modules/auth'

export default {
  name: 'appTopbar',
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.isLoggedIn
    })
  },
  methods: {
    logOut() {
      this.$store.dispatch(actionTypes.logout)
          .then(() => {
            this.$router.push({name: 'home'})
          })
    }
  }
}
</script>
