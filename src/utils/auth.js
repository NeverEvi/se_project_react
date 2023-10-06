const baseUrl = "http://localhost:3001";

const getResponse = (res) => {
	console.log(res);
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Error ${res.status}`);
};

export const signUp = ({ name, avatar, email, password }) => {
	return fetch(`${baseUrl}/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, avatar, email, password }),
	}).then(getResponse);
};

export const signIn = ({ email, password }) => {
	console.log("Attempting to LOG IN");
	return fetch(`${baseUrl}/signin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	}).then(getResponse);
};
export const checkToken = (token) => {
	return fetch(`${baseUrl}/users/me`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`,
		},
	}).then(getResponse);
};
