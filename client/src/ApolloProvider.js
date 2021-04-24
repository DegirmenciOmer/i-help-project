import React from 'react'
import App from './App'

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client'
import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
})

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken')
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getPosts: {
            merge(existing, incoming) {
              return incoming
            },
          },
          getUser: {
            merge(existing = {}, incoming = {}) {
              return {...existing, ...incoming};
            },
          },
        },
      },
    },
  }),
})

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
