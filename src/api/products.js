import axios from "@/api/axios";

const getProducts = (apiUrl) => {
  return axios.get(apiUrl);
};

const addToCart = (productId) => {
  return axios.post(`/cart/${productId}`);
};

export default {
  getProducts,
  addToCart,
};
