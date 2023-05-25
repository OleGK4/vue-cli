import axios from "@/api/axios";

const getProducts = (apiUrl) => {
  return axios.get(apiUrl);
};

export default {
  getProducts,
};
