import axios from "./axios/index";

export default {
  login: (id) => axios.get("/user/login?id=" + id),
  list: () => axios.get("/user/list"),
};
