import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { getHighlighter } from 'shiki';
import readingTime from "mdsvex-reading-time";

const mdsverConfig = {
	extensions: ['md'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await getHighlighter({
				themes: ['poimandres'],
				langs: ['javascript', 'typescript']
			})
			await highlighter.loadLanguage('javascript', 'typescript', 'html')
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'poimandres' }))
			return `{@html \`${html}\` }`
		}
	},
	layout: {
		_: './src/mdsvex.svelte',
	},
	remarkPlugins: [
		readingTime
	],
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsverConfig)],

	kit: {
		adapter: adapter({
			strict: false
		}),
		paths: {
            base: process.argv.includes('dev') ? '' : process.env.BASE_PATH,
        }
	}
};

export default config;
