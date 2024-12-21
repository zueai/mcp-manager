import path from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import electron from "vite-plugin-electron"
import renderer from "vite-plugin-electron-renderer"

export default defineConfig({
	plugins: [
		react(),
		electron([
			{
				entry: "electron/main.ts",
				vite: {
					build: {
						outDir: "dist-electron",
						lib: {
							entry: "electron/main.ts",
							formats: ["cjs"]
						},
						rollupOptions: {
							external: ["electron"]
						}
					}
				}
			},
			{
				entry: "electron/preload.ts",
				onstart(options) {
					options.reload()
				},
				vite: {
					build: {
						outDir: "dist-electron",
						lib: {
							entry: "electron/preload.ts",
							formats: ["cjs"]
						},
						rollupOptions: {
							external: ["electron"]
						}
					}
				}
			}
		]),
		renderer()
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src")
		}
	},
	publicDir: "public",
	base: process.env.ELECTRON_RENDERER_URL ? "/" : "./",
	build: {
		assetsDir: ".",
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					const name = assetInfo.name || ""
					return name.endsWith(".svg") ? name : `assets/${name}`
				}
			}
		}
	},
	server: {
		port: 7777
	}
})
