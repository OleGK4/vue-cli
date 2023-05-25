import productsApi from "@/api/products";
import cartApi from "@/api/cart";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getProductsStart: "[products] Get products start",
  getProductsSuccess: "[products] Get products success",
  getProductsFailure: "[products] Get products failure",

  addCartStart: "[product] Add cart start",
  addToCartSuccess: "[product] Add to cart success",
  addToCartFailure: "[product] Add to cart failure",
};

export const actionTypes = {
  getProducts: "[products] Get products",
  addToCart: "[product] Add to cart",
};

const mutations = {
  [mutationTypes.getProductsStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getProductsSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getProductsFailure](state) {
    state.isLoading = false;
  },

  [mutationTypes.addCartStart](state) {
    state.message = null;
    state.isLoading = true;
  },
  [mutationTypes.addToCartSuccess](state, payload) {
    state.isLoading = false;
    state.message = payload;
  },
  [mutationTypes.addToCartFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },
};

const actions = {
  [actionTypes.getProducts](context, { apiUrl }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getProductsStart, apiUrl);
      productsApi
        .getProducts(apiUrl)
        .then((response) => {
          context.commit(mutationTypes.getProductsSuccess, response.data);
          resolve(response.data);
        })
        .catch((result) => {
          if (
            result.response &&
            result.response.data &&
            result.response.data.error
          ) {
            context.commit(
              mutationTypes.getProductsFailure,
              result.response.data.error.message
            );
          }
        });
    });
  },

  [actionTypes.addToCart](context, productId) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.addCartStart);
      cartApi
        .increaseQuantity(productId)
        .then((response) => {
          context.commit(
            mutationTypes.addToCartSuccess,
            response.data.data.message
          );
          resolve(response.data);
        })
        .catch((result) => {
          if (
            result.response &&
            result.response.data &&
            result.response.data.error
          ) {
            context.commit(
              mutationTypes.addToCartFailure,
              result.response.data.error.message
            );
          }
        });
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
