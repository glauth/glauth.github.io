module.exports = {
  purge: {
    mode: 'all',
    content: [
      './*.html',
    ],
  },
  plugins: [
    require('tailwind-content-placeholder')({
      placeholders: {
        'paragraph': {
          height: 4, // em
          rows: [[100], [100], [40], [],], // %
        },
      },
    }),
  ],
}
