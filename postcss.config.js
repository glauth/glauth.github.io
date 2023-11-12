const cssnano = require('cssnano')({
    preset: ['default', {
        discardComments: {
            removeAll: true,
        },
    }]
})
module.exports = {
    plugins: [
        require("postcss-import"),
        require('tailwindcss/nesting')(require('postcss-nesting')),
        require('tailwindcss')('assets/tailwind.config.js'),
        ...process.env.NODE_ENV === 'production' ? [cssnano] : [],
        require('autoprefixer'),
    ],
};
