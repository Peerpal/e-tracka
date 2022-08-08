import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import {ApolloClient, InMemoryCache} from "@apollo/client";
import {LOGIN_USER} from "../../../graphql/mutations";


const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: process.env.NEXT_PUBLIC_GQL_URL,
});


export default NextAuth({
    providers: [
        FacebookProvider({
            clientId: "602679087937196",
            clientSecret: "a6431bcb4604fa91c8f18fa6ea2ba7fc",
        }),
        GoogleProvider({
            clientId: "967504610977-0f2sg2eiflpu0k92hve1aqu1gpel3p0a.apps.googleusercontent.com",
            clientSecret: "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",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {


                client.mutate({
                    mutation: LOGIN_USER,
                    variables: {
                        input: {}
                    }
                })


                // Add logic here to look up the user from the credentials supplied
                const user = { id: 1, name: "J Smith", email: "jsmith@example.com" }

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),
    ],
    pages: {
        signIn: '/auth/login',
    }
})
