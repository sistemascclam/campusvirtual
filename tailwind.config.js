module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'poppins': ['Poppins'],
    },
    extend: {
      colors:{
        darkblue:'#151f3d',
        purple:'#702CDD',
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
  ]

}
  

