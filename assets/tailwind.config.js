const autoprefixer = require('autoprefixer');

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: true,
    mode: 'all',
    content: ["./*.html", "docs/**/*.html", "comparison/*.html"],
    options: {
      safelist: [],
    },
  },
  darkMode: 'class',
  theme: {
    container: {
      center: true,
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            '.prose a.edit, .tag a': {
              color: '#333',
              'text-decoration': 'none',
            },
            'ul.footer-nav': {
              '::before': {
                display: 'none',
                'text-decoration': 'none',
              }
            },
            'ul.contains-task-list': {
              '::before': {
                display: 'none',
              }
            },
            'ul.spacelog': {
              '::before': {
                display: 'none',
              }
            },
          },
        },
      }
    },
  }, 
  variants: {},
  plugins: [
    require('tailwind-content-placeholder')({
      placeholders: {
        'paragraph': {
          height: 4, // em
          rows: [[100], [100], [40], [],], // %
        },
      },
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
