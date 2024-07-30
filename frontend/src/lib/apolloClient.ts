import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import getURI from "../utils/getURI";

const API_URL = getURI();

const httpLink = createHttpLink({
  uri: API_URL,
  credentials: "include",
});

const client = new ApolloClient({
  link: httpLink,
  credentials: "include",
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default client;
