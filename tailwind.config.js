module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      'poppins': ['Poppins'],
    },
    extend: {
      colors:{
        darkblue:'#151f3d',
        purple:'#702CDD',
        celeste:'#009BDA',
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
  

