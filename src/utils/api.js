const baseUrl =
	process.env.NODE_ENV === "production"
		? "api.wtwr.strangled.net"
		: "http://localhost:3001";
//const baseUrl = "https://my-json-server.typicode.com/NeverEvi/se_project_react";

export function request(url, options) {
	return fetch(url, options).then(getResponse);
}

export const getResponse = (res) => {
	if (res.ok) {
		return res.json();
	} else {
		return Promise.reject(`Error: ${res.status}`);
	}
};

export const getItems = () => {
	const itemsApi = request(`${baseUrl}/items`);
	return itemsApi;
};
export const setItems = ({ name, imageUrl, weather }, token) => {
	const newItem = request(`${baseUrl}/items`, {
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
	});
	return newItem;
};
export const removeItems = (id, token) => {
	const removed = request(`${baseUrl}/items/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`,
		},
	});
	return removed;
};

export const addCardLike = (id, user, token) => {
	return request(`${baseUrl}/items/${id}/likes`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ user }),
	});
};
export const removeCardLike = (id, user, token) => {
	return request(`${baseUrl}/items/${id}/likes`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ user }),
	});
};

/*export const getItems = () => {
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
*/
