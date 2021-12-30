import axios from "./axios/index";

export default {
  userList: () => axios.post("/users"),
};
