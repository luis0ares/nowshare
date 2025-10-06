"use client";

import React from "react";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { GraphQLFormattedError } from "graphql/error";
import { ApolloProvider as Provider } from "@apollo/client/react";
import { TokenAutoRefresh } from "@/lib/auth-link";

const onError = async (error: GraphQLFormattedError) => {
  console.log("First attempt failed:", error);
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/auth/refresh", {
    credentials: "include",
  });
  return res.ok;
};

const refreshLink = TokenAutoRefresh(onError);
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_BASE_URL + "/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  link: ApolloLink.from([refreshLink, httpLink]),
  cache: new InMemoryCache(),
});

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <Provider client={client}>{children}</Provider>;
}
