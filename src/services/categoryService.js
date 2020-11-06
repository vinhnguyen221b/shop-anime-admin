import http from "./httpService";

import { apiEndPoint } from "../config.json";
const api = apiEndPoint + "categories/";
const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export function getAllCategories() {
  return http.get(api);
}
export function getCategoryById(id) {
  return http.get(api + id);
}

export function createCategory({ name, description, image, thumbnail }) {
  const data = new FormData();
  data.append("name", name);
  data.append("description", description);
  data.append("imgCate", image);
  data.append("imgCate", thumbnail);
  return http.post(api, data, config);
}

export function editCategory(id, { name, description, image, thumbnail }) {
  const data = new FormData();
  data.append("name", name);
  data.append("description", description);
  data.append("imgCate", image);
  data.append("imgCate", thumbnail);
  return http.put(api + id, data, config);
}

export function deleteCategory(id) {
  return http.delete(api + id);
}

export function searchCategory(query) {
  return http.get(api + "search/?name=" + query);
}

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  editCategory,
  deleteCategory,
  searchCategory,
};
