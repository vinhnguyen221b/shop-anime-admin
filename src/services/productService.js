import http from "./httpService";

import { apiEndPoint } from "../config.json";
const api = apiEndPoint + "products/";
const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data",
  },
};
export function getAllProducts() {
  return http.get(api);
}

export function getProductDetails(id) {
  return http.get(api + id);
}

export function createProduct(inputs) {
  const {
    title,
    categoryId,
    storyline,
    author,
    price,
    trailer,
    duration,
    imdb,
    release,
    poster,
    thumbnail,
  } = inputs;
  const data = new FormData();
  data.append("title", title);
  data.append("category", categoryId);
  data.append("storyline", storyline);
  data.append("author", author);
  data.append("price", price);
  data.append("trailer", trailer);
  data.append("duration", duration);
  data.append("imdb", imdb);
  data.append("release", release);
  data.append("imgProduct", poster);
  data.append("imgProduct", thumbnail);
  return http.post(api, data, config);
}

export function editProduct(id, inputs) {
  const { price, trailer, numberInstore, stars, poster, thumbnail } = inputs;
  const data = new FormData();
  data.append("price", price);
  data.append("trailer", trailer);
  data.append("numberInstore", numberInstore);
  data.append("stars", stars);
  data.append("imgProduct", poster);
  data.append("imgProduct", thumbnail);
  return http.put(api + id, data, config);
}

export function deleteProduct(id) {
  return http.delete(api + id);
}

export function searchProduct(query) {
  return http.get(api + "search/?title=" + query);
}

export default {
  getAllProducts,
  getProductDetails,
  createProduct,
  editProduct,
  deleteProduct,
  searchProduct,
};
