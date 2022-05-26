import axios from "axios";

const api = axios.create({
	baseURL: "/api/",
	headers: { "Data-Name": "user" },
});

export { api };
