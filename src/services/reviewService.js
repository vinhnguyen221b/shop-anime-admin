import http from "./httpService";
import { apiEndPoint } from "../config.json";
const api = apiEndPoint + "reviews/";

export function getAllReviews() {
  return http.get(api);
}

export function getReviewDetail(id) {
  return http.get(api + id);
}
export function createReview(inputs) {
  const data = new FormData();
  data.append("title", inputs.title);
  data.append("categoryId", inputs.categoryId);
  data.append("thumbnail", inputs.thumbnail);
  data.append("content", inputs.content);
  return http.post(api, data);
}

export function editReview(id, data) {
  return http.put(api + id, data);
}

export function deleteReview(id) {
  return http.delete(api + id);
}

export function searchReview(query) {
  return http.get(api + "search/?title=" + query);
}

export default {
  getAllReviews,
  getReviewDetail,
  createReview,
  editReview,
  deleteReview,
  searchReview,
};
