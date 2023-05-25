import axios from "@/api/axios";

const getCart = () => {
  return axios.get("/cart");
};

const increaseQuantity = (productId) => {
  return axios.post(`/cart/${productId}`);
};

const decreaseQuantity = (productId) => {
  return axios.delete(`/cart/${productId}`);
};

export default {
  getCart,
  increaseQuantity,
  decreaseQuantity,
};
