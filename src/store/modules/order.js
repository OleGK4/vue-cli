import orderApi from "@/api/order";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getOrdersStart: "[order] Get orders start",
  getOrdersSuccess: "[order] Get orders success",
  getOrdersFailure: "[order] Get orders failure",
};

export const actionTypes = {
  getOrders: "[order] Get orders",
};

const mutations = {
  [mutationTypes.getOrdersStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getOrdersSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getOrdersFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },
};

const actions = {
  [actionTypes.getOrders](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getOrdersStart);
      orderApi
        .getOrder()
        .then((response) => {
          context.commit(mutationTypes.getOrdersSuccess, response.data);
          resolve(response.data);
        })
        .catch((result) => {
          if (
            result.response &&
            result.response.data &&
            result.response.data.error
          ) {
            context.commit(
              mutationTypes.getOrdersFailure,
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
