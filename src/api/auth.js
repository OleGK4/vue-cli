import axios from "@/api/axios";

const register = (credentials) => {
  return axios.post("/signup", credentials);
};

const login = (credentials) => {
  return axios.post("/login", credentials);
};

const logout = () => {
  return axios.get("/logout");
};

export default {
  register,
  login,
  logout,
};
