import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client';
import { createUploadLink } from "apollo-upload-client";
import { onError } from '@apollo/client/link/error'
import { useMemo } from 'react';
import axios from "axios"
import { NextApiRequest, NextApiResponse } from 'next';
import {NEXT_PUBLIC_GQL_URL} from "./config";
import {DecryptData} from "./dataSecurity";

axios.defaults.withCredentials = true;

let token;
if (typeof window !== 'undefined') {
    token = localStorage.getItem('etr_token')
}
export interface GraphQlContext {
    req: NextApiRequest;
    res: NextApiResponse;
}

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;



const httpLink: ApolloLink = createUploadLink({
    // uri: "http://localhost:8001/graphql",
    uri: NEXT_PUBLIC_GQL_URL,
    headers: {
        "Authorization": `Bearer ${token}`
    },
})


function createApolloClient(context?: GraphQlContext) {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: ApolloLink.from([
            onError(({ graphQLErrors, networkError }) => {
                if (graphQLErrors)
                    graphQLErrors.forEach(({ message, locations, path }) =>
                        console.log(
                            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                        )
                    )
                if (networkError)
                    console.log(
                        `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
                    )
            }),
            httpLink,
        ]),
        cache: new InMemoryCache(),
    });
}

export function initializeApollo(
    initialState: any = null,
    context?: GraphQlContext
): ApolloClient<any> {
    const _apolloClient = apolloClient ?? createApolloClient(context);

    if (initialState) {
        _apolloClient.cache.restore(initialState);
    }

    if (typeof window === 'undefined') {
        return _apolloClient;
    }


    apolloClient = apolloClient ?? _apolloClient;

    return apolloClient;
}

export const getApolloClient = initializeApollo;

export function useApollo(initialState: any) {
    const apolloStore = useMemo(() => initializeApollo(initialState), [
        initialState,
    ]);
    return apolloStore;
}
