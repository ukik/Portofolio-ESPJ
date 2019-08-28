const mix = require('laravel-mix');
const BrotliPlugin = require('brotli-webpack-plugin');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

/**
 * default
 */
mix.setPublicPath('public');
mix.webpackConfig({
    output: {
        chunkFilename: 'vue/js/[name].js',
    },
});
mix.js('resources/js/app.js', 'public/vue/js')
    .copy('resources/js/pwa', 'public/pwa')
    .js('resources/js/sw.js', 'public/')
    .copy('resources/js/favicon2.ico', 'public/favicon2.ico')
    .copy('resources/js/assets', 'public/vue/assets')
    .copy('resources/js/styles', 'public/vue/css')
    .sass('resources/sass/app.scss', 'public/vue/css')
    .version();
