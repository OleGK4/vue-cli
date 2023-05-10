import axios from "@/api/axios";

const register = (credentials) => {
  return axios.post("/signup", { user: credentials });
};

export default {
  register,
};
