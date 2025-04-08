import { baseUrl as BASE_URL}  from "./api";
import { handleResponse } from "./api";

export const signup = (name, password, email, avatarUrl) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, password, email, avatar: avatarUrl }),
  }).then((res) => handleResponse(res));
};


export const signin = (email,password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({password, email }), //{password: "jsmith@yahoo.com, email: 12345"}
  }).then((res) => handleResponse(res));
};

