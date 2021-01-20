import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import netlifyIdentity from "netlify-identity-widget";

const AuthContext = createContext();

const ACCESS_CONFIG = {
  "/": "public",
  "/about": "public",
  "/lessons": "public",
  "/lessons/*": "authenticated-only",
  "/class-admin": "instructor-only",
};

import { Loader } from "components";

const DEFAULT_DEAUTH_PATH = "/lessons";

function BaseProvider({ children }) {
  const { pathname, events, push, replace } = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(
    ACCESS_CONFIG[pathname] === "public" ? false : true
  );

  useEffect(() => {
    window.netlifyIdentity = netlifyIdentity;
    netlifyIdentity.on("init", (user) => {
      console.log("user on init? ", user);
      localStorage.setItem("lms-token", user?.token?.access_token);
      setUser(user);
      setIsLoading(false);
    });
    netlifyIdentity.init();
  }, [setUser, setIsLoading]);

  useEffect(() => {
    const checkExpiration = () => {
      const tokenTimeLeft = user?.token
        ? user?.token?.expires_at - new Date().getTime()
        : "notoken";
      console.log("tokenTimeLeft: ", tokenTimeLeft);
      if (tokenTimeLeft < 0) {
        alert("Session expired");
        signout();
        throw new Error("expired");
      } else if (tokenTimeLeft < 500000) {
        netlifyIdentity.currentUser().jwt(true);
      }
      return "ok";
    };

    const checkAccessLevel = (url) => {
      const role = user?.app_metadata?.roles
        ? user.app_metadata.roles[0]
        : null;
      switch (ACCESS_CONFIG[url]) {
        case "instructor-only":
          return role !== "instructor" ? replace(DEFAULT_DEAUTH_PATH) : null;
        case "authenticated-only":
          return user?.id ? replace(DEFAULT_DEAUTH_PATH) : null;
        default:
          return null;
      }
    };

    const handleRouteChange = async (url) => {
      try {
        await checkExpiration();
        await checkAccessLevel(url);
      } catch (err) {
        console.log("handleRouteChange err: ", err);
      }
    };

    // Monitor routes
    events.on("routeChangeStart", handleRouteChange);
    return () => {
      console.log("turning off routeChangeStart listener");
      events.off("routeChangeStart", handleRouteChange);
    };
  }, [user, replace]);

  const signin = () => {
    netlifyIdentity.open();
    netlifyIdentity.on("login", (user) => {
      console.log("user on login? ", user);
      setUser(user);
      localStorage.setItem("lms-token", user?.token?.access_token);
      netlifyIdentity.close();
      push(DEFAULT_DEAUTH_PATH);
    });
  };

  const signout = () => {
    netlifyIdentity.logout();
    netlifyIdentity.on("logout", () => {
      setUser();
      localStorage.removeItem("lms-token");
      push(DEFAULT_DEAUTH_PATH);
    });
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
}

const AuthProvider = React.memo(BaseProvider);

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
