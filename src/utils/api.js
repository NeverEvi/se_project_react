export default class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}
	_getResponse(res) {
		//wait for response
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Error ${res.status}`);
	}
	getAppInfo() {
		return Promise.all([]);
	}

	getClothingItems() {
		//GET clothing items from server
		return fetch(`${this._baseUrl}/items`, {
			method: "GET",
			headers: this._headers,
		}).then((res) => this._getResponse(res));
	}
	addNewClothingItem(name, imageUrl, weather) {
		//POST clothing item to server
		return fetch(`${this._baseUrl}/items`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({
				name,
				imageUrl,
				weather,
			}),
		}).then((res) => this._getResponse(res));
	}
	deleteClothingItem(id) {
		return fetch(`${this._baseUrl}/items/${id}`, {
			method: "DELETE",
			headers: this._headers,
		}).then((res) => this._getResponse(res));
	}
}
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
