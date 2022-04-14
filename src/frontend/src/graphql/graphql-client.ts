import { ApolloClient, InMemoryCache, HttpLink} from "@apollo/client/core"
import { onError } from "@apollo/client/link/error"
import { logErrorMessages } from "@vue/apollo-util"

function getHeaders() {
    const headers = {}
    // If needed, insert authorization header here
    return headers
}

const fetchFunction = function (uri: RequestInfo, options: RequestInit) {
    options.headers = getHeaders()
    return fetch(uri, options)
}

// Create an http link:
const httpLink = new HttpLink({
    uri: "http://localhost:7071/api/graphql/",
    fetch: fetchFunction,
})

const errorLink = onError((error) => {
    if (process.env.NODE_ENV !== "production") {
        logErrorMessages(error)
    }
})

// Create the apollo client
export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: errorLink.concat(httpLink),
}) 