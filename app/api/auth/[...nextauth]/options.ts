import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
export const options={
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as String,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as String,
          }),
          
    ],
    
    secret:'asdfghjkl',
}