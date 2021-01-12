import React from "react";
import Head from "next/head";
import "tailwindcss/tailwind.css";

import { Header } from "components";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
