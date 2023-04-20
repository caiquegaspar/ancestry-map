import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("src", import.meta.url)),
			app: fileURLToPath(new URL("./", import.meta.url)),
			components: fileURLToPath(new URL("src/components", import.meta.url)),
			assets: fileURLToPath(new URL("src/assets", import.meta.url)),
			stores: fileURLToPath(new URL("src/stores", import.meta.url)),
			configs: fileURLToPath(new URL("src/configs", import.meta.url)),
			interfaces: fileURLToPath(new URL("src/interfaces", import.meta.url)),
		},
	},
	server: {
		proxy: {
			"/api": {
				target: "https://ancestry.caiquegaspar.workers.dev/",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
