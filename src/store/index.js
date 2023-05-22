import { createStore } from "vuex";
import { loginRequest } from "@/utils/api";
import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/modules/auth";
import products from "@/store/modules/products";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    products,
  },
});
