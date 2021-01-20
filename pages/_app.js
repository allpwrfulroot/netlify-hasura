import React from "react";
import { ApolloProvider } from "@apollo/client";
import "tailwindcss/tailwind.css";

import { AuthProvider, useApollo } from "lib";
import { Header } from "components";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo();
  return (
    <AuthProvider>
      <ApolloProvider client={apolloClient}>
        <Header />
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthProvider>
  );
}

export default MyApp;
