import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css';
import type {AppProps} from 'next/app'
import {ApolloProvider} from '@apollo/client';
import {useApollo} from '../utils/apollo';
import Head from "next/head";
import {ToastContainer} from "react-toastify";
import {AppWrapper} from "../utils/store";
import 'react-circular-progressbar/dist/styles.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Script from "next/script";

function MyApp({Component, pageProps: { session, ...pageProps }}: AppProps) {
    const apolloClient = useApollo(pageProps);

    return (
        <>

            <Head>
                <title>Etracka</title>
            </Head>
            <ToastContainer/>
            {/*<SessionProvider session={session}>*/}
            <GoogleOAuthProvider clientId="365499363814-27cd94bbo04h8kia0hf4c5h1jnq3ma81.apps.googleusercontent.com">
            <ApolloProvider client={apolloClient}>
                <AppWrapper>
                    <Component {...pageProps} />
                </AppWrapper>
            </ApolloProvider>
            </GoogleOAuthProvider>
            {/*</SessionProvider>*/}
            <Script id={'facebook-sdk'} strategy={'beforeInteractive'} src={"https://connect.facebook.net/en_US/sdk.js"} crossOrigin={"anonymous"}></Script>
            <Script  id={'facebook-sdk-init'} strategy={'afterInteractive'} dangerouslySetInnerHTML={{
                __html:    `
                        window.fbAsyncInit = function(){' '}
                            {FB.init({
                              appId: ${'602679087937196'},
                              autoLogAppEvents: ${true},
                              xfbml: ${true},
                              version: 'v8.0',
                            })}
                            ;
                `
            }}></Script>

        </>
    )
}

export default MyApp
