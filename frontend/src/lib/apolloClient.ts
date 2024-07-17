import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import getURI from "../../utils/getURI";

const link = createHttpLink({
  uri: getURI(),
  credentials: "same-origin",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
