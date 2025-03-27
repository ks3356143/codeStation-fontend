import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { join } from "node:path"

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": join(__dirname, "/src/"),
		},
	},
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:8000",
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, ""),
			},
		},
	},
})
