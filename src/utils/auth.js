import { request } from "./api";
const baseUrl = "http://localhost:3001";

export const signUp = ({ name, avatar, email, password }) => {
	return request(`${baseUrl}/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, avatar, email, password }),
	});
};

export const signIn = ({ email, password }) => {
	return request(`${baseUrl}/signin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});
};

export const editProfile = ({ name, avatarUrl }) => {
	const avatar = avatarUrl;
	return request(`${baseUrl}/users/me`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${localStorage.getItem("jwt")}`,
		},
		body: JSON.stringify({ name, avatar }),
	});
};

export const checkToken = (token) => {
	return request(`${baseUrl}/users/me`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`,
		},
	});
};
