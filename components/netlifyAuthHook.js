import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import netlifyIdentity from "netlify-identity-widget";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const { pathname, events, replace } = useRouter();
  const [user, setUser] = useState("loading");
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    window.netlifyIdentity = netlifyIdentity;
    netlifyIdentity.on("init", (user) => {
      console.log("user on init? ", user);
      setUser(user);
      setUserRole(
        user?.app_metadata?.roles ? user.app_metadata.roles[0] : null
      );
    });
    netlifyIdentity.init();
  }, [setUser, setUserRole]);

  // Monitor client-side routing
  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log("route: ", url);
      console.log("userRole: ", userRole);
      if (userRole === "student" && url === "/class-admin") {
        return replace("/lessons");
      } else if (!userRole && !["/", "/about", "/lessons"].includes(url)) {
        console.log("redirect?");
        return replace("/lessons");
      }
    };

    // Check that initial route is OK
    handleRouteChange(pathname);

    // Monitor routes
    events.on("routeChangeStart", handleRouteChange);
    return () => {
      events.off("routeChangeStart", handleRouteChange);
    };
  }, [userRole, replace]);

  const signin = () => {
    netlifyIdentity.open();
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      setUserRole(
        user?.app_metadata?.roles ? user.app_metadata.roles[0] : null
      );
      netlifyIdentity.close();
    });
  };

  const signout = () => {
    netlifyIdentity.logout();
    netlifyIdentity.on("logout", () => {
      setUser();
      setUserRole();
      replace("/");
    });
  };

  return (
    <AuthContext.Provider value={{ user, userRole, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
