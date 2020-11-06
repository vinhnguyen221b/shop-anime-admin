import http from "./httpService";
import { apiEndPoint } from "../config.json";
const api = apiEndPoint + "users/";
export function getUser() {
  return http.get(api);
}

export function createUser(data) {
  return http.post(api + "create", data);
}
export function editUser(id, inputs) {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const data = new FormData();
  data.append("phone", inputs.phone);
  data.append("address", inputs.address);
  data.append("avatar", inputs.avatar);
  return http.put(api + id, data, config);
}

export function deleteUser(id) {
  return http.delete(api + id);
}

export function searchUser(query) {
  return http.get(api + "search/?name=" + query);
}

export default {
  getUser,
  createUser,
  editUser,
  deleteUser,
  searchUser,
};
