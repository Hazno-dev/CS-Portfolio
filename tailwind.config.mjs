/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				basement: ['basement-grotesque', 'sans-serif'],
				mozaic: ['mozaic-variable', 'sans-serif'],
				sb: ['SB', 'sans-serif'],
				mono: ['paradroid-mono-soft', 'monospace'],
				inter: ['Inter', 'sans-serif'],
				carto: ['cartograph-cf', 'monospace']
			},
			colors: {
				primary: {
					0: 'hsl(var(--colour-primary-0) / <alpha-value>)',
					100: 'hsl(var(--colour-primary-100) / <alpha-value>)',
					200: 'hsl(var(--colour-primary-200) / <alpha-value>)',
					300: 'hsl(var(--colour-primary-300) / <alpha-value>)'
				},
				secondary: {
					1000: 'hsl(var(--colour-secondary-1000) / <alpha-value>)',
					900: 'hsl(var(--colour-secondary-900) / <alpha-value>)',
					800: 'hsl(var(--colour-secondary-800) / <alpha-value>)',
					700: 'hsl(var(--colour-secondary-700) / <alpha-value>)'
				},
				accent: 'hsl(var(--colour-accent) / <alpha-value>)'
			},
			maxWidth: {
				'1/2': '50%',
				'1/3': '33.333333%',
				'1/4': '25%',
				'1/5': '20%',
				'1/6': '16.666667%',
				'2/3': '66.666667%',
				'3/4': '75%',
				'4/5': '80%'
			}
		}
	},
	plugins: []
};
