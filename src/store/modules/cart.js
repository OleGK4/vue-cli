import cartApi from "@/api/cart";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getCartStart: "[cart] Get cart start",
  getCartSuccess: "[cart] Get cart success",
  getCartFailure: "[cart] Get cart failure",

  removeFromCartStart: "[cart] Remove from cart start",
  removeFromCartSuccess: "[cart] Remove from cart success",
  removeFromCartFailure: "[cart] Remove from cart failure",
};

export const actionTypes = {
  getCart: "[cart] Get cart",
  removeFromCart: "[cart] Remove from cart",
};

const mutations = {
  [mutationTypes.getCartStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getCartSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getCartFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },

  [mutationTypes.removeFromCartStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.removeFromCartSuccess](state) {
    state.isLoading = false;
  },
  [mutationTypes.removeFromCartFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },
};

const actions = {
  [actionTypes.getCart](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getCartStart);
      cartApi
        .getProducts()
        .then((response) => {
          context.commit(mutationTypes.getCartSuccess);
          resolve(response.data);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.getCartFailure,
            result.response.data.error.errors
          );
        });
    });
  },
  [actionTypes.removeFromCart](context, productId) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.removeFromCartStart);
      cartApi
        .removeFromCart(productId)
        .then((response) => {
          context.commit(mutationTypes.removeFromCartSuccess);
          resolve(response.data);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.removeFromCartFailure,
            result.response.data.error.errors
          );
        });
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
