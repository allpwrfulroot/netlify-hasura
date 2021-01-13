import React from "react";
import Router from "next/router";
import Link from "next/link";
import netlifyAuth from "./netlifyAuth";

function Header() {
  const [loggedIn, setLoggedIn] = React.useState(netlifyAuth.isAuthenticated);
  const [user, setUser] = React.useState(netlifyAuth.user);

  React.useEffect(() => {
    let isCurrent = true;
    localStorage.removeItem("netlifySiteURL");
    netlifyAuth.initialize((user) => {
      console.log("initializing! ", isCurrent);
      console.log("initial user? ", user);
      if (isCurrent) {
        setLoggedIn(!!user);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, []);

  let login = () => {
    netlifyAuth.authenticate((user) => {
      console.log("authenticating! ", user);
      setLoggedIn(!!user);
      setUser(user);
      user.app_metadata.roles === "instructor"
        ? Router.push("/class-admin")
        : user.app_metadata.roles === "student"
        ? Router.push("/lessons")
        : null;
    });
  };

  let logout = () => {
    netlifyAuth.signout(() => {
      setLoggedIn(false);
      setUser(null);
      Router.replace("/");
    });
  };

  return (
    <>
      <header className="grid grid-cols-3 grid-rows-2 body-font md:flex xl:max-w-screen-lg xl:m-auto">
        <a className="col-span-2 inline-flex m-4 px-2 py-2 font-bold title-font text-gray-900 title-font">
          Hasura demo
        </a>
        <nav className="col-span-full row-start-2 row-end-3 flex items-center justify-center text-base md:ml-auto md:mr-auto">
          <Link href="/about">
            <a className="mr-5 p-4 text-sm font-semibold text-gray-600 hover:text-gray-800">
              About
            </a>
          </Link>
          <Link href="/how-it-works">
            <a className="text-sm p-4 font-semibold text-gray-600 hover:text-gray-800">
              How it works
            </a>
          </Link>
        </nav>
        <button
          onClick={loggedIn ? logout : login}
          as="a"
          className="col-span-1 inline-block items-center m-4 px-2 py-2 font-semibold text-blue-700 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:px-8 hover:border-blue-800 hover:bg-blue-700 hover:text-white focus:ring focus:outline-none"
        >
          {loggedIn ? "Sign out" : "Sign in"}
        </button>
      </header>
      <div className="flex border-b" />
    </>
  );
}

export default Header;
