<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'login'}">
              Have an account?
            </router-link>
          </p>
          <app-validation-errors
              v-if="validationErrors"
              :validation-errors="validationErrors"
          ></app-validation-errors>
          <form v-on:submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="FIO"
                  v-model="fio"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="password"
              />
            </fieldset>
            <button
                class="btn btn-lg btn-primary pull-xs-right"
                :disabled="isSubmitting"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

import {actionTypes} from '@/store/modules/auth'
import AppValidationErrors from "@/components/ValidationErrors";

export default {
  name: 'McvRegister',
  components: {
    AppValidationErrors,
  },
  data() {
    return {
      email: '',
      password: '',
      fio: ''
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      validationErrors: state => state.auth.validationErrors
    })
  },
  methods: {
    onSubmit() {
      this.$store.dispatch(actionTypes.register, {
            email: this.email,
            fio: this.fio,
            password: this.password
          })
          .then(() => {
            this.$router.push({name: 'home'})
          })
    }
  }
}
</script>
