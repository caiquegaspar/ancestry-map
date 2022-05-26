import axios from "axios";

const api = axios.create({
	// baseURL: "/api/",
	baseURL: "https://ancestry.caiquegaspar.workers.dev/",
	headers: { "Data-Name": "user" },
});

export { api };
