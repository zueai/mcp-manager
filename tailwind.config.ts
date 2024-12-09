import daisyui from "daisyui"
import { light } from "daisyui/src/theming/themes"
import type { Config } from "tailwindcss"

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				"tiempos-semibold": ["Tiempos Text", "serif"],
				"tiempos-regular": ["Tiempos Text", "serif"]
			}
		}
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				light: {
					...light,
					primary: "#da7756",
					"primary-content": "#ffffff",
					secondary: "#f2f1e9",
					"secondary-content": "#000000"
				}
			}
		]
	}
} satisfies Config
