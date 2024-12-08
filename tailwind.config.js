/** @type {import('tailwindcss').Config} */
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
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				light: {
					...require("daisyui/src/theming/themes").light,
					primary: "#da7756",
					"primary-content": "#ffffff",
					secondary: "#f2f1e9",
					"secondary-content": "#000000"
				}
			}
		]
	}
}
