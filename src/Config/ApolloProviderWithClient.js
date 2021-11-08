import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";

const link = createHttpLink({
    uri: "http://localhost:8080/graphql",
    fetchOptions: {
        //mode: 'no-cors',
        //credentials: 'include'
    },
    headers: {
        //'Content-Type': 'application/graphql',
        //'Access-Control-Allow-Origin': '*',
    }
});

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
});

export const ApolloProviderWithClient = ({ children }) => {

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
}