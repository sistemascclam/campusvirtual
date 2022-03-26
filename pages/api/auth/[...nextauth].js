import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from 'lib/prisma'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import nodemailer from "nodemailer";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: 'credentials',
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch("http://localhost:3000/api/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()

        // // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // // Return null if user data could not be retrieved
        return null
      }
    }),
    EmailProvider({
      id: 'email',
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        },

      tls : {
        rejectUnauthorized : false
      }
    },

      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from }
      }) {
        const { host } = new URL(url)
        const transport = nodemailer.createTransport(server)
        await transport.sendMail({
          to: email,
          from,
          subject: `Sign in to ${host}`,
          text: text({ url, host }),
          html: html({ url, host, email })
        })
      }
    }),
    GoogleProvider({
      id: 'google',
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/inicio-sesion',
    verifyRequest: 'verificar-correo'
  },
  session: {
    strategy: 'jwt'
    // strategy: 'database'
  },
  // debug: true,
  callbacks: {
    //JWT STRATEGY
    async session({ session, token }) {
      // console.log('session callback invoked with %o', { session, token })
      session.user.id = token.id
      return session
    },
    async jwt({ token, user, profile, account }) {
      // console.log('JWT callback invoked with %o', { token, user,profile,account  })
      if (user) {
        token.id = user.id
      }

      return token
    }
    //JWT STRATEGY
    //DATABASE STRATEGY
    // async session({ session, user, token }) {
    //   console.log({session, user, token});
    //   delete user.password
    //   // console.log('session callback invoked with %o', { session, token })
    //   // session.user.id = token.id
    //   return session
    // },
    //DATABASE STRATEGY
  }
});

function html({ url, host, email }) {

  const escapedEmail = `${email.replace(/\./g, '&#8203;.')}`
  const escapedHost = `${host.replace(/\./g, '&#8203;.')}`

  // Your email template here
  return `
      <body style="color:black">

    <button style="background-color:#7e22ce;width:50%; height:4rem; border-radius:9999px; border-color: transparent;">
  
      <img  style="width:4rem; height:3rem;position:absolute;left:45%; top:15%" src="https://cclam.org.pe/publico/logotipodark.png"/>

   </button>
        <h1 > Hola: </h1>
         <h3 style="color: gray">Gracias por registrarte en el campus CCLAM. Estamos muy contentos <br>
           de tenerte con nosotros</h3>
           <p>
         <h3  style="color: gray">En adelante, este sera tu nombre de usuario para poder iniciar sesion:
          <br><a href="${url}" style="color:blue">${escapedEmail}</a>
        </h3>

        <p>

        <div style="color: gray">Gracias</div>
          <div style="color: gray">CAMARA DE COMERCIO Y PRODUCCION DE LAMBAYEQUE</div>
               <p>
             <a href="${url}">Verifica tu email y completa tus datos para que empieces a aprender.<br>
               ${escapedHost}</a> 
           
   </body>
      <div style="text-align: center; color: gray">@2022. All rigthtd reserved <hr style="width:100%"></div>

  `

}

function text({ url, host }) {
  return `Sign in to ${host}\n${url}\n\n`
}