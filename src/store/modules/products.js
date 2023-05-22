import productsApi from "@/api/products";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getProductsStart: "[products] Get products start",
  getProductsSuccess: "[products] Get products success",
  getProductsFailure: "[products] Get products failure",
};

export const actionTypes = {
  getProducts: "[products] Get products",
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
        .catch(() => {
          context.commit(mutationTypes.getProductsFailure);
        });
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
