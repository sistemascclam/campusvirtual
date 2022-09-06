module.exports = {
  images: {
    domains: ['localhost:3000', 'localhost:8000', 'https://campusvirtual.vercel.app/', 'campusvirtual.vercel.app' , 'raw.githubusercontent.com', 'www.cclam.org.pe', 'lh3.googleusercontent.com'],
  },
  reactStrictMode: true,
  env: {
    accessTokenMP: process.env.MP_ACCESS_TOKEN,
    publicKeyMP: process.env.MP_PUBLIC_KEY
  },
}


