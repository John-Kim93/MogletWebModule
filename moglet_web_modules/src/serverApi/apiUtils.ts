import axios from "axios";

export const setToken = () => {
	const token = sessionStorage.access_token
	const config = {
		access_token: `${token}`,
	};
	return config;
};