const mix = require('laravel-mix');
const path = require('path');
const { exec } = require('child_process');

mix.alias({
	'@store': path.join(__dirname, 'src'),
	'@setup': path.join(__dirname, 'src/wizards/store-setup'),
	'@shipping': path.join(__dirname, 'src/wizards/shipping'),
	'@payments': path.join(__dirname, 'src/wizards/payments'),
});

mix.ts('src/index.tsx', 'dist')
	.sourceMaps()
	.react()
	.after(() => {
		exec('yalc push');
	});
