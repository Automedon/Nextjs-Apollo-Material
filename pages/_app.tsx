import React from "react";
import Head from "next/head";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import withApollo from "next-with-apollo";

const MyApp = ({ Component, pageProps, apollo }) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ApolloProvider client={apollo}>
        <CssBaseline />
        <Component {...pageProps} />
      </ApolloProvider>
    </React.Fragment>
  );
};

export default withApollo(({ initialState }) => {
  return new ApolloClient({
    uri: process.env.ENDPOINT,
    cache: new InMemoryCache().restore(initialState || {}),
  });
})(MyApp);
