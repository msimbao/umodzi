module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{js,png,mp3,ico,html,json}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};