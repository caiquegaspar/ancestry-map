import { api } from "configs/axios";
import axios from "axios";

const actions = {
	async getUserData(): Promise<void> {
		// const response = await api({ method: "GET" });
		const response = await axios({
			method: "get",
			url: "https://ancestry.caiquegaspar.workers.dev/",
			headers: { "Data-Name": "user" },
		});
		const result = response.data.resposta;

		// @ts-ignore
		this.user_info = result;
	},
};

export default { ...actions };
