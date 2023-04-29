const baseUrl = "http://localhost:3001"; //"https://my-json-server.typicode.com/NeverEvi/se_project_react";

export const getItems = () => {
	const itemsApi = fetch(`${baseUrl}/items`).then((res) => {
		if (res.ok) {
			return res.json();
		} else {
			return Promise.reject(`Error: ${res.status}`);
		}
	});
	return itemsApi;
};
export const setItems = ({ name, imageUrl, weather }) => {
	const newItem = fetch(`${baseUrl}/items`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			name,
			imageUrl,
			weather,
		}),
	}).then((res) => {
		if (res.ok) {
			return res.json();
		} else {
			return Promise.reject(`Error: ${res.status}`);
		}
	});
	return newItem;
};
export const removeItems = (id) => {
	const removed = fetch(`${baseUrl}/items/${id}`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
	}).then((res) => {
		if (res.ok) {
			return res.json();
		} else {
			return Promise.reject(`Error: ${res.status}`);
		}
	});
	return removed;
};
