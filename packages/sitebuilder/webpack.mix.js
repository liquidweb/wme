const mix = require('laravel-mix');
const path = require('path');
const { exec } = require('child_process');

mix.alias({
	'@sb': path.join(__dirname, 'src'),
	'@look-and-feel': path.join(__dirname, 'src/wizards/look-and-feel'),
	'@ftc': path.join(__dirname, 'src/wizards/first-time-configuration'),
	'@go-live': path.join(__dirname, 'src/wizards/go-live'),
});

mix.copyDirectory('src/assets', 'dist/assets');

mix.ts('src/index.tsx', 'dist')
	.sourceMaps()
	.react()
	.after(() => {
		exec('yalc push');
	});
