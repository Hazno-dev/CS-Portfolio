const round = (num) =>
	num
		.toFixed(7)
		.replace(/(\.[0-9]+?)0+$/, '$1')
		.replace(/\.0$/, '');
const em = (px, base) => `${round(px / base)}em`;

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				basement: ['basement-grotesque', 'sans-serif'],
				mozaic: ['mozaic-variable', 'sans-serif']
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
			typography: ({ theme }) => ({
				calcustom: {
					css: {
						'--tw-prose-body': 'hsl(var(--colour-secondary-800))',
						'--tw-prose-headings': 'hsl(var(--colour-secondary-900))',
						'--tw-prose-lead': 'hsl(var(--colour-secondary-700))',
						'--tw-prose-links': 'hsl(var(--colour-secondary-900))',
						'--tw-prose-bold': 'hsl(var(--colour-secondary-900))',
						'--tw-prose-counters': 'hsl(var(--colour-secondary-700))',
						'--tw-prose-bullets': 'hsl(var(--colour-primary-300))',
						'--tw-prose-hr': 'hsl(var(--colour-secondary-1000) / 0.1)',
						'--tw-prose-quotes': 'hsl(var(--colour-secondary-700))',
						'--tw-prose-quote-borders': 'hsl(var(--colour-primary-300))',
						'--tw-prose-captions': 'hsl(var(--colour-secondary-700))',
						'--tw-prose-kbd': 'hsl(var(--colour-secondary-800))',
						'--tw-prose-kbd-shadows': 'hsl(var(--colour-secondary-900))',
						'--tw-prose-code': 'hsl(var(--colour-secondary-900))',
						'--tw-prose-pre-code': 'hsl(var(--colour-primary-300))',
						'--tw-prose-pre-bg': 'hsl(var(--colour-primary-300))',
						'--tw-prose-th-borders': 'hsl(var(--colour-secondary-1000))',
						'--tw-prose-td-borders': 'hsl(var(--colour-secondary-900))',

						hr: {
							marginTop: em(16, 16),
							marginBottom: em(16, 16)
						},
						'max-width': '75ch'
					}
				},
				lh: {
					css: {
						color: 'hsl(var(--colour-secondary-700))'
					}
				}
			})
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
