const baseUrl = "http://localhost:3001";
//const baseUrl = "https://my-json-server.typicode.com/NeverEvi/se_project_react";

export const getResponse = (res) => {
	if (res.ok) {
		return res.json();
	} else {
		return Promise.reject(`Error: ${res.status}`);
	}
};

export const getItems = () => {
	const itemsApi = fetch(`${baseUrl}/items`).then(getResponse);
	return itemsApi;
};
export const setItems = ({ name, imageUrl, weather }, token) => {
	const newItem = fetch(`${baseUrl}/items`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			name,
			imageUrl,
			weather,
		}),
	}).then(getResponse);
	return newItem;
};
export const removeItems = (id, token) => {
	const removed = fetch(`${baseUrl}/items/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`,
		},
	}).then(getResponse);
	return removed;
};

export const addCardLike = (id, user, token) => {
	return fetch(`${baseUrl}/items/${id}/likes`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ user }),
	}).then(getResponse);
};
export const removeCardLike = (id, user, token) => {
	return fetch(`${baseUrl}/items/${id}/likes`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ user }),
	}).then(getResponse);
};
