import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 5173, // Keep your default port or 3000
		proxy: {
			"/api": {
				target: "http://stageapi.monkcommerce.app", // The API's base URL
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""), // This removes '/api' from the request
			},
		},
	},
});
