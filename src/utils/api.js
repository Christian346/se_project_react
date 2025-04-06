 export const baseUrl = "http://localhost:3001";

function handleResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error : ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`) //returns are for using the .then()
    .then((res) => handleResponse(res));
}

function deleteItem(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    headers:{Authorization: `Bearer ${token}`},
    method: "DELETE",
  }).then((res) => handleResponse(res));
}

function postItem({ name, imageUrl, weather }, token) {
  return fetch(`${baseUrl}/items`, {
    // add authorization: "Bearer token 'embed token in template literal' "
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({
      name,
      imageUrl,
      weather, //it's making the about key value the same as the description property
    }), //accepts an obj as argument and turns into string json formatted.
  }).then((res) => handleResponse(res));
}

function patchItem({ name, avatar }, token) {
  return fetch(`${baseUrl}/users/me`, {
    // add authorization: "Bearer token 'embed token in template literal' "
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "PATCH",
    body: JSON.stringify({
      name,
      avatar, //it's making the about key value the same as the description property
    }), //accepts an obj as argument and turns into string json formatted.
  }).then((res) => handleResponse(res));
}

// getContent accepts the token as an argument.
export const getUserInfo = (token) => {
  // Send a GET request to /users/me
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately
      // formatted value.
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};


// getContent accepts the token as an argument.
export const setUserInfo = ({name, imageUrl},token) => {
  // Send a GET request to /users/me
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately
      // formatted value.
      Authorization: `Bearer ${token}`,
    }, 
    body: JSON.stringify({
      name,
      imageUrl
    })
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

export const addCardLike =(id, token)=>{
   return fetch(`${baseUrl}/items/${id}/likes`, {
     // add authorization: "Bearer token 'embed token in template literal' "
     headers: {
      // "Content-Type": "application/json", // this is only to describe the body if there is one
       Authorization: `Bearer ${token}`,
     },
     method: "PUT",
     
   }).then((res) => handleResponse(res));

}

export const removeCardLike = (id, token)=>{
 return fetch(`${baseUrl}/items/${id}/likes`, {
    headers:{Authorization: `Bearer ${token}`},
    method: "DELETE",
  }).then((res) => handleResponse(res));

}







//you need adding items and deleting items
export { getItems, deleteItem, postItem ,patchItem};
