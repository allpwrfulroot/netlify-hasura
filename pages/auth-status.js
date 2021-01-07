import React from "react";
import {
  useIdentityContext,
  IdentityContextProvider,
} from "react-netlify-identity-widget";
import "react-netlify-identity-widget/styles.css";

function AuthStatus() {
  return (
    <IdentityContextProvider url={process.env.URL}>
      <AuthStatusView />
    </IdentityContextProvider>
  );
}

// code split the modal til you need it!
const IdentityModal = React.lazy(() => import("react-netlify-identity-widget"));

function AuthStatusView() {
  const identity = useIdentityContext();
  const [dialog, setDialog] = React.useState(false);
  const name =
    (identity &&
      identity.user &&
      identity.user.user_metadata &&
      identity.user.user_metadata.full_name) ||
    "NoName";
  const avatar_url =
    identity &&
    identity.user &&
    identity.user.user_metadata &&
    identity.user.user_metadata.avatar_url;
  return (
    <header className="App-header">
      {identity && identity.isLoggedIn ? (
        <>
          <h1> hello {name}!</h1>
          {avatar_url && (
            <img
              alt="user name"
              src={avatar_url}
              style={{ height: 100, borderRadius: "50%" }}
            />
          )}
          <button
            className="btn"
            style={{ maxWidth: 400, background: "orangered" }}
            onClick={() => setDialog(true)}
          >
            LOG OUT
          </button>
        </>
      ) : (
        <>
          <h1> hello! try logging in! </h1>
          <button
            className="btn"
            style={{ maxWidth: 400, background: "darkgreen" }}
            onClick={() => setDialog(true)}
          >
            LOG IN
          </button>
        </>
      )}

      <React.Suspense fallback="loading...">
        <IdentityModal
          showDialog={dialog}
          onCloseDialog={() => setDialog(false)}
        />
      </React.Suspense>
    </header>
  );
}
export default AuthStatus;
