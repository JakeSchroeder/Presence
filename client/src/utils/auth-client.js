import { client, localStorageKey } from "./api-client";
import * as jwt_decode from "jwt-decode";
function handleUserResponse({ user: { token, ...user } }) {
  window.localStorage.setItem(localStorageKey, token);
  return user;
}

function getUser() {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null);
  }
  return client("user/me").then((data) => data.user);
}

function login({ email, password }) {
  return client("user/login", { body: { email, password } }).then(
    handleUserResponse
  );
}

function register({ email, password }) {
  return client("register", { body: { email, password } }).then(
    handleUserResponse
  );
}

function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

function isLoggedIn() {
  return Boolean(getToken());
}

export { login, register, getToken, getUser, isLoggedIn };
export { logout } from "./api-client";
