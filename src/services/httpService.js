import axios from "axios";

// function setHeaderCORS() {
//   axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
// }
function setHeaderJWT(jwt) {
  // axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.headers.common["x-auth-token"] = jwt;
}
export default {
  setJwt: setHeaderJWT,
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
