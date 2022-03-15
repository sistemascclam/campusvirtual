module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      'poppins': ['Nunito'],
    },
    extend: {
      colors:{
        darkblue:'#0d1a2e',
        purple:'#702CDD',
        "purple-light":'#a67ee8',
        celeste:'#009BDA',
        footer:'#000217'
      },
      zIndex:{
        '2000': '2000',
      }
    },
  },
  variants: {
    extend: {
    },
  },
  extend: {
    backgroundImage: {
      'footer-texture': "url('/img/footer-texture.png')",
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}
  

