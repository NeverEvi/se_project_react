const baseUrl = "https://my-json-server.typicode.com/NeverEvi/se_project_react"; //"http://localhost:3001";

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
// 	remove: (id) => {
// 		return fetch(`${this._baseUrl}/items/${id}`, {
// 			method: "DELETE",
// 			headers: this._headers,
// 		}).then((res) => this._getResponse(res));
// 	},
// };

/*

All clothing items should be fetched and placed into the application state. 
Make a GET request:
GET https://localhost:3001/items 

POST /items
Make a POST request to add a new clothing item:
POST https://localhost:3001/items 
Pass name, imageUrl, and weather to the request body. Modify the 
corresponding handler for adding a new item in App.js.

DELETE /items/:id
Write a DELETE request:
DELETE https://localhost:3001/items/:id 
Create a corresponding handler for removing an item in the App component.

Run the mock server
To demonstrate your API calls to the code reviewers, add the db.json file to 
your GitHub repository and get your mock server running online by replacing 
the base URL for requests from [http://localhost:3001](http://localhost:3001/) to:
https://my-json-server.typicode.com/ <your-github-username> se_project_react 
Refer to the My JSON Server documentation if you have any issues setting it up.


*/
