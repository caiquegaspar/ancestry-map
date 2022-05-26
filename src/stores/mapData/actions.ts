import { api } from "configs/axios";

const actions = {
	async getUserData(): Promise<void> {
		const response = await api({ method: "GET" });
		const result = response.data.resposta;

		// @ts-ignore
		this.user_info = result;
	},
};

export default { ...actions };
