module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      'poppins': ['Nunito'],
    },
    extend: {
      backgroundImage: theme => ({
        'collage-courses': `url('/images/bg-collage-cursos.png')`,
      }),
      colors:{
        dashboardcard:'#1e2747',
        cardblue:'#141a32',
        darkblue:'#080f28',
        purple:'#702CDD',
        "purple-light":'#a67ee8',
        celeste:'#009BDA',
        footer:'#000217'
      },
      zIndex:{
        '2000': '2000',
      },
      borderWidth: {
      '1': '1px',
      },
      maxWidth:{
        '8xl': '1920px',
      },
      animation:{
        'successcard': 'successcard 2s',
      },
      keyframes: {
        'successcard': {
          '0%': {
            width: '10rem',
            height: '10rem',
          },
          '50%': {
            width: '10rem',
            height: '10rem',
          },
          '100%': {
            width: '7rem',
            height: '7rem',
          },
        },
      }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}
  

