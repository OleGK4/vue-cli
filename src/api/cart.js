import axios from "@/api/axios";

const getCart = () => {
  return axios.get("/cart");
};

const removeFromCart = (productId) => {
  return axios.delete(`/cart/${productId}`);
};

export default {
  getCart,
  removeFromCart,
};
