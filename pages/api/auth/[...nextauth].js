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
        username: { label: "Username", type: "text", placeholder: "jsmith" },
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

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
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
        }
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest ({
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
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/inicio-sesion',
  },
  session: {
    strategy: 'jwt',
    jwt: true
  },
  debug: true,
});

function html ({ url, host, email }) {
  const escapedEmail = `${email.replace(/\./g, '&#8203;.')}`
  const escapedHost = `${host.replace(/\./g, '&#8203;.')}`
  // Your email template here
  return `
      <body>
        <h1>Your magic link! 🪄</h1>
        <h3>Your email is ${escapedEmail}</h3>
        <p>
          <a href="${url}">Sign in to ${escapedHost}</a>
      </body>
  `
}

function text ({ url, host }) {
  return `Sign in to ${host}\n${url}\n\n`
}