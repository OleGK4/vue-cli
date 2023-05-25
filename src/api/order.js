import axios from "@/api/axios";

const getOrder = () => {
  return axios.get(`/order`);
};

const order = () => {
  return axios.post(`/order`);
};

export default {
  getOrder,
  order,
};
