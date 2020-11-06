import http from "./httpService";
// import jwtDecode from "jwt-decode";
import { apiEndPoint } from "../config.json";
const api = apiEndPoint + "users/";
const tokenKey = "token";

http.setJwt(getJwt());
export async function login({ email, password }) {
  try {
    const response = await http.post(api + "admin", {
      email,
      password,
    });
    localStorage.setItem(tokenKey, response.data);
    return response.data;
  } catch (error) {
    return { message: error.response.data, status: error.response.status };
  }
}

export async function register({ name, email, password }) {
  return await http.post(api + "register", {
    name,
    email,
    password,
  });
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export async function getUserInfo() {
  return await http.get(api + "me");
}

export async function getCurrentUser() {
  try {
    const { data: user } = await http.get(api + "isValid");
    return user;
  } catch (error) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export default {
  login,
  logout,
  loginWithJwt,
  getCurrentUser,
  getUserInfo,
  register,
  getJwt,
};
