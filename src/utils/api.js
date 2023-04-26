const baseUrl = "http://localhost:3001";
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


