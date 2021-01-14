import React from "react";
import Head from "next/head";
import "tailwindcss/tailwind.css";

import { AuthProvider, Header } from "components";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
