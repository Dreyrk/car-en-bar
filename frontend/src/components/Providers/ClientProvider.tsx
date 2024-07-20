"use client";

import client from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
