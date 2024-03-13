/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				archivo: ["Archivo Variable"]
			}
		},
	},
	future: {
		hoverOnlyWhenSupported: true
	},
	plugins: [
		plugin(function({addVariant}){
			addVariant('children', '&>*'),
			addVariant('children-li', '& a')
		})
	],
}
