import React from "react";
import Link from "next/link";
import { useAuth } from "components";

function Header() {
  // const { pathname, push, replace } = useRouter();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const { user, signin, signout } = useAuth();
  // const [user, setUser] = React.useState(netlifyAuth.user);

  // React.useEffect(() => {
  //   console.log("pathname: ", pathname);
  //   const role = user?.app_metadata?.roles
  //     ? user.app_metadata.roles[0]
  //     : undefined;
  //   if (pathname === "/class-admin") {
  //     return role === "instructor" ? null : replace("/lessons");
  //   }
  // }, [pathname]);

  // React.useEffect(() => {
  //   let isCurrent = true;
  //   netlifyAuth.initialize((user) => {
  //     console.log("initializing! ", isCurrent);
  //     console.log("initial user? ", user);
  //     if (isCurrent) {
  //       setLoggedIn(!!user);
  //       setUser(user);
  //     }
  //   });

  //   return () => {
  //     isCurrent = false;
  //   };
  // }, []);

  // let login = () => {
  //   netlifyAuth.authenticate((user) => {
  //     console.log("authenticating! ", user);
  //     setLoggedIn(!!user);
  //     setUser(user);
  //     user.app_metadata.roles.includes("instructor")
  //       ? push("/class-admin")
  //       : push("/lessons");
  //   });
  // };

  // let logout = () => {
  //   netlifyAuth.signout(() => {
  //     setLoggedIn(false);
  //     setUser(null);
  //     replace("/");
  //   });
  // };

  return (
    <>
      <header className="grid grid-cols-3 grid-rows-2 body-font md:flex xl:max-w-screen-lg xl:m-auto">
        <a className="col-span-2 inline-flex m-4 px-2 py-2 font-bold title-font text-gray-900 title-font">
          Hasura demo
        </a>
        <nav className="col-span-full row-start-2 row-end-3 flex items-center justify-center text-base md:ml-auto md:mr-auto">
          <Link href="/about">
            <a className="p-4 text-sm font-semibold text-gray-600 hover:text-gray-800">
              About
            </a>
          </Link>
          {user ? (
            <Link href="/lessons">
              <a className="text-sm p-4 font-semibold text-gray-600 hover:text-gray-800">
                Lessons
              </a>
            </Link>
          ) : null}
          {user ? (
            <Link href="/class-admin">
              <a className="text-sm p-4 font-semibold text-gray-600 hover:text-gray-800">
                Admin
              </a>
            </Link>
          ) : null}
        </nav>
        <button
          onClick={user ? signout : signin}
          className="col-span-1 inline-block items-center m-4 px-2 py-2 font-semibold text-blue-700 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:px-8 hover:border-blue-800 hover:bg-blue-700 hover:text-white focus:ring focus:outline-none"
        >
          {user ? "Sign out" : "Sign in"}
        </button>
      </header>
      <div className="flex border-b" />
    </>
  );
}

export default Header;
