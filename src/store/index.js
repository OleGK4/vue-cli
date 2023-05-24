import Vuex from "vuex";
import auth from "@/store/modules/auth";
import products from "@/store/modules/products";
import cart from "@/store/modules/cart";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    products,
    cart,
  },
});
