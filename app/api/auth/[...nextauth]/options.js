import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options=NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.NEXT_AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_AUTH_GOOGLE_CLIENT_SECRET,
          }),
          
    ],
    
    secret:process.env.NEXTHAUTH_SECRET,
})
