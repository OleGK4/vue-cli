import authApi from "@/api/auth";
import { setItem } from "@/helpers/persistanceStorage";

const state = {
  isSubmitting: false,
  isLoggedIn: null,
  validationErrors: null,
};

export const mutationTypes = {
  registerStart: "[auth] Register start",
  registerSuccess: "[auth] Register success",
  registerFailure: "[auth] Register failure",

  loginStart: "[auth] Login start",
  loginSuccess: "[auth] Login success",
  loginFailure: "[auth] Login failure",

  logout: "[auth] Logout",
};

export const actionTypes = {
  register: "[auth] Register",
  login: "[auth] Login",
  logout: "[auth] Logout",
};

export const getterTypes = {
  isLoggedIn: "[auth] isLoggedIn",
};

const getters = {
  [getterTypes.isLoggedIn]: (state) => {
    return Boolean(state.isLoggedIn);
  },
};

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false;
    state.isLoggedIn = true;
    state.currentUserToken = payload;
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false;
    state.isLoggedIn = true;
    state.currentUserToken = payload;
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  [mutationTypes.logout](state) {
    state.isLoggedIn = false;
  },
};

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise(() => {
      context.commit(mutationTypes.registerStart);
      authApi
        .register(credentials)
        .then((response) => {
          context.commit(
            mutationTypes.registerSuccess,
            response.data.data.user_token
          );
          setItem("accessToken", response.data.data.user_token);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.registerFailure,
            result.response.data.error.errors
          );
        });
    });
  },
  [actionTypes.login](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.loginStart);
      authApi
        .login(credentials)
        .then((response) => {
          context.commit(
            mutationTypes.loginSuccess,
            response.data.data.user_token
          );
          setItem("accessToken", response.data.data.user_token);
        })
        .catch((result) => {
          if (
            result.response &&
            result.response.data &&
            result.response.data.error
          ) {
            context.commit(
              mutationTypes.loginFailure,
              result.response.data.error.message
            );
          }
        });
    });
  },
  [actionTypes.logout](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.logout);
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
