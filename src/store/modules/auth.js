import authApi from "@/api/auth";
import { removeItem, setItem } from "@/helpers/persistanceStorage";

const state = {
  isSubmitting: false,
  isLoggedIn: null,
  validationErrors: null,
  currentUserToken: null,
};

export const mutationTypes = {
  registerStart: "[auth] Register start",
  registerSuccess: "[auth] Register success",
  registerFailure: "[auth] Register failure",

  loginStart: "[auth] Login start",
  loginSuccess: "[auth] Login success",
  loginFailure: "[auth] Login failure",

  logoutStart: "[auth] Logout start",
  logoutSuccess: "[auth] Logout success",
  logoutFailure: "[auth] Logout failure",
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
  [mutationTypes.logoutStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.logoutSuccess](state) {
    state.currentUserToken = null;
    state.isLoggedIn = false;
    state.isSubmitting = false;
  },
  [mutationTypes.logoutFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
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
      context.commit(mutationTypes.logoutStart);
      authApi
        .logout()
        .then((response) => {
          context.commit(mutationTypes.logoutSuccess);
          removeItem("accessToken");
        })
        .catch((result) => {
          if (
            result.response &&
            result.response.data &&
            result.response.data.error
          ) {
            context.commit(
              mutationTypes.logoutFailure,
              result.response.data.error.message
            );
          }
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
