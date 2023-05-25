import cartApi from "@/api/cart";
import orderApi from "@/api/order";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getCartStart: "[cart] Get cart start",
  getCartSuccess: "[cart] Get cart success",
  getCartFailure: "[cart] Get cart failure",

  decreaseQuantityStart: "[cart] Remove from cart start",
  decreaseQuantitySuccess: "[cart] Remove from cart success",
  decreaseQuantityFailure: "[cart] Remove from cart failure",

  increaseQuantityStart: "[cart] Add to cart start",
  increaseQuantitySuccess: "[cart] Add to cart success",
  increaseQuantityFailure: "[cart] Add to cart failure",

  orderStart: "[cart] Order start",
  orderSuccess: "[cart] Order success",
  orderFailure: "[cart] Order failure",
};

export const actionTypes = {
  getCart: "[cart] Get cart",
  decreaseQuantity: "[cart] Remove from cart",
  increaseQuantity: "[cart] Add to cart",

  orderProducts: "[cart] Order products from cart",
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

  [mutationTypes.decreaseQuantityStart](state) {
    state.isLoading = true;
    state.message = null;
  },
  [mutationTypes.decreaseQuantitySuccess](state, payload) {
    state.isLoading = false;
    state.message = payload;
  },
  [mutationTypes.decreaseQuantityFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },

  [mutationTypes.increaseQuantityStart](state) {
    state.isLoading = true;
    state.message = null;
  },
  [mutationTypes.increaseQuantitySuccess](state, payload) {
    state.isLoading = false;
    state.message = payload;
  },
  [mutationTypes.increaseQuantityFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },

  [mutationTypes.orderStart](state) {
    state.isLoading = true;
    state.message = null;
  },
  [mutationTypes.orderSuccess](state, payload) {
    state.isLoading = false;
    state.message = payload;
  },
  [mutationTypes.orderFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },
};

const actions = {
  [actionTypes.getCart](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getCartStart);
      cartApi
        .getCart()
        .then((response) => {
          context.commit(mutationTypes.getCartSuccess, response.data);
          resolve(response.data);
        })
        .catch((result) => {
          if (
            result.response &&
            result.response.data &&
            result.response.data.error
          ) {
            context.commit(
              mutationTypes.getCartFailure,
              result.response.data.error.message
            );
          }
        });
    });
  },
  [actionTypes.decreaseQuantity](context, productId) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.decreaseQuantityStart);
      cartApi
        .decreaseQuantity(productId)
        .then((response) => {
          context.commit(
            mutationTypes.decreaseQuantitySuccess,
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
              mutationTypes.decreaseQuantityFailure,
              result.response.data.error.message
            );
          }
        });
    });
  },
  [actionTypes.increaseQuantity](context, productId) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.increaseQuantityStart);
      cartApi
        .increaseQuantity(productId)
        .then((response) => {
          context.commit(
            mutationTypes.increaseQuantitySuccess,
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
              mutationTypes.increaseQuantityFailure,
              result.response.data.error.message
            );
          }
        });
    });
  },

  [actionTypes.orderProducts](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.orderStart);
      orderApi
        .order()
        .then((response) => {
          context.commit(
            mutationTypes.orderSuccess,
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
              mutationTypes.orderFailure,
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
