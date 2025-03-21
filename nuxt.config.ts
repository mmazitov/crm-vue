export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: false },
	css: ['~/assets/css/tailwind.css'],
	modules: [
		'@nuxt/eslint',
		'@nuxt/image',
		'@nuxtjs/tailwindcss',
		'shadcn-nuxt',
		'nuxt-icon',
		'@pinia/nuxt',
		'@vee-validate/nuxt',
		[
			'@nuxtjs/google-fonts',
			{
				families: {
					Lato: {
						wght: [300, 400, 700],
						ital: [300],
					},
				},
				display: 'swap',
			},
		],
	],
	shadcn: {
		/**
		 * Prefix for all the imported component
		 */
		prefix: 'Ui',
		/**
		 * Directory that the component lives in.
		 * @default "./components/ui"
		 */
		componentDir: './components/ui',
	},
	pinia: {
		storesDirs: ['./store/**'],
	},
	veeValidate: {
		// disable or enable auto imports
		autoImports: true,
	},
});
