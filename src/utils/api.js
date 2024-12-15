const baseUrl = "http://localhost:3001";

function handleResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error : ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`) //returns are for using the .then()
    .then((res) => handleResponse(res));
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    /* headers: "headers", */
    method: "DELETE",
  }).then((res) => handleResponse(res));
}

function postItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      name,
      imageUrl,
      weather, //it's making the about key value the same as the description property
    }), //accepts an obj as argument and turns into string json formatted.
  }).then((res) => handleResponse(res));
}

//you need adding items and deleting items
export { getItems, deleteItem, postItem };
