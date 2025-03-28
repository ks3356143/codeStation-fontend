import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import { join } from "node:path"

export default ({ mode }: { mode: string }) => {
	const env = loadEnv(mode, process.cwd())
	console.log("当前环境为：", mode)
	return defineConfig({
		base: env.VITE_APP_BASE,
		plugins: [react()],
		resolve: {
			alias: {
				"@": join(__dirname, "/src/"),
			},
		},
		server: {
			host: "127.0.0.1",
			port: parseInt(env.VITE_APP_PORT) || 3999, // 如果没有配置则使用3999
			proxy: {
				"^/api": {
					target: env.VITE_APP_BASE_URL,
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, ""),
					headers: {
						"Access-Control-Allow-Origin": "*",
					},
				},
			},
		},
	})
}
