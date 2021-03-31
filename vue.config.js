const path = require('path');
const extractGettextForPHP = require('./webpack/extract-gettext-for-php');

module.exports = {
    outputDir: path.resolve(__dirname, 'dist/'),
    filenameHashing: false,
    productionSourceMap: false,
    configureWebpack: {
        output: {
            filename: 'ld-{plugin-shortcode}.js'
        },
        optimization: {
            splitChunks: false
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, "src")
            }
        },
    },
    css: {
        extract: {
            filename: 'ld-{plugin-shortcode}.css'
        },
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-embed-svg')({ paths: [path.resolve(__dirname, 'src/assets/svg')]})
                ]
            }
        }
    },
    chainWebpack: config => {

        extractGettextForPHP({
            path: path.resolve(__dirname, 'languages/'),
            context: 'ld-{plugin-shortcode}',
            domain: '',
            attrs: ['placeholder']
        });

        config.plugins.delete('html');
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');
        config.plugins.delete('copy');
        config.plugins.delete('hmr');
    }
};
