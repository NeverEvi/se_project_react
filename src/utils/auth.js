const baseUrl = "http://localhost:3001";

const getResponse = (res) => {
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
	return fetch(`${baseUrl}/signin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	}).then(getResponse);
};

export const editProfile = ({ name, avatarUrl }) => {
	const avatar = avatarUrl;
	return fetch(`${baseUrl}/users/me`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${localStorage.getItem("jwt")}`,
		},
		body: JSON.stringify({ name, avatar }),
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
